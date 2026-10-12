import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('_site');
async function walk(dir){const list=await readdir(dir,{withFileTypes:true});return (await Promise.all(list.map(x=>x.isDirectory()?walk(path.join(dir,x.name)):path.join(dir,x.name)))).flat();}
const files=(await walk(root)).filter(p=>p.endsWith('.html'));
for(const file of files){const html=await readFile(file,'utf8');assert(/<title>[^<]+<\/title>/.test(html));const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,`Duplicate IDs in ${file}`);for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){const value=match[1];if(/^(https?:|mailto:|data:)/.test(value))continue;const url=new URL(value,'https://local.test/'+path.relative(root,file));let target=path.join(root,decodeURIComponent(url.pathname));if(url.pathname.endsWith('/'))target=path.join(target,'index.html');await access(target).catch(()=>{throw Error(`Missing asset/link: ${value} from ${file}`);});if(url.hash&&target.endsWith('.html')){const targetHtml=await readFile(target,'utf8');assert(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Missing anchor ${value}`);}}}
const home=await readFile(path.join(root,'index.html'),'utf8');
const papers=JSON.parse(await readFile('src/_data/publications.json','utf8'));
assert.equal((await readFile('_site/publications/index.html','utf8')).match(/class="paper-row archive-paper"/g).length,papers.length);
const allOutput=(await walk(root)).join('\n');
for (const name of await readdir('src/posts')) {
 if (!name.endsWith('.md')) continue;
 const source=await readFile(path.join('src/posts',name),'utf8');
 if (/^draft: true$/m.test(source)) assert(!allOutput.includes(`/blog/${name.slice(0,-3)}/`),`Draft published: ${name}`);
}
await access(path.join(root,'assets/social-card.png'));
console.log(`Checked ${files.length} pages, all local links and anchors, ${papers.length} publications, social image, and draft exclusion.`);

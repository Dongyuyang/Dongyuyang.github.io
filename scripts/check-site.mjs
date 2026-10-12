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

const locales=JSON.parse(await readFile('src/_data/locales.json','utf8'));
assert.deepEqual(locales.map(t=>t.code).sort(),['en','ja','zh']);
const keys=Object.keys(locales[0]).sort();
for(const t of locales){
 assert.deepEqual(Object.keys(t).sort(),keys,`Incomplete translation keys: ${t.code}`);
 for(const value of Object.values(t)){assert.equal(typeof value,'string');assert(value.trim(),`Empty translation in ${t.code}`);}
 for(const suffix of ['','blog/','publications/']){
  const file=path.join(root,t.prefix,suffix,'index.html');
  const html=await readFile(file,'utf8');
  assert(html.includes(`<html lang="${t.code}">`),`Wrong page language: ${file}`);
  for(const other of locales) assert(html.includes(`href="${other.prefix}${suffix}" lang="${other.code}"`),`Missing equivalent language link: ${file}`);
  assert(!/LLM Team Tech Lead|Read my CV|nav-cv|brand-mark/.test(html));
  if(suffix==='publications/')assert.equal((html.match(/class="paper-row archive-paper"/g)||[]).length,papers.length);
 }
 await access(path.join(root,t.prefix,'feed.xml'));
}
console.log('Checked all three languages, equivalent routes, shared publication data, and localized feeds.');

const externalWriting=JSON.parse(await readFile('src/_data/externalWriting.json','utf8'));
for(const t of locales){
 for(const suffix of ['','blog/']){
  const html=await readFile(path.join(root,t.prefix,suffix,'index.html'),'utf8');
  const dates=[...html.matchAll(/<time datetime="([^"]+)">/g)].map(match=>Date.parse(match[1]));
  assert(dates.length>=externalWriting.length,`Missing dated writing entries: ${t.code}/${suffix}`);
  assert(dates.every((date,i)=>Number.isFinite(date)&&(i===0||dates[i-1]>=date)),`Writing must be newest first: ${t.code}/${suffix}`);
  for(const entry of externalWriting){
   assert.equal(html.split(`class="writing-row" href="${entry.url}"`).length-1,1,`Missing or duplicate writing link: ${entry.url}`);
   assert(html.includes(t[entry.titleKey]),`Missing localized writing title: ${entry.url}`);
  }
 }
 const feed=await readFile(path.join(root,t.prefix,'feed.xml'),'utf8');
 const dates=[...feed.matchAll(/<pubDate>([^<]+)<\/pubDate>/g)].map(match=>Date.parse(match[1]));
 assert(dates.every((date,i)=>Number.isFinite(date)&&(i===0||dates[i-1]>=date)),`RSS must be newest first: ${t.code}`);
 for(const entry of externalWriting)assert(feed.includes(new URL(entry.url,'https://dongyuyang.github.io').href),`Missing RSS writing: ${entry.url}`);
}
console.log('Checked unified writing chronology, localized external entries, and RSS dates.');

const removedCopy=['Building intelligence.','Across the whole system.','Ideas, made concrete.','A place to think','in the open.','Research depth.','Real-world models.','Good research starts','with a better question.','From spatial databases to foundation models.','Ideas worth','thinking through.','Papers, systems, and tutorials from 2016 onward.'];
for(const file of files){const html=await readFile(file,'utf8');for(const phrase of removedCopy)assert(!html.includes(phrase),`Removed copy returned: ${phrase}`);}

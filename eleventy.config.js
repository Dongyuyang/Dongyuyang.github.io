import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
const locales = JSON.parse(readFileSync('src/_data/locales.json', 'utf8'));
const getLocale = code => locales.find(t => t.code === code) || locales[0];
export default function(eleventyConfig) {
  const assetVersion = createHash('sha256').update(readFileSync('src/assets/style.css')).update(readFileSync('src/assets/site.js')).digest('hex').slice(0, 12);
  eleventyConfig.addGlobalData('assetVersion', assetVersion);
  for (const path of ['papers', 'photo.jpg', 'test_pdfs']) eleventyConfig.addPassthroughCopy(path);
  eleventyConfig.addPassthroughCopy({'src/assets': 'assets'});
  eleventyConfig.addFilter('getLocale', getLocale);
  eleventyConfig.addFilter('postsFor', (posts, code) => posts.filter(post => post.data.lang === code));
  eleventyConfig.addFilter('pageAlternates', (posts, pageKey, translationKey) => {
    if (pageKey === 'post') return posts.filter(post => post.data.translationKey === translationKey).map(post => ({...getLocale(post.data.lang), url:post.url}));
    const suffix = {home:'', blog:'blog/', publications:'publications/', notFound:'404.html'}[pageKey] || '';
    return locales.map(t => ({...t, url:t.prefix + suffix}));
  });
  eleventyConfig.addFilter('linkLabel', (label, code) => {
    const t=getLocale(code); return ({Paper:t.paper,Slide:t.slides,Slides:t.slides,Code:t.linkCode,'HF model':t.hfModel,'Github page':'GitHub','Demo Youtube':t.demoVideo,'Extended Version':t.extendedVersion})[label] || label;
  });
  eleventyConfig.addFilter('readableDate', (value, code='en') => new Date(value).toLocaleDateString({en:'en-US',ja:'ja-JP',zh:'zh-CN'}[code] || 'en-US', {year:'numeric', month:'long', day:'numeric', timeZone:'UTC'}));
  eleventyConfig.addFilter('isoDate', value => new Date(value).toISOString());
  eleventyConfig.addFilter('year', value => new Date(value).getUTCFullYear());
  eleventyConfig.addFilter('absoluteUrl', path => new URL(path, 'https://dongyuyang.github.io').href);
  eleventyConfig.addFilter('xmlEscape', value => String(value || '').replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c])));
  eleventyConfig.addCollection('publishedPosts', api => {
    const posts=api.getFilteredByTag('posts').filter(item => !item.data.draft).sort((a,b) => b.date-a.date);
    const groups=new Map();
    for(const post of posts){
      const {translationKey,lang}=post.data;
      if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(translationKey || '') || !['en','ja','zh'].includes(lang)) throw Error(`Published posts need a safe translationKey and en/ja/zh language: ${post.inputPath}`);
      const group=groups.get(translationKey) || new Set();
      if(group.has(lang)) throw Error(`Duplicate ${lang} version: ${translationKey}`);
      group.add(lang); groups.set(translationKey,group);
    }
    for(const [key,languages] of groups) if(languages.size!==3) throw Error(`Publish all three translations together (en, ja, zh): ${key}`);
    return posts;
  });
  return {dir:{input:'src',output:'_site'}, markdownTemplateEngine:'njk', htmlTemplateEngine:'njk'};
}

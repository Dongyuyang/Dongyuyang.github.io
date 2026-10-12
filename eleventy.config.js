export default function(eleventyConfig) {
  for (const path of ['papers', 'cv', 'cv.pdf', 'photo.jpg', 'test_pdfs']) eleventyConfig.addPassthroughCopy(path);
  eleventyConfig.addPassthroughCopy({'src/assets': 'assets'});
  eleventyConfig.addFilter('readableDate', value => new Date(value).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric', timeZone:'UTC'}));
  eleventyConfig.addFilter('isoDate', value => new Date(value).toISOString());
  eleventyConfig.addFilter('year', value => new Date(value).getUTCFullYear());
  eleventyConfig.addFilter('absoluteUrl', path => new URL(path, 'https://dongyuyang.github.io').href);
  eleventyConfig.addFilter('xmlEscape', value => String(value || '').replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c])));
  eleventyConfig.addCollection('publishedPosts', api => api.getFilteredByTag('posts').filter(item => !item.data.draft).sort((a,b) => b.date-a.date));
  return {dir:{input:'src',output:'_site'}, markdownTemplateEngine:'njk', htmlTemplateEngine:'njk'};
}

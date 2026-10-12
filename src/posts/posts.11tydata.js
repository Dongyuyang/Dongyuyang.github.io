const prefixes = {en: '/', ja: '/ja/', zh: '/zh/'};
export default {
  tags: ['posts'],
  layout: 'post.njk',
  lang: 'en',
  eleventyComputed: {
    permalink: data => data.draft ? false : `${prefixes[data.lang] || '/'}blog/${data.translationKey || data.page.fileSlug}/`,
    eleventyExcludeFromCollections: data => Boolean(data.draft)
  }
};

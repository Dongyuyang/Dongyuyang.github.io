export default {
  tags: ['posts'],
  layout: 'post.njk',
  lang: 'en',
  eleventyComputed: {
    permalink: data => data.draft ? false : `/blog/${data.page.fileSlug}/`,
    eleventyExcludeFromCollections: data => Boolean(data.draft)
  }
};

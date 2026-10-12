# Personal homepage maintenance

- Maintain Japanese, Chinese, and English together. English stays at `/`, Japanese at `/ja/`, and Chinese at `/zh/`.
- Use the shared templates and `src/_data/locales.json`; update all three language entries in the same change. Keep publication titles, authors, and venues in their original published form.
- Blog posts must have corresponding `en`, `ja`, and `zh` versions with the same `translationKey`. Publish the three versions together; keep incomplete groups as drafts.
- Prefer direct headings such as Research, Publications, Blog, and Career & education. Avoid promotional filler, invented rankings, and decorative slogans. Preserve the user's data → models → agents vision.
- Keep reading text at 18px and supporting text at 16px where practical. Keep the language switch visible on phones. Validate long Japanese text and 320px screens.
- Preserve the original photo at the top, the supplied personal avatar, social links, and the red design.
- SB Intuitions remains current. Use Chief Research Scientist; do not reintroduce LLM Team Tech Lead or Model Development Lead labels. NEC cotomi / cotomi-v2 is a core-team contribution.
- Do not publish CV files or show Initial S content.
- Before publishing, run `npm run build`, `npm run check`, and inspect relevant desktop/mobile views. Verify language switching to the equivalent page or article, then confirm the GitHub Pages deployment succeeds.

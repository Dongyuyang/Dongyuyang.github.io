# Personal research site — red visual direction

## Brief
An English research homepage with bilingual writing. The visitor should quickly understand Yuyang Dong's vision, find evidence in projects and publications, and continue into technical writing. Use the related company palette without naming or promoting that company on the public site.

## Tokens
- Brand red: `#E60012` — key actions, selected states, the research diagram.
- Link red: `#BA0015` — accessible small text on pale surfaces.
- Ink: `#251C20` — headings and body text.
- Secondary ink: `#675F63` — supporting text, never faint microcopy.
- Paper: `#FAFAF9` — long-reading background.
- Blush: `#FFF0F1` — diagram and selected research surfaces.

Type: Manrope for headlines and body; system monospace only for years, numbered stages, and technical diagram labels. Sentence-case navigation and section labels. Reading text is 14px or larger, with 16–18px for main explanatory content; compact dates and diagram labels use 11–13px.

## Layout
A personal research cover: left-aligned three-line vision, right-hand red feedback diagram; below it, projects with distinct hierarchies, an explicit vision statement, publications, writing, and career history.

```
Name                  Research  Vision  Papers  Blog  About
Vision headline       Data / Models / Agents feedback diagram
Who I am              Three accessible layer selectors
Affiliations
Flagship research     Model visualization
Data work             Multimodal work
Vision statement and explanation
Selected papers with links
Writing / published elsewhere
Career and awards
```

Use a memorable diagram instead of adding decoration to every section. Keep content readable before adding motion. Preserve stable paper URLs, search, bilingual blog support, and the explicitly confirmed career details.

## UX review
44px minimum primary touch targets; visible focus; keyboard tabs; mobile menu with Escape and outside-click handling; URL-backed paper search and language filtering; copy that labels external articles; reduced-motion support; no continuous autoplay motion; no hover-only content. Test 320px, phone, tablet, and desktop, including an actual bilingual article fixture that is removed before publishing.

## Guidance consulted
- https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
- https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md
- https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md

The brief takes precedence over generic aesthetic defaults. The primary change is a coherent reading experience and red identity, not an undifferentiated color replacement.

## Verification (2026-10-12)
- Desktop, 900px tablet, 390px and 320px phones inspected; no horizontal page overflow.
- Research tabs verified with click and arrow keys; mobile menu verified with Escape.
- Publication query restores after reload; language filter opens matching English and Chinese fixtures.
- English and Chinese reading layouts inspected; temporary fixture articles removed before final build.
- Font hosted locally with its OFL license; reduced-motion preference supported.

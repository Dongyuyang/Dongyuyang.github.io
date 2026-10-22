# Yuyang Dong (David Dong)

个人研究主页，使用 Eleventy 构建，由 GitHub Actions 发布到 GitHub Pages。

- English：https://dongyuyang.github.io/
- 日本語：https://dongyuyang.github.io/ja/
- 中文：https://dongyuyang.github.io/zh/

## 三语同步维护

网站今后按日文、中文、英文三版一起更新。

- `src/_data/locales.json`：三语文案，三个对象使用相同的键。改内容时同时修改三版。
- `src/index.njk`、`src/blog/index.njk`、`src/publications/index.njk`：共享布局，一次改动作用于三版。
- `src/_data/publications.json`：共享论文资料。题名、作者、会议名称保留发表时的原文。
- `src/_data/site.json`：姓名、社交账号等共同信息。
- `src/assets/style.css`：所有语言共用的布局和字号。
- `src/_includes/base.njk`：导航、语言切换、SEO 和页脚。

语言切换保留当前页面、主页位置和论文搜索条件。文章通过 `translationKey` 对应到同一篇文章的另一语言版本。三语都有独立的首页、博客、论文列表、RSS 和页面元数据。

## 发布博客

`src/posts/` 中有三份 `first-note` 草稿模板。复制后修改文件名和内容，例如：

- `data-models-agents.en.md`
- `data-models-agents.ja.md`
- `data-models-agents.zh.md`

三个文件共用一个 `translationKey`，各自设置 `lang: en`、`lang: ja`、`lang: zh`。标题、摘要和正文分别翻译。例如中文版本：

```markdown
---
title: "从数据到模型与智能体"
description: "文章摘要。"
date: 2026-10-12
lang: zh
translationKey: data-models-agents
draft: true
---

中文正文。
```

三版完成后，**一起**改为 `draft: false` 并在同一次提交中发布。缺少任意语言、语言重复、缺少有效 `translationKey`，构建都会阻止发布。

对应网址：

- `/blog/data-models-agents/`
- `/ja/blog/data-models-agents/`
- `/zh/blog/data-models-agents/`

正文图片放在 `src/assets/`，使用 `![描述](/assets/文件名.png)`。

## 收录外部文章

外部文章、专访和讲座保存在 `src/_data/externalWriting.json`。`date` 使用来源确认的发布日期（讲座使用活动日期），格式为 `YYYY-MM-DD`，`dateSource` 保留核对来源。收录日不替代原发布日期。

`titleKey` 和 `descriptionKey` 对应 `src/_data/locales.json` 中的三语标题与简介；`language` 标明链接内容的原文语言。收录外部链接不等于提供三语全文翻译。

首页、博客和 RSS 使用同一个 `writingFor` 列表，将站内文章与外部条目合并，按日期从新到旧排序。新增条目不用手动调整顺序。

这是公开 GitHub 仓库。`draft: true` 只是不生成网页，源文件仍可在仓库看到；私人内容不要提交。

## 内容口径

SB Intuitions 为当前任职，保留 Chief Research Scientist，不显示 LLM Team Tech Lead。NEC cotomi / cotomi-v2 写核心成员。首页展示原照片和个人头像。不展示 Initial S，不发布 CV 文件。CV 本地副本由 `.gitignore` 排除。

## 本地预览与发布

Node.js 22 或更新版本：

```sh
npm ci
npm run dev
```

预览地址为 http://localhost:8098。

发布前：

```sh
npm run build
npm run check
```

检查包含三语文案键、页面语言和互链、内部链接、论文数量、草稿排除和图片资源。改动提交到 `master` 后自动发布；以 GitHub Actions 的部署成功结果为准。

`_site/` 为生成目录，不提交。CSS 和 JavaScript 使用内容版本号，避免浏览器沿用旧版资源。


## 文章阅读量

2026-10-22 起，站内文章通过不蒜子（https://busuanzi.ibruce.info/）统计页面访问次数。三种语言的 URL 分别计数；重复访问、本人和上线验证访问也可能计入，不代表独立读者或完整阅读人数。之前没有接入统计，不能补造历史数据。外部 Zenn / 官方博客的阅读量不包含在内。

仅生产域名的文章页加载第三方统计脚本（第三方可收到请求 IP、页面 Referer，并可能设置其访客 cookie）；首页、列表和本地预览不加载。文章标题下的说明标出统计起始日期及服务来源。请求失败或超时显示“暂不可用”，而不是 0；延迟成功可恢复真实计数。计数由外部服务保存，GitHub Pages 本身不保存它；第三方服务阻断或中断可能造成漏计。

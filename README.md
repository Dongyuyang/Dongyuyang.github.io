# Yuyang Dong / David Dong

Personal research homepage: https://dongyuyang.github.io

English homepage, bilingual Markdown blog, publication archive, and downloadable CV.
Built with Eleventy; published automatically through GitHub Actions to GitHub Pages.

## 写博客（最常用）

1. 在 GitHub 打开 `src/posts/`，点击 **Add file → Create new file**。
2. 文件名用英文短名，如 `why-data-matters.md`。
3. 复制下面的内容，改标题、摘要、日期和正文，提交到 `master`。
4. 等待仓库 **Actions → Build and deploy homepage** 完成，文章会自动出现在 `/blog/`、首页和 RSS。

```markdown
---
title: "从数据到 Agent：一个研究问题"
description: "这里写一两句话，说明这篇文章讨论什么。"
date: 2026-10-12
lang: zh
draft: false
---

正文从这里开始。支持中文和英文。

## 一个观察

支持 **粗体**、链接、列表、图片和代码块。
```

英文文章设置 `lang: en`。草稿设置 `draft: true`，不会生成公开网页，也不会进入博客列表或 RSS。
**注意：这个 GitHub 仓库是公开的，draft 只是不发布网页；不要把私人笔记或机密内容提交到仓库。**
`src/posts/first-note.md` 是一份不会发布的模板。修改文件名会改变文章地址。

文章图片放在 `src/assets/`，正文使用 `![描述](/assets/文件名.png)`。
修改已发表文章：编辑对应 Markdown 文件并提交即可。

## 修改主页

- `src/index.njk`：首页文案、研究项目、履历。
- `src/_data/publications.json`：完整论文列表；首页自动取最新四项。
- `src/_data/site.json`：个人信息、社交链接、CV 地址。
- `src/assets/style.css`：视觉样式和手机布局。
- `src/assets/site.js`：研究层切换、论文搜索、语言筛选、阅读进度、手机菜单。
- `src/_includes/post.njk`：文章阅读页模板。
- `cv/`、`papers/`：现有 PDF，原链接保持不变。

当前主页口径：SB Intuitions 为在职，NEC cotomi 为核心成员。不展示 Initial S。
历史 CV PDF 单独保留；改主页不会自动改 PDF。
没有原创文章时，博客明确显示待更新状态，并展示已有官方文章、采访和讲义。

## 本地预览

需要 Node.js 22 或更新版本。

```sh
npm ci
npm run dev
```

打开终端显示的地址（默认 http://localhost:8098）。

```sh
npm run build
npm run check
```

`_site/` 是生成目录，不提交。GitHub Pages 的发布来源应设为 **GitHub Actions**。
主分支 `master` 有新提交后会自动构建、检查站内链接并部署；可在 Actions 手动重新运行。
所有旧论文 PDF、照片和旧 CV 文件保持原网址可访问。

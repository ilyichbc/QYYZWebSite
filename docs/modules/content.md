# 新闻与 Markdown

## 功能

- 新闻文章以 Markdown 存放在 `src/content/news/`；
- Frontmatter 由 Zod 校验；
- 首页新闻区块与新闻列表共用排序；
- 详情页渲染 Markdown、显示元信息、上下篇导航；
- 文章同时进入 RSS；
- Markdown 内的图片与站内链接会自动补 CDN / base path。

## 内容入口

- 文章：`src/content/news/*.md`
- 关于页正文：`src/content/pages/about.md`
- Schema：`src/content.config.ts`
- Markdown 增强：`src/plugins/rehype-site-enhance.mjs`

## Frontmatter

```yaml
---
title: "把空气感放回页面"
published: 2026-10-24
updated: 2026-10-25 # 可选
description: "用于列表与 SEO 的摘要"
category: "站点"
cover: "/images/backgrounds/news-clouds.webp"
coverAlt: "暮色海面上伫立的人影"
tags: ["站点", "Astro", "设计"]
author: "星迹线" # 可选，默认值
draft: false
pinned: true
---
```

| 字段          | 作用                              |
| ------------- | --------------------------------- |
| `title`       | 标题，必填                        |
| `published`   | 发布日期，必填，`z.coerce.date()` |
| `updated`     | 更新日期，可选                    |
| `description` | 列表摘要、SEO 描述                |
| `category`    | 分类，用于筛选                    |
| `cover`       | 封面，同时作为详情页头图          |
| `coverAlt`    | 封面 alt                          |
| `tags`        | 标签数组，进入 RSS categories     |
| `author`      | 作者，默认「星迹线」              |
| `draft`       | 草稿；生产构建自动排除            |
| `pinned`      | 置顶                              |

## 排序

`src/utils/content.ts:7`：

1. `draft` 在生产构建被过滤；
2. `pinned` 优先；
3. 其余按 `published` 倒序；
4. 日期格式化使用 UTC，避免构建机器时区导致偏移。

## 路由

`src/pages/news/[...slug].astro`：

- `getStaticPaths()` 在 `page.news.enabled` 为 false 时返回空数组；
- 每个 entry 的 `id` 作为 slug；
- 详情页 `render(entry)` 得到 `Content`；
- 头图使用 `entry.data.cover`，没有时使用 `newsConfig.detailImage`；
- 上下篇来自排序后的相邻条目；
- 文章元信息进入 JSON-LD（`BaseLayout` → `Head`）。

## Markdown 增强

`rehype-site-enhance.mjs`：

- `<img>`：
  - 完整 URL / data 原样；
  - 站内路径按 `cdnPrefix` 或 `basePath` 解析；
  - 补 `loading="lazy"`、`decoding="async"`；
- `<a>`：
  - 站外链接补 `target="_blank"`、`rel="noopener noreferrer"`、`external-link` class；
  - 站内链接补 base path；
  - `#anchor` / `mailto:` 不处理。

代码高亮使用 Astro 内置 Shiki，双主题 `github-light` / `github-dark`，样式在 `src/styles/prose.css`。

## 添加一篇新闻

1. 在 `src/content/news/` 新建 `.md`；
2. 填 Frontmatter；
3. 在正文写 Markdown；
4. `pnpm dev` 预览；
5. `pnpm check && pnpm build`。

置顶：`pinned: true`。草稿：`draft: true`，开发环境可见，生产构建排除。

## 可改进方向

1. MDX（交互组件嵌入）。
2. TOC / 阅读进度 / 相关文章。
3. 阅读时间与字数统计。
4. 内容搜索（Pagefind）。
5. 多语言文章（`lang` 字段 + 翻译字典）。
6. 图片自动生成 `srcset`。

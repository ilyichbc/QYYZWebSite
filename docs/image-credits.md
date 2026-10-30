# 图片与字体素材说明

## 背景图

**当前背景图是二次元测试占位素材，来源、作者与授权方式尚未核实。**

它们用于模板开发和视觉预览，不应直接用于对外上线的站点。正式使用前请替换为自己拍摄、委托创作、购买授权或明确可商用的图片，并更新本文件。

| 文件                                                   | 当前用途                                   |
| ------------------------------------------------------ | ------------------------------------------ |
| `public/images/backgrounds/hero-clouds.webp`           | 首页 Banner、页脚、移动端菜单、OG 图       |
| `public/images/backgrounds/hero-sky.webp`              | 404、文章「空气感」封面                    |
| `public/images/backgrounds/intro-ocean.webp`           | 首页简介                                   |
| `public/images/backgrounds/history-field.webp`         | 首页历史、2025 年度回顾封面                |
| `public/images/backgrounds/news-clouds.webp`           | 首页新闻、官网重制文章封面                 |
| `public/images/backgrounds/contact-sunset.webp`        | 首页联系、联系页                           |
| `public/images/backgrounds/about-glass.webp`           | 关于页正文配图                             |
| `public/images/backgrounds/glass-corridor.webp`        | 关于页头图                                 |
| `public/images/backgrounds/airplane.webp`              | 新闻页头图、新闻详情默认头图、开发日志封面 |
| `public/images/backgrounds/beach-palm.webp`            | 产品列表 / 产品详情头图                    |
| `public/images/backgrounds/products-architecture.webp` | 可选的产品首页模块                         |

`public/images/og-default.jpg` 由 `scripts/generate-og.mjs` 从 `hero-clouds.webp` 合成。

## 产品 logo / 测试素材

`public/images/test/sxwg-logo.webp` 来自测试站点
<https://luminoa.ilyich.top/> 的公开素材，用于「霜星挽歌」产品卡片与详情页。它不是本站原创内容，
正式上线前请替换为自己的项目图片，或确认使用权。

## 字体

- Saira Variable：SIL Open Font License 1.1，通过 `@fontsource-variable/saira` 自托管。
- 中文使用系统黑体回退（Noto Sans SC / 思源黑体 / 苹方 / 微软雅黑）。

## 替换建议

- 保持 3:2 横向构图，宽度 2400px 左右，导出 WebP。
- 产品图建议使用 16:10 或 1:1，详情页 logo 使用 `object-fit: contain`。
- 替换后运行 `pnpm og`（如果改动首页 Banner 图）与 `pnpm check && pnpm build`。

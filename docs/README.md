# 开发文档索引

本目录记录星迹线 Astrorbit 模板的架构、配置与各模块实现。阅读顺序建议：

1. [架构与设计](architecture.md)
2. [配置系统](modules/config.md)
3. 按需阅读模块文档

## 模块文档

| 文档                                     | 内容                                                           |
| ---------------------------------------- | -------------------------------------------------------------- |
| [架构与设计](architecture.md)            | 目标、设计语言、构建链路、分层与关键决策                       |
| [配置系统](modules/config.md)            | `src/config.ts` 的结构、页面开关、base path、阅读顺序          |
| [Banner 首屏](modules/banner.md)         | 整幅底图、遮罩、Slogan 三种模式、逐字显示、HUD 与按钮          |
| [首页滚动模块](modules/home-sections.md) | SectionShell、遮罩、滚动吸附、简介 / 历史 / 新闻 / 联系 / 产品 |
| [导航与页脚](modules/navigation.md)      | 导航生成、头图上的透明导航、移动端菜单、页脚                   |
| [功能页](modules/pages.md)               | 关于 / 联系 / 产品 / 新闻的布局与开关                          |
| [新闻与 Markdown](modules/content.md)    | Content Collections、Frontmatter、排序、Markdown 增强          |
| [图片、CDN 与懒加载](modules/images.md)  | `resolveAsset`、CDN 前缀、base path、懒加载与 LCP 例外         |
| [主题与动效](modules/theme-motion.md)    | 配色注入、明暗切换、字体、揭示动画、滚动吸附                   |
| [SEO、RSS 与部署](modules/seo-deploy.md) | Head、canonical、OG、RSS、robots、Sitemap、GitHub Actions      |
| [测试与截图](modules/qa.md)              | `check` / `build` / Playwright 截图、手动验收清单              |
| [测试素材](image-credits.md)             | 背景图 / 测试 logo 的占位说明与替换建议                        |
| [更新日志](changelog.md)                 | 已完成的改动与已知限制                                         |

## 文档约定

- 代码位置使用 `文件:行号` 或「文件 + 函数 / 选择器」的形式。
- 「配置入口」指用户需要修改的地方；「实现位置」指维护者需要读的代码。
- 「可改进方向」不是 TODO 清单，而是明确说明当前取舍与下一步可能的方向。
- 所有示例内容、统计数字与联系渠道均为占位，正式上线前请替换。

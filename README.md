# 祁阳一中官网

基于「星迹线 Astrorbit」模板改造的祁阳市第一中学静态官网。保留模板的大图铺底、细线排版与克制动效，内容全部替换为祁阳一中的公开信息与真实新闻。

- **站点**：祁阳市第一中学（祁阳一中）—— 省示范性普通高级中学，肇始于 1912 年
- **框架**：Astro 7 + TypeScript + 原生 CSS，零前端框架运行时
- **渲染**：构建期静态生成，可部署在 GitHub Pages、Cloudflare Pages、Vercel、Netlify 等静态服务
- **内容**：Markdown 新闻（来自祁阳一中微信公众号），Zod 校验 Frontmatter
- **配置**：站点、主题、页面开关、首页模块、Banner、图片、动效全部集中在 `src/config.ts`
- **素材**：背景图来自微信公众号「祁阳一中」发布的校园插画（`学校动画风图片`）；新闻正文与配图同步自 `G:\WorkPlace\微信公众号爬虫\wechat-spider\md`
- **动效**：参考终末地与明日方舟官网的镜头式动态——页面加载揭示、Hero Ken Burns 与鼠标视差、粒子成像、区块聚光、滚动视差、半调 / 等高线 / 射线程序化装饰

## 内容来源与真实性

- 校史、校训（博、雅、真、精）、创办时间（1912 年）等公开信息整理自学校官网、微信公众号与百科，详见 `src/content/pages/about.md` 与 `src/config.ts` 中的 `homeConfig.history`。
- 新闻正文与配图来自微信公众号「祁阳一中」的公开推送，共 503 篇，按时间倒序展示。
- 校园插画背景为学校公开图片，仅作本站视觉背景使用。
- 未虚构任何校史事件、统计数据或人物信息；联系方式等以学校官方发布为准。

## 设计语言

设计参考：

- [Blue Archive 官网](https://bluearchive-cn.com/)：整幅天空图、白色 HUD 细线、清晰的层级
- [明日方舟：终末地](https://endfield.hypergryph.com/)：大图铺底、宽体拉丁字、编号与元信息
- [明日方舟官网](https://ak.hypergryph.com/)：克制的深色框架、细线、图像优先

模板只借鉴结构与排版习惯，不使用任何游戏官方素材。视觉原则：

1. **大片图片铺底**：首页每一屏、功能页头图、文章头图都使用整幅大图，文字直接压在图上。
2. **唯一强调色**：默认琉璃蓝 `#0b63d6`，只用于填充、细线和当前位置，不在大面积背景上使用。
3. **细线分割**：1px 线、描边编号、方形标签，不用大圆角、软阴影和「棉花糖」卡片。
4. **宽体拉丁 + 粗体中文**：Saira Variable 负责拉丁字、数字和眉标，中文使用系统黑体。
5. **克制动效**：按 `hypergryph-editorial` 的四层预算执行——每页 1 个 ambient、2–3 个 feedback、1 套 narrative、1 个 signature；反馈 120–240ms，尊重 `prefers-reduced-motion`。
6. **真实数据**：编号、年份、计数都来自配置，示例内容上线前请替换。
7. **轻量航天**：轨迹线、准星、轨道环、条形码与点阵只做低透明度装饰；每页最多一个慢速轨道，主题切换和返回顶部短暂增强；母题参考 [rahoo.online](https://rahoo.online/) 并本地程序化生成。

## 快速开始

环境要求：Node.js `>=22.12`，pnpm `10+`。

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm check        # Astro 类型与模板检查
pnpm build        # 生成 dist/
pnpm preview      # 预览构建产物
pnpm og           # 重新生成默认 OG 图
pnpm screenshots  # 可选：用本机 Chrome 生成视觉截图（需先启动 preview）
```

## 配置入口

绝大多数修改只需要编辑一个文件：**`src/config.ts`**。

| 配置                              | 作用                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| `siteConfig.identity`             | 工作室名称、拉丁字标、简介、成立年份、所在地、logo           |
| `siteConfig.siteURL` / `basePath` | 站点根地址与部署子路径                                       |
| `siteConfig.page`                 | 首页 / 产品 / 新闻 / 关于 / 联系的启用、导航显示、顺序、标题 |
| `siteConfig.seo`                  | 标题模板、默认 OG 图、Twitter Card、robots                   |
| `siteConfig.navbar` / `footer`    | 状态文字、社交链接、页脚栏目与版权                           |
| `themeConfig`                     | 浅色 / 深色配色、默认明暗、字体、主题切换                    |
| `imageConfig`                     | CDN 前缀、懒加载、解码方式                                   |
| `motionConfig`                    | 揭示动画、滚动吸附、装饰密度、粒子与四层动效开关             |
| `bannerConfig`                    | 首屏底图、遮罩、字标、Slogan 模式、按钮、HUD 元素            |
| `homeConfig.sections`             | 首页滚动模块顺序、启用、序号、标题、底图、遮罩               |
| `homeConfig.intro` / `history`    | 简介段落、统计数字、历史时间线                               |
| `aboutConfig` / `contactConfig`   | 关于页与联系页的文案、头图、事实、渠道                       |
| `productsConfig`                  | 产品卡片字段、详情页 slug / 内容、头图、来源链接             |
| `newsConfig`                      | 新闻页文案、头图、详情默认图、首页预览数量                   |

### 图片与 CDN

- 图片放在 `public/images/`，构建时原样复制。
- `imageConfig.cdnPrefix` 会作用于所有站内相对路径图片；完整 URL（`https://...`、`//...`、`data:`）不受影响。
- 页面头图、Banner 等首屏图片使用 `priority` 提前加载，其余图片默认 `loading="lazy"`。这是为了 LCP 性能保留的例外。
- 校园背景图来自学校公开插画；新闻配图来自微信公众号推送。

### 内容

- 新闻：`src/content/news/*.md`，Frontmatter 由 `src/content.config.ts` 校验。
- 关于页正文：`src/content/pages/about.md`。
- 新闻置顶：`pinned: true`；草稿：`draft: true`（生产构建自动排除）。
- 文章封面同时作为详情页头图。若未填写封面，使用 `newsConfig.detailImage`。
- 重新导入新闻：`node scripts/import-news.mjs`（从爬虫目录读取并迁移图片）。

## 部署

### 1. 修改站点地址

```ts
// src/config.ts
siteURL: "https://example.com/", // 只填站点根地址，不含子路径
basePath: "/",                    // 根域名 / 自定义域名
```

GitHub Pages **项目页**（`https://<user>.github.io/Astrorbit/`）示例：

```ts
siteURL: "https://<user>.github.io/",
basePath: "/Astrorbit/",
```

### 2. GitHub Pages

仓库已包含 `.github/workflows/deploy.yml`：

1. 将仓库默认分支设为 `main`；
2. 在仓库 Settings → Pages → Source 选择 **GitHub Actions**；
3. push 后自动执行 `pnpm check`、`pnpm build` 并部署 `dist/`。

子路径部署时，`basePath` 会自动作用于导航、页脚、图片、RSS、robots 和 Markdown 内链；`siteURL` 只填根地址。

### 3. 其它平台

执行 `pnpm build`，将 `dist/` 上传到任意静态托管服务即可。没有服务端依赖。

## 目录结构

```text
src/
├── components/
│   ├── atoms/          # Icon、Image、ButtonLink、SectionHeading
│   ├── control/        # ScrollTop
│   ├── features/
│   │   ├── home/       # 首页滚动模块
│   │   └── pages/      # 关于 / 联系 / 产品 / 新闻 / 产品详情
│   ├── layout/         # Banner、PageHero、SectionShell
│   └── organisms/      # Navbar、Footer
├── content/
│   ├── news/           # Markdown 新闻
│   └── pages/          # 关于页正文
├── layouts/            # BaseLayout、PageLayout、Head
├── pages/              # 路由、RSS、robots、404
├── plugins/            # rehype 图片 / 链接增强
├── scripts/            # 客户端行为
├── styles/             # token、基础、组件、Banner、首页、页面、正文
├── types/              # 配置与图标类型
├── utils/              # 图片、页面、内容、主题
├── config.ts           # 全站配置入口
└── content.config.ts   # 内容 Schema
```

## 文档

- [开发文档索引](docs/README.md)
- [架构与设计](docs/architecture.md)
- [配置系统](docs/modules/config.md)
- [Banner 首屏](docs/modules/banner.md)
- [首页滚动模块](docs/modules/home-sections.md)
- [导航与页脚](docs/modules/navigation.md)
- [功能页](docs/modules/pages.md)
- [新闻与 Markdown](docs/modules/content.md)
- [图片、CDN 与懒加载](docs/modules/images.md)
- [主题与动效](docs/modules/theme-motion.md)
- [SEO、RSS 与部署](docs/modules/seo-deploy.md)
- [测试与截图](docs/modules/qa.md)
- [更新日志](docs/changelog.md)

## 说明

- 站点品牌、首页、关于与新闻内容已替换为祁阳市第一中学的公开信息与真实新闻。
- 校史、统计数字、人物信息均整理自公开资料，未虚构；联系方式等以学校官方发布为准。
- 模板默认按静态站点根路径或自定义域名部署；GitHub Pages 项目子路径已通过 `basePath` 支持。

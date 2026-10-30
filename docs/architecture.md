# 架构与设计

## 1. 目标

星迹线 Astrorbit 是一个面向小型工作室的静态官网模板。它需要在低成本静态托管上运行，同时具备：

- 完整的大图视觉：首页每一屏和功能页头图都用整幅大图铺底；
- 高度集中的配置：页面开关、颜色、Banner、首页模块、图片 CDN 都在 `src/config.ts`；
- 可维护的模块边界：页面只负责组合，布局 / 组件 / 工具分层；
- 可验证的构建：`pnpm check` 与 `pnpm build` 通过；
- 可部署到 GitHub Pages 根路径或项目子路径。

## 2. 设计语言

### 2.1 方向

「夏日的微风」：明亮、开阔、有空气感，但不软。

与早期版本的差异：

| 早期版本（已废弃）               | 当前版本                                 |
| -------------------------------- | ---------------------------------------- |
| 大面积浅色渐变、光斑、毛玻璃卡片 | 整幅大图铺底，叠加深色或亮色遮罩         |
| 大圆角、胶囊按钮、软阴影         | 0–2px 圆角、细线、方形按钮与标签         |
| 强调色用于小面积渐变和卡片       | 强调色只做填充、细线、当前位置           |
| 内容在白色卡片里                 | 文字直接压在图上，靠遮罩与排版保证可读性 |
| 首页像组件展示页                 | 首页像一本有章节的视觉档案               |

### 2.2 参考

- [Blue Archive 官网](https://bluearchive-cn.com/)：天空 / 云层整幅底图、白色 HUD 细线、右侧信息档案。
- [终末地官网](https://endfield.hypergryph.com/)：大图铺底、宽体拉丁字、极细边框、编号与元信息。
- [明日方舟官网](https://ak.hypergryph.com/)：深色框架、图像优先、克制的交互。

只借鉴结构与排版习惯，不使用任何游戏官方素材。背景图为二次元测试占位素材，产品 logo 为星籁浮屿的测试素材，见 [image-credits.md](image-credits.md)。

### 2.3 可变的与固定的

**可变（配置）**

- 强调色、纸色、深色主题色；
- 每张底图、遮罩类型、焦点位置；
- 页面启用 / 禁用、导航顺序；
- Slogan 模式、Banner 文案、按钮；
- 首页模块顺序与启用；
- 动效总开关、滚动吸附、移动端吸附。

**固定（设计规则）**

- 文字直接叠在大图上，必须保留可读遮罩；
- 页面主标题使用中文粗体，拉丁字使用 Saira 宽体大写；
- 可点击元素使用细边框 / 强调色填充，不使用大圆角；
- 大图上的正文最大宽度约 36–44rem；
- 动效短、轻、可关闭。

## 3. 技术栈

| 类别       | 选择                                       | 作用                                    |
| ---------- | ------------------------------------------ | --------------------------------------- |
| 元框架     | Astro 7                                    | 静态路由、Content Collections、构建     |
| 语言       | TypeScript 5.9                             | 配置、工具、组件 Props                  |
| 样式       | 原生 CSS + CSS 变量                        | 设计 token、布局、动效                  |
| 字体       | `@fontsource-variable/saira`               | 自托管 Saira Variable（wght + wdth 轴） |
| Markdown   | `@astrojs/markdown-remark` + 自定义 rehype | 文章渲染、图片 / 链接增强               |
| 内容       | Markdown + Zod                             | 新闻、关于页                            |
| 订阅 / SEO | `@astrojs/rss`、`@astrojs/sitemap`         | RSS、Sitemap                            |
| 辅助       | Sharp、Playwright（dev）                   | OG 图生成、视觉截图                     |

没有 Svelte / React 岛。页面的交互都是原生 TypeScript，构建后只有很小的脚本。

## 4. 构建链路

```text
src/config.ts + src/types/config.ts
        ↓
src/content/** + src/content.config.ts
        ↓
src/pages/**  →  src/layouts/**  →  src/components/**
        ↓
Astro SSG 生成 dist/
        ↓
GitHub Actions / 任意静态托管
```

运行时只加载：

- `src/scripts/site.ts`：主题、揭示、导航状态、移动端菜单、返回顶部；
- `Banner.astro` 内的 Slogan 脚本：随机 / 一言 / 逐字显示；
- `NewsPage.astro` 内的分类筛选脚本。

## 5. 分层与依赖方向

```text
pages
  ↓
layouts
  ↓
components/{layout,organisms,features,control}
  ↓
components/atoms
  ↓
utils / types / config / styles
```

约定：

- `pages/` 只做路由、数据准备和组件组合；
- `layouts/` 负责 HTML 壳层、Head、导航、页脚与全局脚本；
- `features/` 按业务域闭合：首页模块、功能页；
- `atoms/` 不读取业务页面文案；
- `utils/` 不依赖 UI，只处理路径、日期、页面开关、主题 CSS；
- `styles/` 只放全局 token、基础、语义类与页面级样式；组件私有样式放在组件 `<style>` 内。

## 6. 目录与关键文件

```text
src/
├── config.ts                     # 全站配置入口
├── types/config.ts               # 配置契约
├── content.config.ts             # Content Collections Schema
├── content/news/*.md             # 新闻
├── content/pages/about.md        # 关于页正文
├── pages/
│   ├── index.astro               # 首页
│   ├── [page].astro              # 关于 / 联系 / 产品 / 新闻（按开关生成）
│   ├── news/[...slug].astro      # 新闻详情
│   ├── 404.astro
│   ├── rss.xml.ts
│   └── robots.txt.ts
├── layouts/
│   ├── BaseLayout.astro          # HTML、Head、导航、页脚、全局脚本
│   ├── PageLayout.astro          # 功能页壳层
│   └── partials/Head.astro       # SEO / 主题注入
├── components/
│   ├── layout/Banner.astro       # 首页首屏
│   ├── layout/SectionShell.astro # 首页整幅图区块
│   ├── layout/PageHero.astro     # 功能页头图
│   ├── organisms/Navbar.astro
│   ├── organisms/Footer.astro
│   ├── atoms/Barcode.astro       # 程序化条形码
│   ├── atoms/HalftoneField.astro # 半调点阵装饰
│   ├── atoms/ContourField.astro  # 程序化等高线
│   ├── atoms/RayField.astro      # 射线场装饰
│   ├── atoms/ParticleField.astro # Canvas 粒子与连线
│   ├── control/LoadingVeil.astro # 页面加载揭示
│   ├── features/home/*           # 首页各模块
│   └── features/pages/*          # 功能页
├── styles/
│   ├── tokens.css                # 尺寸 / 动效 / 媒体文字 token
│   ├── base.css                  # 重置、布局、揭示、滚动吸附
│   ├── components.css            # 眉标、按钮、标签、记录行、编号
│   ├── banner.css                # 首屏
│   ├── home.css                  # 首页区块、遮罩、联系、产品预览
│   ├── page.css                  # 功能页头图与内容
│   └── prose.css                 # Markdown 正文
├── utils/
│   ├── assets.ts                 # base path、CDN、绝对 URL
│   ├── pages.ts                  # 导航 / 功能页开关
│   ├── content.ts                # 新闻排序 / 日期 / 分类
│   └── theme.ts                  # CSS 变量注入、主题初始化脚本
├── scripts/site.ts               # 全站客户端行为
└── plugins/rehype-site-enhance.mjs

.claude/skills/hypergryph-editorial/   # 同步自用户其他项目的设计 skill
```

## 7. 关键决策

### 7.1 图片放在 `public/`，构建期只做路径解析

模板需要支持「CDN 前缀」和「完整 URL 不受影响」，因此背景图与内容图使用 `public/images/`，不经过 Astro 的图片优化管线。`resolveAsset()` 统一处理：

- 完整 URL / `data:` / 协议相对 URL 原样返回；
- 配置了 `cdnPrefix` 时，站内路径拼到 CDN 前缀；
- 否则补上部署子路径 `basePath`。

代价是失去 Astro 的自动 `srcset` 与格式转换；当前通过 WebP、合理尺寸和懒加载控制体积。改进方向见 [modules/images.md](modules/images.md)。

### 7.2 主题颜色在构建时注入 CSS 变量

`themeConfig` 不通过组件层层传参，而是在 `Head.astro` 里生成一段 `<style is:inline>`，定义浅色 / 深色两套变量。这样换强调色只改配置。主题初始化脚本在首屏渲染前运行，避免闪白。

### 7.3 首屏导航透明，越过头图后变深色

`Navbar` 接收 `overHero`，首页 Banner、功能页 PageHero、文章头图和 404 都带 `data-hero`。`site.ts` 监听滚动：

```text
hero.getBoundingClientRect().bottom <= headerHeight
  → header.classList.add("is-solid")
```

首页 Hero 上的导航完全透明；离开 Hero 后切换为半透明黑色玻璃：明亮模式 `rgba(0,0,0,.45)`、黑暗模式 `rgba(0,0,0,.62)`，带 `blur(24px) saturate(155%)`、顶部高光与强调线段。其他页面初始即为玻璃态。导航中的中文与拉丁文按各自标签居中对齐。

### 7.4 大图区块 = 图片 + 遮罩 + 文字上浮

`SectionShell` 负责渲染：

1. `<Image class="home-section__bg">`；
2. `.home-section__overlay--dark|light`；
3. `.on-media` / `.on-light` 上下文变量；
4. 内容容器 `.home-section__inner`。

业务组件只关心内容，不重复处理遮罩和文字颜色。

### 7.5 首页滚动吸附是增强，不是限制

`motionConfig.scrollSnap` 控制 `scroll-snap-type`，默认 `mandatory` + `scroll-snap-stop: always`：

- Banner 与每个首页区块都是吸附点；
- 页脚使用 `scroll-snap-align: end`，保证最后一屏之后仍能滚到页脚；
- 吸附模式下压缩区块纵向留白，让一屏内容真正落在一屏内；
- 如果任一区块仍高于视口（例如矮窗口），`site.ts` 会把 `data-snap-fit` 设为 `off`，退化为 `proximity`，避免困住内容；
- 1023px 以下默认关闭吸附；每个区块仍是 `min-height: 100svh`，内容更高时自然撑开。

### 7.6 所有功能页可关闭且真正不生成

`page` 配置决定：

- 导航 / 页脚自动过滤；
- `[page].astro` 的 `getStaticPaths` 只为启用页返回参数；
- 新闻详情在新闻页关闭时返回空路径；
- Banner 按钮、首页区块里的「全部消息」等链接同步消失。

因此关闭页面后不会留下 404 死链。

### 7.7 部署子路径

`siteConfig.siteURL` 只填根地址，`siteConfig.basePath` 填子路径。`withBase()` 统一处理站内链接、资源、RSS、robots 和 Markdown 内链。根路径部署时 `basePath: "/"`，行为与普通站点一致。

## 8. 性能取舍

- **首屏图片 eager**：Banner 与 PageHero 使用 `priority`，其余 lazy；这是 LCP 性能的明确例外。
- **原生 CSS**：没有 Tailwind / CSS-in-JS 运行时。
- **极少 JS**：只有主题、揭示、菜单、返回顶部、Slogan、新闻筛选。
- **背景图使用 WebP**：2400px 宽，质量 82；Hero 约 90KB。
- **遮挡与文字**：遮罩使用 CSS 渐变，不额外请求图片。
- **动画**：只改 opacity / transform / clip-path / stroke-dashoffset，减少布局抖动；Hero 环组、Ken Burns、粒子属于同一环境系统；尊重 `prefers-reduced-motion`。
- **装饰**：半调、等高线、射线、条码、点阵、工程网格全部由 CSS/SVG 本地程序化生成，不做位图贴图；移动端隐藏高成本图元。
- **粒子**：2D Canvas，DPR ≤ 2，离屏暂停，reduced-motion 只绘制静态帧；不引入 Three.js 或动画库。
- **视频**：可选背景视频，使用原生 `<video autoplay muted loop playsinline>` + poster，留空时回退图片与 Ken Burns。

## 9. 可改进方向

1. 用 Astro `<Image>` / Sharp 为内容图生成多尺寸 `srcset`，同时保留 CDN 前缀模式。
2. 给 Banner 增加 `<picture>` 艺术方向（桌面 / 手机不同裁切）。
3. 把 `src/config.ts` 按域拆成 `config/site.ts`、`config/home.ts` 等，再用一个入口聚合，降低单文件长度。
4. 增加文章目录、相关文章、阅读时间与搜索。
5. 增加 Lighthouse CI 与 Playwright 断言，替代只靠截图的人工验收。
6. 产品详情已由 `src/pages/products/[slug].astro` 按配置生成；如需图集或复杂字段，可进一步迁到 Content Collections。

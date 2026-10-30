# 配置系统

## 功能

全站可调项集中在一个文件：`src/config.ts`。它覆盖站点标识、页面开关、主题、图片、动效、Banner、首页模块、功能页文案、产品、新闻与页脚。

配置类型在 `src/types/config.ts`。新增字段的顺序是：

1. 在类型里增加字段；
2. 在 `src/config.ts` 给默认值；
3. 在消费组件读取，并保留兜底；
4. 运行 `pnpm check` 和 `pnpm build`。

## 配置入口

| 导出             | 位置                | 作用                                                    |
| ---------------- | ------------------- | ------------------------------------------------------- |
| `siteConfig`     | `src/config.ts:19`  | 标识、站点地址、base path、页面开关、SEO、导航、页脚    |
| `themeConfig`    | `src/config.ts:200` | 浅色 / 深色配色、默认主题、字体、主题切换               |
| `imageConfig`    | `src/config.ts:249` | CDN 前缀、懒加载、解码                                  |
| `motionConfig`   | `src/config.ts:257` | 动效总开关、揭示、滚动吸附                              |
| `bannerConfig`   | `src/config.ts:272` | 首屏底图、视频、粒子回响、遮罩、字标、Slogan、按钮、HUD |
| `homeConfig`     | `src/config.ts:333` | 首页区块顺序 / 开关 / 底图，简介与历史内容              |
| `aboutConfig`    | `src/config.ts:465` | 关于页文案、事实、头图、配图                            |
| `contactConfig`  | `src/config.ts:486` | 联系页文案、渠道、头图                                  |
| `productsConfig` | `src/config.ts:528` | 产品卡片字段、详情内容、slug、头图、来源链接            |
| `newsConfig`     | `src/config.ts:593` | 新闻页文案、头图、详情默认图、预览数量                  |

## 页面开关

`siteConfig.page` 是 `PageConfigMap`：

```ts
home: {
  enabled: true,
  inNav: true,
  navOrder: 1,
  label: "首页",
  latin: "INDEX",
  href: "/",
  title: "星迹线 Astrorbit",
  description: "…",
}
```

- `enabled: false`：页面不生成，导航 / 页脚 / Banner 按钮 / 首页链接自动隐藏。
- `inNav: false`：页面仍生成，但不出现在主导航。
- `navOrder`：导航与页脚顺序。
- `href`：站内路径，最终由 `withBase()` 补部署子路径。

生成逻辑：

- `src/utils/pages.ts:24` `getNavItems()`：按开关与顺序生成导航。
- `src/utils/pages.ts:49` `filterNavItems()`：页脚链接过滤与 base path。
- `src/utils/pages.ts:64` `getGeneratableFeaturePages()`：`[page].astro` 的静态路径来源。
- `src/pages/[page].astro:9` `getStaticPaths()`：关闭页面不生成路由。
- `src/pages/news/[...slug].astro:17`：新闻页关闭时返回空路径。

## 站点地址与子路径

```ts
siteURL: "https://example.com/", // 只填根地址
basePath: "/",                    // 根路径；GitHub Pages 项目页填 "/仓库名/"
```

- `siteURL` 用于 canonical、OG、RSS、Sitemap 的绝对地址。
- `basePath` 传给 Astro `base`，并用于站内链接 / 资源 / Markdown 内链。
- 根路径部署：不改 `basePath`。
- 项目子路径部署：`siteURL: "https://<user>.github.io/"`，`basePath: "/Astrorbit/"`。

相关实现：`astro.config.mjs`、`src/utils/assets.ts:19` `withBase()`。

## 图片

```ts
imageConfig: {
  cdnPrefix: "",     // 例：https://cdn.example.com/astrorbit
  lazy: true,
  eagerHero: true,
  decoding: "async",
}
```

- `cdnPrefix` 只影响站内路径；完整 URL 原样返回。
- 图片路径写在 `public/images/...`，使用 `resolveAsset()` 统一解析。
- `eagerHero` 是 LCP 性能例外：Banner 与 PageHero 使用 `priority`，其余默认懒加载。

详见 [images.md](images.md)。

## 主题

```ts
themeConfig: {
  defaultMode: "system",
  toggle: true,
  storageKey: "astrorbit-theme",
  light: { paper, panel, ink, accent, sky, … },
  dark: { … },
  imageScrimOpacity: { light: 0.84, dark: 1 },
  fonts: { latin, chinese, body, mono },
}
```

- 颜色在 `Head.astro` 中注入为 CSS 变量，见 `src/utils/theme.ts:25`。
- 默认明暗在 `src/utils/theme.ts:54` 的初始化脚本里读取。
- 主题切换按钮在 `Navbar.astro`，逻辑在 `src/scripts/site.ts:94`。
- 大图上的文字颜色通过 `.on-media` / `.on-light` 切换，不依赖主题。
- 默认纸色：明亮 `#ECEFF1`，黑暗 `#0b1924`。
- `imageScrimOpacity` 控制图片深色遮罩：明亮模式 `.84`，黑暗模式 `1`；Navbar 蒙版在明亮模式为较浅的黑色，黑暗模式为更实的黑色。

详见 [theme-motion.md](theme-motion.md)。

## 产品

```ts
productsConfig: {
  eyebrow, title, lead, note,
  homePreviewCount,
  hero: { image, imageAlt, imagePosition, overlay },
  items: [
    {
      id, slug, index, title, latin, description,
      status, year, image, imageAlt, heroImage, href,
      tags, enabled,
      detail: {
        description: string[],
        characters: { name, tags, description }[],
        downloadNote, downloads: { label, note, href, external }[],
        creditsNote, sourceHref, sourceLabel,
      },
    },
  ],
}
```

- `slug` 存在时自动生成 `/products/<slug>/` 详情页；
- `href` 为空时卡片指向本地详情页；填完整外链时优先外链；
- 卡片字段均为可选展示项，留空自动隐藏；
- `detail` 里的内容会原样展示，没有真实资料时不要填写虚构内容；
- 首页产品预览与产品列表共用 `getProductHref()`。

当前「霜星挽歌」资料来自 <https://luminoa.ilyich.top/product/sxwg>。

## 动效

```ts
motionConfig: {
  enabled: true,
  reveal: true,
  scrollSnap: {
    enabled: true,
    mobile: false,
    behavior: "mandatory",
    stop: "always",
  },
  decor: {
    halftone: true,
    contour: true,
    rays: true,
    canvasField: false,
    particles: true,
    density: "medium",
  },
  ambient: {
    heroOrbit: true,
    heroMotes: true,
    sectionDrift: true,
    pageHeroOrbit: true,
    articleRecord: true,
  },
  feedback: {
    cardTilt: true,
    barcodeScan: true,
    buttonSignal: true,
  },
  narrative: {
    statsCount: true,
    contourDraw: true,
    revealDistance: 40,
  },
  signature: {
    heroScan: true,
  },
}
```

- `enabled: false` 时 `html[data-motion="off"]` 关闭过渡时长与全部新增装饰。
- 滚动吸附只在首页开启；默认 `mandatory` + `always`，1023px 以下默认关闭。
- 如果区块内容高于视口，会退化为 `proximity`，确保内容可读。
- `reveal: false` 时所有内容直接显示；`basePath` 等与动效无关的配置不受影响。
- 揭示动画由 `src/scripts/site.ts:140` 的 IntersectionObserver 驱动。
- `decor.density` 控制半调点距与透明度：`low / medium / high`。
- `decor.particles` 控制 Hero / 简介区块 / 文章头图的 Canvas 粒子层。
- `decor.canvasField` 为动态 Canvas 线场预留开关，默认关闭。
- `bannerConfig.video`、`homeConfig.sections[].video`、`PageHeroMedia.video` 可填视频路径（mp4/webm），留空时使用图片与 Ken Burns。
- `bannerConfig.particleEcho` 控制覆盖整个视口的粒子成像（文字/图片采样区域位于页面中央偏上）：
  - `mode: "text" | "image"`：文字或图片采样；
  - `text` / `image`：文字内容或图片路径；
  - `count`：粒子数量，当前 35200；
  - `stir`：搅动强度 0–100，默认 40；
  - `spring`：回弹强度 0–100，默认 10。
- `ambient` 控制 Hero 环组 / 光点 / 区块漂移 / 头图轨道 / 文章唱片。
- `feedback` 控制卡片透视、条码扫描、按钮信号条。
- `narrative` 控制统计数字增长、等高线绘制与揭示位移。
- `signature.heroScan` 控制首屏档案扫描，`sessionStorage` 记录，同一会话只执行一次。
- 系统 `prefers-reduced-motion` 始终被尊重。

## 新增配置字段的检查清单

1. `src/types/config.ts` 增加字段；
2. `src/config.ts` 增加默认值；
3. 组件读取并给出兜底；
4. 若是页面开关，同步：
   - `getNavItems()`
   - `getGeneratableFeaturePages()`
   - Banner / 首页模块里的条件链接
5. 更新 README 与对应模块文档；
6. `pnpm check && pnpm build`。

## 可改进方向

- 当前 `src/config.ts` 约 570 行，后续可按 `site / theme / home / pages` 拆分再用一个入口聚合，降低单文件长度。
- 可用 Zod 对 `src/config.ts` 做运行时校验，提前发现图片路径或颜色格式错误。
- 如果要给非技术用户使用，可加一个本地配置面板，生成 `src/config.ts`。

# Banner 首屏

## 功能

首页第一屏：整幅天空大图铺底，深色渐变遮罩，白色中文大标题、拉丁字标、Slogan、操作按钮和右侧档案信息。

- 底图、焦点位置、遮罩类型可配置；
- 字标可用文字或图片；
- Slogan 支持固定、随机、一言 API 三种模式；
- 可开启逐字显示；
- 按钮可按功能页开关自动隐藏；
- 可选细网格、颗粒、HUD 边框、静态光点；
- 桌面端右侧档案下方有程序化条形码；
- 星空光点静态，HUD 虚线环以 20s 极慢自转，内侧带 60 格静态刻度环；
- 移动端隐藏右侧档案与底部滚动提示，内容压缩到一屏。

## 配置入口

`src/config.ts` 的 `bannerConfig`：

```ts
{
  enabled: true,
  background: "/images/backgrounds/hero-sky.webp",
  backgroundPosition: "center 55%",
  overlay: "dark",              // dark | light | none
  kicker: "// ASTRORBIT / AIR 2026",
  actions: [
    { label: "了解工作室", href: "/about/", variant: "solid",
      enabled: true, requiresFeature: "about" },
    { label: "查看产品", href: "/products/", variant: "ghost",
      enabled: true, requiresFeature: "products" },
  ],
  showFrame: true,
  showGrid: false,
  showGrain: true,
  logoMode: "inherit",          // inherit | text | image
  logoImage: "",
  logoAlt: "星迹线 Astrorbit",
  slogan: {
    mode: "random",             // fixed | random | hitokoto
    fixed: "把空气做成页面。",
    list: ["…"],
    typing: true,
    hitokoto: {
      endpoint: "https://v1.hitokoto.cn/",
      categories: ["d", "i", "k"],
      timeoutMs: 4500,
      fallback: ["…"],
    },
  },
  scrollHint: { enabled: true, label: "向下滚动" },
  meta: {
    topLeft: "// STUDIO FILE 001",
    topRight: "EST. 2021 / CN",
    bottomLeft: "31.2304° N / 121.4737° E",
    bottomRight: "SCROLL TO EXPLORE",
  },
}
```

## 实现

### 结构

`src/components/layout/Banner.astro`：

```text
<section class="hero" data-hero>
  <Image class="hero__bg" priority />
  <div class="hero__veil" />
  <span class="hero__scan" />        ← 首次进入的档案扫描线
  <ParticleEcho />                   ← 全屏文字/图片粒子成像
  <ParticleField />                  ← Canvas 粒子与连线
  <span class="hero__spotlight" />   ← 跟随鼠标的局部聚光
  <div class="hero__ring" />         ← 右侧 HUD 圆环
  <div class="hero__ghost" />        ← 竖排描边字标
  <div class="hero__motes" />        ← 漂浮光点
  [hero__grid] [hero__grain] [hero__frame]
  <div class="container hero__inner">
    <div class="hero__rail hero__rail--top" />
    <div class="hero__center">
      <div class="hero__block">kicker / 字标 / slogan / actions</div>
      <aside class="hero__side">location / established / status / index</aside>
    </div>
    <div class="hero__rail hero__rail--bottom">…</div>
  </div>
</section>
```

- 底图使用 `<img>`（`Image` 原子），`priority` 使其 eager + `fetchpriority="high"`。
- 遮罩、HUD 线、光点、描边字都在 `src/styles/banner.css`。
- `data-hero` 供 `site.ts` 判断导航栏何时变为深色实心。

### Slogan

初始服务端文本放在 `[data-slogan-visible]`（可见）和 `[data-slogan-sr]`（屏幕阅读器）。客户端脚本在 `Banner.astro` 内：

- 读取 `data-slogan-mode / list / fixed / fallback`；
- `fixed`：使用固定句；
- `random`：从列表随机；
- `hitokoto`：先用本地 fallback 逐字显示，再并发请求一言；请求成功且文本不同则淡入替换；
- 请求失败、超时、CORS 受限时保留本地句子；
- `prefers-reduced-motion` 或 `data-motion="off"` 时直接显示全文；
- 使用 `typingToken` 防止旧打字定时器覆盖新文本。

相关代码：`Banner.astro:231` 起。

### 按钮

`bannerConfig.actions` 的 `requiresFeature` 会读取 `siteConfig.page[...]`：

- 关闭对应功能页时按钮不渲染；
- `ButtonLink` 负责 base path、外链 `target/rel`、样式变体；
- 变体：`solid`（白色实心，适合大图）、`accent`（强调色）、`ghost`（透明描边）。

### 遮罩

三种模式：

- `dark`：深蓝黑渐变 + 左侧加强，默认，白字；
- `light`：浅色渐变 + 强制深色文字（`.on-light`），适合浅色底图；
- `none`：只保留上下轻微渐变，适合自带深色的图；不推荐浅色图。

### 响应式与动效

- 桌面：标题左下、档案右下；HUD 圆环 / 描边字在右侧。
- 移动：隐藏档案、圆环、描边字和底部 rail；标题、Slogan、按钮保留。
- HUD 环组是首页唯一的环境系统：虚线环 20s 正转、内侧刻度环 40s 反转、10 个光点 20s 极慢漂浮；由 `motionConfig.ambient.heroOrbit / heroMotes` 控制。
- 底图有 24s Ken Burns（1.0→1.12）；鼠标在 Hero 上时，环、描边字、光点做 ±18px 视差，并出现 300px 局部聚光。
- 首次进入时执行一次 1200ms 水平扫描线 + 1000ms 标题遮罩揭示（`motionConfig.signature.heroScan`），`sessionStorage` 记录 `astrorbit-hero-scan`，同一会话不重复；属于全站唯一的标志级效果。
- `ParticleEcho` 使用覆盖整个视口的 `position: fixed` 画布，把 `particleEcho.text` 或 `particleEcho.image` 采样成粒子；采样区域偏右上，中心约在 `(69vw, 29vh)`，与左下大标题形成对角呼应。当前示例使用 `mode: "image"` 与 `/images/brand/logo.png`。
- 粒子透明度按到采样包围盒边缘的距离计算，并叠加角度噪声与位置噪声：中心约 0.75–1，边缘降到约 0.2，边缘形状不规则；目标位置有 ±1px 抖动。
- 粒子可在全屏游荡，鼠标移动时在光标附近形成涡旋与平流，松手后由低刚度弹簧缓慢归位。默认搅动 40、回弹 10、35200 粒子，1023px 以下隐藏。
- 首屏大标题使用 `bannerConfig.logoMode: "text"` 的文字字标；导航栏仍按 `identity.logo` 显示图片 logo。
- 可选视频背景：`bannerConfig.video` 填入 mp4/webm 后替代静态底图，使用 `autoplay muted loop playsinline` 与 poster；留空时使用图片 + Ken Burns。
- 滚动提示的 accent 光点 2.4s 循环下落；Slogan 保留逐字显示与光标闪烁。
- `prefers-reduced-motion: reduce` 时关闭轨道环、光点、Ken Burns、粒子、聚光、扫描线、光标和逐字显示，并暂停视频。

## 可改进方向

1. 增加 `<picture>` / `srcset`，给桌面和手机不同裁切。
2. 支持视频底图（`<video autoplay muted loop playsinline>`），并保留图片 poster。
3. 给一言结果加 sessionStorage 缓存，减少重复请求。
4. 增加 Slogan 长度上限与自动截断，避免极长文本破坏小屏布局。
5. 给 HUD 元素做配置化（圆环、坐标、编号可单独开关）。
6. 增加首屏图片预加载提示 / LQIP，进一步优化 LCP。

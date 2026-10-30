# 主题与动效

## 功能

- 浅色 / 深色两套完整主题：明亮纸色 `#ECEFF1`，黑暗纸色 `#0b1924`；
- 颜色与字体在构建时注入 CSS 变量；
- 首屏前确定主题，避免闪白；
- 支持系统主题、手动切换、localStorage 记忆；
- 大图区块有独立的明暗文字上下文；
- 动效可整体关闭，并尊重 `prefers-reduced-motion`；
- 首页滚动吸附可配置；
- 主题切换带工业航天 HUD 动画；
- 返回顶部按钮带轨道环 / 发射尾迹动画；
- 页面与文章背景带低透明度轨迹线；
- 全站环境装饰保持静态，动效只发生在状态变化和交互时。

## 配置入口

`src/config.ts`：

```ts
themeConfig: {
  defaultMode: "system",       // system | light | dark
  toggle: true,
  storageKey: "astrorbit-theme",
  light: { paper, panel, panelGlass, ink, inkSoft, muted, line, lineStrong,
           accent, accentInk, accentSoft, sky },
  dark: { … },
  fonts: { latin, chinese, body, mono },
}
```

`motionConfig`：

```ts
{
  enabled: true,
  reveal: true,
  scrollSnap: { enabled: true, mobile: false, behavior: "mandatory", stop: "always" },
}
```

## 实现

### 颜色注入

主题切换使用 View Transitions API：从主题按钮位置做圆形揭示，同时在按钮周围展开两层轨道环、一条横向扫描线和 `MODE // LIGHT/DARK` 标签。不支持 View Transitions 时退回直接切换 + 同样的 HUD 环。

`themeConfig.imageScrimOpacity` 控制图片深色遮罩，默认明亮 `.84`、黑暗 `1`；Navbar 在明亮模式使用较浅的黑色蒙版，黑暗模式使用更实的黑色蒙版。

`src/utils/theme.ts:25` 的 `buildThemeCss()` 输出：

- `:root, :root[data-theme="light"]`：浅色变量 + 字体；
- `:root[data-theme="dark"]`：深色变量；
- `@media (prefers-color-scheme: dark)` 下的无 JS 兜底。

`Head.astro` 用 `<style is:inline>` 插入这段 CSS。这样：

- 换强调色只改 `config.ts`；
- 不需要在每个组件里传 theme；
- 深色主题不是自动反色，而是独立配色。

### 主题初始化

`src/utils/theme.ts:54` 的脚本在 `<head>` 中执行：

```text
读取 localStorage → 没有则使用 defaultMode
system 时读取 prefers-color-scheme
写入 <html data-theme> 与 data-themeMode
给 <html> 加 .js
```

- `.js` 类用于揭示动画：没有 JS 时内容直接可见。
- `data-theme` 在首次绘制前设置，避免闪白。

### 切换

`src/scripts/site.ts:94` 的 `setTheme()`：

- 在 `light` / `dark` 之间切换；
- 写入 `data-theme` 与 localStorage；
- 所有 `[data-theme-toggle]` 按钮共享逻辑；
- 图标显示由 CSS 的 `[data-theme="dark"]` 控制。

### 大图上的文字上下文

- `.on-media`：强制白色 / 浅色文字、线、强调色，用于深色遮罩。
- `.on-light`：强制浅色背景上的深色文字，即使站点是深色主题。
- 两套变量都定义在 `src/styles/base.css`。
- 组件只使用 `--ink / --ink-soft / --muted / --line / --accent`，因此在两种上下文中都能正确工作。

### 字体

- Saira Variable：`@fontsource-variable/saira/wdth.css`，包含 wght 与 wdth 轴；宽体标签使用 `font-stretch`。
- 中文：`Noto Sans SC / 思源黑体 / 苹方 / 微软雅黑` 系统栈。
- 拉丁字用于眉标、编号、日期、按钮；中文用于标题和正文。
- 数字使用 `font-variant-numeric: tabular-nums`，保持对齐。

### 动效清单

按 `hypergryph-editorial` 的四层预算执行：每页 1 个 ambient、2–3 个 feedback、1 套 narrative、1 个 signature。

下表是 2026-10-26 增强前的基线，用于对照；本轮新增与调整见下一节。

| 层级      | 动效        | 位置                                          | 说明                                                                               |
| --------- | ----------- | --------------------------------------------- | ---------------------------------------------------------------------------------- |
| ambient   | 环境轨道    | `banner.css` / `SpaceLines` / `RecordPattern` | 每页只保留 1 个 20s 极慢旋转；首页是 Hero 虚线环，功能页是头图虚线弧，文章是主唱片 |
| narrative | 页面进入    | `base.css` `page-in`                          | 500ms 淡入，一次完成                                                               |
| narrative | 滚动揭示    | `base.css` + `site.ts`                        | 560ms opacity / translateY(10px) / blur(2px)，进入即停                             |
| narrative | 区块刻度线  | `home.css`                                    | 标题下刻度线 560ms `scaleX` 展开，随首次揭示触发                                   |
| narrative | 图片揭示    | `components.css`                              | `image-frame` 700ms clip-path 自下而上揭示，随 `data-reveal` 触发                  |
| narrative | 条形码打印  | `components.css` + `Barcode.astro`            | 360ms + 7ms/条 stagger，随 `data-reveal` 触发                                      |
| narrative | 列表揭示    | `ProductsPage` / `NewsPage`                   | 产品卡 70ms、新闻行 55ms stagger，随滚动首次进入                                   |
| signature | 主题切换    | `base.css` + `site.ts`                        | 900ms 圆形揭示 + 轨道环 + 扫描线 + HUD 标签，一次完成                              |
| feedback  | 返回顶部    | `ScrollTop` + `site.ts`                       | 悬停环 160ms 放大；点击 720–760ms 发射，一次完成                                   |
| feedback  | 按钮悬停    | `components.css`                              | 斜线纹理 200ms 扫过 + 箭头位移 2px                                                 |
| feedback  | 产品卡      | `page.css`                                    | 角标 200ms 滑入、图片 220ms 轻微 scale、扫描线 220ms                               |
| feedback  | 图片悬停    | `image-frame` / 产品卡                        | 220ms 轻微 scale                                                                   |
| feedback  | 条形码      | `Barcode.astro` / `page.css`                  | 产品卡悬停时透明度 200ms 提高；条形码本身静态                                      |
| ambient   | Slogan 光标 | `banner.css` `caret-breathe`                  | 1.8s 循环，仅作为逐字显示光标                                                      |
| narrative | Slogan 打字 | `Banner.astro`                                | 42–68ms / 字符，一次完成                                                           |
| feedback  | 记录行悬停  | `components.css`                              | 左侧 2px 强调线 + 7px 内缩                                                         |

### 饱和式增强（2026-10-26，3 轮）

按用户要求参考 endfield / ak 官网的镜头式动态，连续三轮提高密度。

| 层        | 首页                                                                                                                                                       | 功能页                                             | 文章页                       |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------- |
| ambient   | Hero HUD 环组（虚线环 20s、刻度环 40s 反转、10 个光点 20s 漂浮）、Ken Burns 1.0→1.12/24s、Canvas 粒子、右侧粒子回响、半调 10s 呼吸、区块背景漂移与镜头归位 | 头图虚线弧 20s、光点漂浮、轨迹流动、粒子、半调呼吸 | 主唱片 20s、头图低密度粒子   |
| feedback  | 按钮斜线 + 220ms 信号条、产品卡扫描 + ±6° 透视 + 480ms 高光、条码扫描、状态点 2.2s 脉冲、Hero 鼠标聚光                                                     | 同首页                                             | 链接、图片、上下篇 200–240ms |
| narrative | 揭示 40px + blur 2px / 900ms、标题 clip-path 揭示、章节 4px 强调线展开、等高线 800ms 绘制、射线 700ms 展开、统计数字 700ms 增长                            | 头图线稿绘制 + 内容揭示 + 章节线                   | 进入揭示、侧栏条码扫描       |
| signature | 页面加载揭示（品牌字标 + 进度线，约 1.2s）+ 首屏档案扫描 1200ms，`sessionStorage` 记录                                                                     | 不重复                                             | 不新增                       |

新增机制：

- `LoadingVeil.astro`：`load` 后 420ms 收起，最长 2.2s 强制隐藏；reduced-motion 直接移除。
- `ParticleField.astro` + `site.ts`：2D Canvas 粒子与连线，支持鼠标排斥、DPR ≤ 2、离屏暂停、reduced-motion 静态帧。
- 视频背景：`bannerConfig.video`、`homeConfig.sections[].video`、`PageHeroMedia.video`，为空时回退图片；视频使用 `autoplay muted loop playsinline` 与 poster。
- 镜头运动：Hero 背景做 20s Ken Burns（scale 1.02→1.14 + 平移），`.home-section` / `.page-hero` 进入视口后背景做 26s 持续 Ken Burns，内容层反向视差；滚动时再叠加 ±60px 垂直视差。
- 流动光斑：每个首页区块与功能页头图叠加一层 22s 缓慢漂移的 `screen` 混合光斑（`.home-section__sheen` / `.page-hero__sheen`），用现有强调色与天空色，营造「光在画面里流动」的视频感。
- 粒子回响：`ParticleEcho` 使用覆盖视口的固定画布，把文字或图片采样成粒子并偏置在右上方，与左下大标题形成对角呼应；粒子可在全屏游荡，鼠标移动形成涡旋与平流，松手后由低刚度弹簧归位；默认搅动 40、回弹 10、35200 粒子。粒子 alpha 按边缘距离与角度/位置噪声计算，中心清晰、边缘渐隐且不规则。
- 分块聚光：`.section-spotlight` 在首页每个区块与功能页头图上跟随鼠标，移动端与 reduced-motion 隐藏。
- 返回顶部：圆形 HUD，点击后环形进度 900ms 填充、扫描线上升，并用 easeInOutCubic 自定义滚动。
- 装饰细节：工程网格、左侧刻度轨、图片框叠层画框、产品卡高光、页脚描边字呼吸、滚动提示光点循环；全站文字不使用阴影。

配置开关：`motionConfig.decor`（含 `particles`）、`ambient`、`feedback`、`narrative`、`signature` 均可独立启停；`motionConfig.enabled: false` 一键回到静态。

环境预算说明：

- 同一页面只保留一个环境运动系统：首页是 Hero HUD 环组 + Ken Burns + 粒子，功能页是头图轨道与轨迹，文章页是主唱片。
- 首页各区块的半调呼吸、等高线漂移、射线旋转只在进入视口时启动，离开即停止。
- 主题切换 HUD、返回顶部发射、加载揭示属于用户触发或一次性的转场/工具反馈，不计入页面标志预算。
- `html[data-page-hidden]` 会把所有动画暂停；标签页重新可见时继续。
- Slogan 光标 `caret-breathe` 1.8s 只在逐字显示时出现，归入叙事/反馈，不计入环境预算。

### 减少动态

- `html[data-motion="off"]` 将所有时长设为 0；
- `@media (prefers-reduced-motion: reduce)` 关闭揭示、所有 ambient、产品扫描、斜切滑入、粒子、Ken Burns、加载遮罩和平滑滚动；
- 章节强调线在 reduce 下直接显示为完整长度；
- Banner 脚本检测到 reduce 时直接显示全文，不逐字；
- 视频背景在 reduce 下暂停并移除自动播放；
- 返回顶部和主题切换在 reduce 下直接完成。

### 返回顶部

`ScrollTop.astro` 包含轨道环和发射尾迹；悬停时轨道环做 160ms 的 1.06 倍放大并出现向上尾迹，点击时放大轨道环并让尾迹向上延伸，同时平滑回到顶部。点击序列属于一次性工具反馈，不作为页面 ambient。

### 静态装饰与文章页

- `SpaceLines` 在首页区块保持静态；功能页头图传入 `ambient`，虚线弧 20s 慢转、光点 20s 漂浮；
- `TrajectoryLines` 在功能页传入 `flow`，虚线 24s 缓慢流动、节点 5s 呼吸；文章页继续使用 `quiet`，完全静态；
- 文章页的 `SpaceLines` / `TrajectoryLines` 使用 `quiet`，主 `RecordPattern` 允许 20s 极慢旋转，副唱片保持静止；
- 文章页的上一篇/下一篇标签只在 hover / focus 时做 160ms、2px 位移；
- 文章页只挂载 0.05 透明度的全幅半调与 16 个粒子的头图氛围，不挂载等高线、射线，也不恢复轨迹流动，保持长文阅读优先；
- 该取舍参考已同步到本项目的 `hypergryph-editorial` skill：每页一个环境系统，反馈 120–240ms，标志级只出现一次。

### 斜切、条形码与点阵

参考 <https://rahoo.online/> 的图形母题库，但不复制其素材；所有纹理由 CSS/SVG 在本地程序化生成：

- 产品卡图片右下角斜切三角 + 斜线纹理，悬停时 200ms 滑入；
- `image-frame` 右下角使用同一组斜切纹理；
- 页面 / 文章 hero 细线框右上角短斜线带；
- 首页区块标题右侧低透明度斜线刻度带；
- Hero 虚线环内侧增加 60 格刻度环，进入环境层后 40s 反向慢转；
- 按钮悬停时 200ms 斜线扫过，并有一条 220ms 强调色信号条从左展开；
- `Barcode.astro` 根据真实 section / product / article id 生成确定性条形码，出现在 Hero、页头、区块标题、产品卡、文章侧栏和页脚；进入视口或悬停时有一条 200–360ms 的扫描线；
- `home-section__matrix` 与 `page-content__matrix` 提供低透明度点阵场，移动端隐藏；
- 新增 `HalftoneField.astro`：半调点阵，用于首页简介区块与功能页头图，`mask-image` 向外淡出；
- 新增 `ContourField.astro`：程序化等高线 SVG，用于首页历史区块、关于页头图与 404；进入视口时 800ms 线稿绘制，透明度 0.16；
- 新增 `RayField.astro`：低透明度射线场，用于首页联系区块与联系页头图；进入视口时 900ms 圆形展开。

所有纹理使用 `currentColor` / 现有强调色和低透明度，不新增发光、渐变球或假技术文字。

### 图形母题分组

新增图元不各自成为独立母题，而是归入现有三组，避免素材拼盘：

- 场/密度：点阵 + 半调，负责背景扫描感；
- 径向/轨道：同心圆 / 刻度 + 射线，负责焦点与信号；
- 框架/数据：条码、斜线、刻度轨 + 等高线，负责归档与地形。

首页区块各挂一个图元：简介 → 半调；历史 → 等高线；新闻 → 条码；联系 → 射线；产品 → 斜切。关闭 `motionConfig.decor` 对应字段即可移除。

### 轨迹线

`TrajectoryLines.astro` 使用三条虚线 SVG 轨迹（两条弧线 + 一条竖向轨迹）作为页面内容/文章正文背后的静态装饰；`SpaceLines.astro` 在首页区块、功能页头图、文章头图和 404 上提供竖向/横向细线、准星、虚线轨道环和静态光点。

### 滚动吸附

- `html[data-snap="on"]` 来自 `BaseLayout` 的 `snap` prop；
- 首页 `index.astro` 传 `snap`；
- `motionConfig.scrollSnap.enabled` 为 false 时完全不输出；
- 移动端默认关闭，避免困住用户；
- 区块内容高于一屏时自然撑开。

## 可改进方向

1. 监听系统主题变化（当前只在首次加载读取 system）。
2. 支持三段式切换（system / light / dark）。
3. 用 View Transitions 做主题切换的圆形扩散。
4. 给每个区块配置独立的主题上下文 / 强调色。
5. 提炼 motion token 为可配置的预设（安静 / 标准 / 活跃）。
6. 增加 `prefers-contrast` 与高对比模式。

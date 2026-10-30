# 首页滚动模块

## 功能

首页在 Banner 之后按配置顺序渲染若干整幅图区块。默认：

1. `intro`：简介与数字；
2. `history`：年份时间线；
3. `news`：最近消息；
4. `contact`：联系方式；
5. `products`：产品预览（默认关闭）。

每个区块都有：

- 整幅背景大图 + 深色 / 亮色遮罩；
- 大号描边序号、眉标、标题、引导文案；
- 可选「查看全部」链接；
- 揭示动画；
- 极细的航天风线条（`SpaceLines`）：竖线、横线、准星、静态虚线轨道环和静态光点，只做装饰；
- 区块标题右侧的低透明度斜线刻度带，以及基于区段 id 生成的条形码；
- 区块左下角的低透明度点阵场，移动端隐藏；
- 标题下刻度线随首次滚动揭示做一次 560ms 展开；
- 在桌面端参与强吸附（`mandatory` + `scroll-snap-stop: always`）。

## 配置入口

`src/config.ts` 的 `homeConfig.sections`：

```ts
{
  type: "intro",                  // intro | history | news | contact | products
  id: "intro",                    // 锚点
  enabled: true,
  index: "01",
  eyebrow: "// STUDIO",
  title: "在空气里，造一间工作室",
  lead: "…",
  image: "/images/backgrounds/intro-ocean.webp",
  imageAlt: "俯瞰夏日海面与白色浪花",
  imagePosition: "center 52%",
  overlay: "dark",                // dark | light | none
  fullHeight: true,               // false 时内容高度自适应
}
```

区块顺序就是数组顺序；删除或 `enabled: false` 即隐藏。Banner 的滚动目标是第一个启用区块，见 `Banner.astro` 的 `scrollTarget`。

## 实现

### SectionShell

`src/components/layout/SectionShell.astro` 统一渲染：

```text
<section class="home-section snap-section on-media">
  <Image class="home-section__bg" loading="lazy" />
  <div class="home-section__overlay home-section__overlay--dark" />
  <div class="home-section__grain" />
  <div class="container home-section__inner"><slot /></div>
</section>
```

- `image` 为空时不渲染图片和遮罩，使用纸色背景。
- `overlay: dark` 加 `.on-media`，把所有 `--ink / --line / --accent` 切成白色 / 浅色语义；
- `overlay: light` 加 `.on-light`，强制使用浅色底图上的深色文字（即使站点是深色主题）；
- `fullHeight` 对应 `home-section--auto`。

相关样式：`src/styles/home.css` 的 `.home-section`、`.home-section__overlay--*`、`.home-section__inner`。

### 各区块

| 组件     | 文件                                  | 数据                     | 说明                                                       |
| -------- | ------------------------------------- | ------------------------ | ---------------------------------------------------------- |
| Intro    | `features/home/IntroSection.astro`    | `homeConfig.intro`       | 两栏：段落 / 签名 + 统计数字列表                           |
| History  | `features/home/HistorySection.astro`  | `homeConfig.history`     | 细线时间线；悬停左侧强调线 + 行位移                        |
| News     | `features/home/NewsSection.astro`     | `getSortedNews()`        | 取 `newsConfig.homePreviewCount`；新闻页关闭时行渲染为 div |
| Contact  | `features/home/ContactSection.astro`  | `contactConfig.channels` | 大邮箱链接 + 渠道细线行；联系页关闭时主按钮落到 mailto     |
| Products | `features/home/ProductsSection.astro` | `productsConfig.items`   | 取 `homePreviewCount`；产品页关闭时卡片不链接              |

`HomeSections.astro` 用 `type -> component` 映射渲染，见 `src/components/features/home/HomeSections.astro`。

新闻模块使用纵向 `record-list`：日期、分类、标题与摘要保持在同一行；每个区块都有独立的鼠标聚光层（`.section-spotlight`）。

### 条件链接

- 新闻区块「全部消息」只在 `page.news.enabled` 时出现；
- 历史区块「工作室自述」只在 `page.about.enabled` 时出现；
- 联系区块主按钮：联系页启用时去 `/contact/`，否则使用第一个邮件渠道的 `mailto:`；
- 产品区块「全部产品」与卡片链接只在产品页启用时出现；
- 所有站内链接通过 `withBase()` 补部署子路径。

### 滚动吸附与揭示

- `html[data-snap="on"]` 设置 `scroll-snap-type`，默认 `mandatory`；
- Banner 与每个区块有 `.snap-section` → `scroll-snap-align: start`、`scroll-snap-stop: always`；
- 页脚使用 `scroll-snap-align: end`，作为最后一个可达吸附点；
- 1023px 以下默认关闭（`motionConfig.scrollSnap.mobile: false`）；
- 吸附模式下会压缩区块内边距与历史行距；若仍有区块高于视口，`site.ts` 自动退化为 `proximity`；
- 揭示由 `src/scripts/site.ts:140` 的 IntersectionObserver 添加 `.is-visible`；
- `data-reveal` 元素只在进入视口时显示，`rootMargin` 为 `0 0 -2% 0`，避免底部按钮永远不出现。

### 遮罩与可读性

- 深色遮罩使用两层渐变：左侧更暗（文字侧），底部更暗（页脚过渡）。
- 亮色遮罩是可选模式，使用两层浅色渐变；当前首页默认全部使用深色遮罩，统一白色文字。
- 深色遮罩在明亮模式下通过 `--image-scrim-opacity: .84` 变浅，黑暗模式保持 1；文字会增加轻微阴影。
- `SectionShell` 内叠加 `SpaceLines`：两条竖线、一条横线、两个十字准星、静态虚线轨道环和静态光点，整体透明度约 0.16；首页区块不再循环动画。
- `.section-head__id::after` 在标题索引右侧提供一条低透明度斜线刻度带，620px 以下隐藏。
- `.home-section__matrix` 在左下角提供 11px 点阵场；只在桌面显示；半调区块用它替代点阵，避免同质叠加。
- 每个区块可挂载一个装饰图元：简介 → `HalftoneField` 半调；历史 → `ContourField` 等高线；联系 → `RayField` 射线；新闻与产品使用条码 / 斜切。映射来自 `homeConfig.sections[].decor`，缺省时按区块类型自动匹配，见 `src/components/layout/SectionShell.astro`。
- 等高线在进入视口时做一次 800ms 线稿绘制；射线做一次 700ms 圆形展开且不旋转；半调在进入视口时做 10s 呼吸，离开即停。三者都由 `motionConfig` 的 `decor` / `ambient` / `narrative` 开关控制。
- 每个区块可再叠加一层辅助图元与工程网格：简介为半调 + 等高线，历史为等高线 + 半调，新闻为半调 + 射线，联系为射线 + 半调，产品为射线 + 半调。
- 区块顶部有一条 4px 强调色章节线，进入视口时 900ms 从左展开；reduced-motion 下直接完整显示。
- 背景图进入视口时从 1.055 归位到 1（1200ms），滚动时按区块位置做 ±60px 垂直视差，由 `site.ts` 的 `--section-shift` 驱动。
- 简介区块额外挂载 28 个 Canvas 粒子，鼠标靠近时被排斥；离开视口与标签页隐藏时暂停。
- 区块标题使用 `SectionHeading`，右侧有一个 `Barcode`（seed 为 eyebrow + index），900px 以下隐藏。
- 图片 `object-position` 由配置控制，换图时可调整焦点。
- 纹理颗粒为 CSS data URI，不产生额外请求。

## 可改进方向

1. 为每个区块增加视差（`background-attachment: fixed` 的替代方案），但要注意移动端性能。
2. 支持每个区块的图片 `srcset` 和手机裁切。
3. 把无图时的纸色兜底做成可配置的颜色 / 渐变。
4. 增加 `hideOnMobile` 或移动端单独排序。
5. 新闻区块增加分类筛选或分页。
6. 联系区块可以加一个轻量表单（需要第三方服务或服务端）。

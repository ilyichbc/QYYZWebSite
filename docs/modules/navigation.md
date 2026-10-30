# 导航与页脚

## 功能

- 固定顶部导航：字标、主导航、状态、明暗切换、移动端菜单按钮。
- 在大图上：透明背景、白色文字；越过头图后：深色实心栏。
- 主导航由页面开关自动生成，关闭的页面不会出现。
- 移动端全屏菜单：使用 Banner 底图 + 深色遮罩，包含导航、地点、状态和 RSS。
- 页脚：深色背景 + 极淡底图 + 大号描边字标，包含站点栏目、订阅、社交与版权。

## 配置入口

`src/config.ts`：

- `siteConfig.page`：标签、拉丁名、href、顺序、启用、是否在导航中；
- `siteConfig.navbar`：状态文字、主题切换、额外导航项；
- `siteConfig.footer`：声明、栏目、社交、版权、ICP、返回顶部；
- `bannerConfig.background`：移动端菜单背景图。

## 实现

### 导航生成

`src/utils/pages.ts`：

- `getEnabledPages()`：过滤 `enabled`，按 `navOrder` 排序；
- `getNavPages()`：再过滤 `inNav`；
- `getNavItems()`：页面项 + `navbar.extraItems`，并调用 `withBase()`；
- `filterNavItems()`：页脚等链接的同一套过滤，并补 base path；
- `isActivePath()`：当前路径判断，首页只匹配 `/`，其余按前缀匹配。

`Navbar.astro` 渲染桌面导航和移动端菜单，当前项加 `aria-current="page"`。

### 大图上的导航

`BaseLayout` 通过 `transparentHeader` 控制：

- 首页：`transparentHeader={bannerConfig.enabled}`；
- 功能页 / 文章 / 404：不再传 `transparentHeader`，初始即为玻璃态；
- `Navbar` 输出 `data-over-hero="true"` 与 `data-site-header`；仅首页在滚出 Banner 后切换。

`src/scripts/site.ts:199`：

```ts
const hero = document.querySelector("[data-hero]");
const solid = hero ? hero.getBoundingClientRect().bottom <= headerHeight : window.scrollY > 24;
header.classList.toggle("is-solid", solid);
```

- 首页大图 / 大标题区域：完全透明背景，白色文字使用轻微文字阴影保证可读；
- 其他时候：明亮模式 `rgba(0,0,0,.45)`、黑暗模式 `rgba(0,0,0,.62)` 的半透明黑色玻璃，`backdrop-filter: blur(24px) saturate(155%)`，白色文字、1px 细线、顶部高光与左侧强调线段；
- 品牌的中文 / 拉丁字与每个导航项的中文 / 拉丁字均居中对齐。
- 首页只有在离开 Banner 之后才切换为玻璃态；其他功能页/文章/404 初始即为玻璃态。
- 没有 hero 的页面保持玻璃态；404 也初始为玻璃态。

### 移动端菜单

- 全屏 fixed，背景为 `bannerConfig.background` + 深色遮罩；
- 初始 `inert` / `aria-hidden="true"`；
- `site.ts` 的 `setMenuOpen()` 切换 class、`inert`、`aria-expanded`、body 锁滚动；
- 打开后焦点移到第一个可聚焦元素，关闭后回到触发按钮；
- Tab 焦点陷阱限制在菜单内；
- Escape 关闭，点击链接关闭，窗口宽度 > 900px 自动关闭。

### 明暗切换与返回顶部

- `[data-theme-toggle]` 由 `site.ts` 绑定，写入 `<html data-theme>` 与 `localStorage`；
- 主题切换时从按钮位置播放圆形揭示 + 轨道环 / 扫描线 HUD；
- 返回顶部按钮带轨道环和向上发射尾迹。
- `ScrollTop.astro` 使用 `[data-scroll-top]`，滚动超过 640px 显示，点击平滑回顶（遵循 reduced motion）。

### 页脚

- `Footer.astro` 读取 `siteConfig.footer`，链接经过 `filterNavItems()`；
- 底图使用 `bannerConfig.background`，通过 CSS 变量 `--footer-image` 注入；
- 页脚常驻深色；大号字标在底部，使用描边而非填充；
- `backToTop` 为 `#top` 锚点，`BaseLayout` 在 body 顶部放了 `<span id="top">`。

## 可改进方向

1. 增加滚动监听，高亮当前首页区块（scroll spy）。
2. 导航支持二级菜单 / 外部链接分组。
3. 移动端菜单可加入语言切换。
4. 页脚社交图标化（当前是文字标签，保持克制）。
5. 为导航加 skip link 之外的地标标签与更完整的键盘测试。

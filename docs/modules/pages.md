# 功能页

## 功能

功能页包括关于、联系、产品、新闻。它们都由配置开关控制，关闭后不生成路由，也不出现在导航 / 页脚 / Banner 按钮中。

所有功能页共用：

- `PageLayout`：`BaseLayout` + `PageHero`；
- 整幅头图 + 深色遮罩 + 白色标题；
- 内容区由 `PageLayout` 包裹 `TrajectoryLines` 轨迹装饰、右上角点阵场与左侧刻度轨（1200px 以下隐藏）；
- 文章页使用静态 `RecordPattern`（Voyager 金色唱片式同心纹路）、`quiet` 轨迹和更安静的编辑式细节；
- 头图下方的浅色纸面内容区；
- 细线、方形标签、描边编号、无大圆角。

## 路由生成

`src/pages/[page].astro`：

```ts
export function getStaticPaths() {
  return getGeneratableFeaturePages().map(({ key }) => ({
    params: { page: key },
    props: { key },
  }));
}
```

- `getGeneratableFeaturePages()` 过滤 `enabled` 且排除 `home`；
- 页面参数只有 `about / contact / products / news`；
- 关闭页面 = 不生成静态 HTML，天然没有死链；
- 页面组件在 `components/features/pages/` 中按 key 映射。

## 页面头图

`PageLayout` 把 `hero: PageHeroMedia` 传给 `PageHero`：

```ts
hero: {
  image: "/images/backgrounds/glass-corridor.webp",
  imageAlt: "有整面玻璃幕墙的工作室走廊",
  imagePosition: "center 55%",
  overlay: "dark",
}
```

- `PageHero` 渲染整幅图、遮罩、细边框、眉标、标题、引导文案、底部 meta；
- `overlay: dark` 加 `.on-media`（白字）；`light` 加 `.on-light`（深字）；
- `data-hero` 让导航栏在头图范围内保持透明；
- 头图底图使用 `priority`（LCP 例外），其余图片 lazy；
- 头图可挂载装饰图元：关于页 → 等高线；联系页 → 射线；产品 / 新闻 → 半调（`decor` prop，见 `PageHero.astro`）；所有头图再叠加一层 0.14 半调与工程网格；
- 头图 `SpaceLines` 传入 `ambient`，虚线弧 20s 慢转、光点 20s 漂浮；内容区 `TrajectoryLines` 传入 `flow`，虚线 24s 缓慢流动。

## 关于页

- 头图与配图由 `aboutConfig.hero` / `aboutConfig.image` 控制；
- 正文来自 `src/content/pages/about.md`，用 `getEntry()` + `render()`；
- 事实卡使用 1px 网格线，不引用卡片阴影；
- 底部 CTA：联系页启用时去联系页，否则使用邮件；产品页启用时显示「查看产品」。

## 联系页

- 头图：`contactConfig.hero`；
- 左侧：大标题、邮箱、说明、地点 / 年份；
- 右侧：渠道细线行（图标、标签、值、备注、箭头）；
- 渠道来自 `contactConfig.channels`，`enabled` 可单独关闭；
- 邮件使用 `mailto:`，站外链接自动 `target="_blank" rel="noopener noreferrer"`。

## 产品页

- 头图：`productsConfig.hero`（当前为黄昏电线与房屋，用于产品列表与详情页）；页头底部有索引条形码；
- 产品来自 `productsConfig.items`，`enabled` 过滤；
- 卡片字段全部在配置里：`id / slug / index / title / latin / description / status / year / image / imageAlt / heroImage / tags / href / enabled / detail`；
- `status / year / tags / href / slug` 可留空，卡片会自动隐藏空字段；
- `getProductHref()` 决定链接：完整外链优先；否则有 `slug` 时指向本地 `/products/<slug>/`；
- 商品列表保留 3 / 2 / 1 列；只有一个产品时使用 `product-grid--single` 的横向大卡片；
- 首页产品预览也使用同一个 `getProductHref()`，不再跳到页内锚点；
- 产品卡图片右下角有静态斜切三角 + 斜线纹理，悬停时 200ms 滑入；图片缩放 220ms；
- 产品卡正文有一条基于 `slug` / `id` 生成的条形码，悬停时透明度 200ms 提高并扫描一次；
- 产品卡媒体悬停时有一条 220ms 的扫描线；
- 产品卡在精细指针设备上跟随鼠标做 ±6° 透视倾斜（350ms 复位），触屏与减少动态时保持静态；
- 产品卡悬停时有一条 480ms 的斜向高光扫过；图片框额外叠加一层 accent 描边画框与斜切角标。

### 产品详情页

`src/pages/products/[slug].astro` 根据 `slug` 生成静态页面，内容全部来自 `productsConfig.items[].detail`：

- `description`：游戏描述段落；
- `characters`：角色名 / 标签 / 描述；
- `downloadNote` + `downloads`：平台下载说明与链接；
- `creditsNote` + `sourceHref / sourceLabel`：制作人员说明与源站链接；
- 详情页侧栏有基于产品 slug 的条形码；
- 没有真实数据时不补写，直接留空或链接到源站。

当前示例为星籁浮屿的「霜星挽歌」：名称、拉丁名、角色名、下载平台与占位描述均取自
<https://luminoa.ilyich.top/product/sxwg>，没有虚构产品功能或人员名单。

## 新闻页

- 头图：`newsConfig.hero`；
- 列表：`getSortedNews()`，置顶优先，再按日期倒序；
- 分类筛选：`data-news-filter` + `data-news-item`，客户端脚本切换 `hidden`；
- 行结构：日期 / 分类 / 标题 + 描述 / 箭头；
- 头条带「置顶」标签；
- 无文章时显示 `newsConfig.emptyText`；
- 文章详情在 `pages/news/[...slug].astro`：
  - `SpaceLines` / `TrajectoryLines` 默认静态；文章页继续传 `quiet`，额外隐藏轨道环与节点；
  - 文章头图叠加 16 个低密度 Canvas 粒子；正文区叠加 0.05 透明度的全幅半调；
  - 正文右侧页边放置 `RecordPattern`，主唱片 20s 极慢旋转、副唱片静态，1000px 以下隐藏；
  - 侧栏有基于文章 slug 的条形码；
  - hero 元信息使用真实的 `PUBLISHED / UPDATED / AUTHOR` 字段条；hero 边框四角增加静态刻度角标，右上角有短斜线带；
  - 正文左侧页边增加静态刻度尺（1000px 以下隐藏）；
  - h2 使用文章内 CSS 计数器生成章节号；正文末尾有细线终止标记；
  - 上一篇 / 下一篇标签悬停或聚焦时 160ms、2px 位移，减少动效时关闭。

## 404

- 整幅天空图 + 深色遮罩；
- 描边 404、标题、说明、返回首页 / 新闻按钮；
- 右上角挂载 `ContourField` 等高线，进入时 800ms 线稿绘制；
- `noindex`，不显示页脚。

## 可改进方向

1. 多产品排序 / 分组，以及产品图集。
2. 联系表单（需要第三方或服务端）。
3. 关于页的团队 / 客户 logo 墙。
4. 新闻页分页与年份归档。
5. 页面级过渡动画（View Transitions）。

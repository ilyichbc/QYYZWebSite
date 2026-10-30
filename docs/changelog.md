# 更新日志

## 2026-10-28 · 静态图的镜头运动模拟

- 无视频素材下，用三层叠加模拟 endfield/ak 官网的「画面在动」：
  - Hero 背景 20s Ken Burns（scale 1.02→1.14 + 平移），内容层反向视差；
  - 首页区块与功能页头图进入视口后背景 26s 持续 Ken Burns，内容层反向视差；
  - 每个大图区块叠加 22s 缓慢漂移的 `screen` 混合光斑（`home-section__sheen` / `page-hero__sheen`）。
- 滚动时叠加 ±60px 垂直视差，滚动即产生镜头位移。
- 所有新动画只改 `transform`，尊重 `prefers-reduced-motion` 与 `data-page-hidden` 暂停。

## 2026-10-26 · 粒子边缘渐隐与不规则化

- 每个粒子增加独立 `alpha`：按到采样包围盒边缘的 Chebyshev 距离计算，并叠加角度噪声与位置噪声，中心约 0.75–1、边缘约 0.2，形成不规则渐隐轮廓。
- 粒子目标位置增加 ±1px 抖动，边缘不再整齐。
- 当前配置改为 `mode: "image"`、`image: "/images/brand/logo.png"`、`count: 35200`；实测仍保持约 61fps。

## 2026-10-26 · 粒子图形放大与对角构图

- 粒子回响采样区域放大到 `52vw × 38vh`，中心移到约 `(69vw, 29vh)`，偏右上，与左下大标题形成对角呼应。
- 粒子数量从 3600 提高到 5200，粒径从 1–2.4px 提高到 1.4–3.2px，密度与体量更明显。
- 文本模式只设置一次 `fillStyle`，5200 粒子下仍保持约 60fps。
- 透明度提高到 0.72，仍保持无 `mask-image` 虚化。

## 2026-10-26 · 粒子回响全屏化与标题修正

- 首页大标题改回文字（`bannerConfig.logoMode: "text"`），导航栏继续按 `identity.logo` 显示图片 logo。
- `ParticleEcho` 画布改为覆盖整个视口的 `position: fixed`，粒子可在全屏游荡，不再局限于右侧小画布。
- 文字/图片采样区域中心调整到约 `(51vw, 42.5vh)`：相对原位置向左 1/4、向下 1/8。
- 移除 `mask-image` 虚化，粒子完整显示；透明度调整为 0.62。
- 鼠标搅动与点击冲量改为监听整个窗口，粒子在任意位置都能被扰动。
- 加载界面改用 `identity.logo` 图片（无图片时回退文字「星」）。
- 用户提供的 logo 下载到 `public/images/brand/logo.png`，避免 CDN 在当前网络下 SSL 失败。

## 2026-10-26 · 粒子回响与细节修正

- 新增首页右侧「粒子回响」：`bannerConfig.particleEcho` 支持 `text` / `image` 两种采样，默认文字「星迹线」、3600 粒子、搅动强度 40、回弹强度 10；鼠标移动形成涡旋与平流，松手后低刚度弹簧缓慢归位，点击可施加一次涡旋冲量。
- 首页新闻恢复纵向 `record-list`，移除横向索引轨。
- 取消射线场的旋转动画，保留一次性圆形展开；降低射线透明度。
- 页脚移除等高线与射线装饰，解决与 `ASTROBIT` 描边字打架的问题。
- 等高线默认透明度从 0.26 降到 0.16；等高线漂移 16s、绘制 800ms，半调呼吸 10s，章节线 700ms，背景镜头 900ms，整体加速。
- 鼠标聚光扩展到每个首页区块与功能页头图（`.section-spotlight`）。
- 返回顶部改为圆形 HUD：点击后环形进度 900ms 填充、扫描线上升、自定义 easeInOutCubic 滚动；reduced-motion 直接跳转。
- 全站取消文字阴影（`text-shadow: none !important`），包括标题重影与导航可读性阴影。

## 2026-10-26 · 饱和式动效增强（3 轮）

参考 endfield.hypergryph.com 与 ak.hypergryph.com 的镜头式动态，连续三轮提高装饰密度与动效强度：

- 第 1 轮：半调 / 等高线 / 射线透明度与尺寸接近翻倍；每个首页区块叠加两层图元与工程网格；点阵场扩大；揭示位移 40px / 900ms。
- 第 2 轮：新增页面加载揭示（品牌字标 + 进度线）；区块顶部 4px 强调色章节线随进入视口展开；首页新闻改为横向滚动索引轨（`scroll-snap`）；标题增加强调色错位重影；页脚描边字标 8s 呼吸；状态点 2.2s 脉冲；滚动提示光点循环；Hero 增加鼠标聚光。
- 第 3 轮：新增 Canvas 粒子层（Hero 44 个、简介区块 28 个、文章头图 16 个，支持鼠标排斥与离屏暂停）；Banner / 首页区块 / 功能页头图支持可选视频背景；图片框增加叠层画框；产品卡增加 480ms 高光扫过；文章页增加低透明度半调与粒子氛围；全站增加左侧刻度轨；区块背景增加 1200ms 镜头归位与 60px 滚动视差；Ken Burns 幅度提升到 1.12。
- 配置：`motionConfig.decor.particles`、`bannerConfig.video`、`homeConfig.sections[].video`、`PageHeroMedia.video`；`motionConfig.narrative.revealDistance` 默认 40。
- 降级：移动端隐藏半调 / 等高线 / 射线 / 粒子 / 网格，新闻轨改为纵向；`prefers-reduced-motion` 下停止粒子、Ken Burns、章节线与加载遮罩。
- 文档同步：主题动效、Banner、首页区块、功能页、配置、架构、QA、README。

## 2026-10-26 · 四层动效增强与图形母题扩展

- 校验 `.claude/skills/hypergryph-editorial/` 与源目录哈希一致，无需重复同步。
- 按 skill 的四层预算重新审计并增强动效：
  - ambient：Hero 虚线环 20s 正转、刻度环 40s 反转、6 个光点 20s 漂浮；功能页头图光点漂浮、轨迹虚线 24s 流动；首页区块半调 16s 呼吸（进入视口才启动）。
  - feedback：按钮斜线 + 220ms 信号条；产品卡扫描线 + ±6° 透视（仅精细指针）；条码 200–360ms 扫描。
  - narrative：揭示调整为 16px + 640ms；统计数字 900ms 增长；等高线 1100ms 线稿绘制；射线 900ms 圆形展开。
  - signature：首屏档案扫描 900ms，`sessionStorage` 记录，同会话只执行一次。
- 新增程序化装饰图元：`HalftoneField`、`ContourField`、`RayField`，分别承担场/密度、框架/数据、径向/信号三类角色；首页简介、历史、联系区块与功能页头图按配置挂载。
- 新增 `motionConfig.decor / ambient / feedback / narrative / signature` 细粒度开关，全部有默认值、向后兼容；`enabled: false` 可一键回到静态。
- 文章页保持安静：不挂载新图元、不恢复轨迹流动，只保留唱片慢转、进入揭示与链接/图片微反馈。
- 参考 rahoo.online 的纹理叠层语法，但所有纹理仍在本地用 CSS/SVG 程序化生成，不复制素材、不引入位图或新依赖。
- 文档同步：主题与动效、Banner、首页区块、功能页、配置系统、架构、README 与更新日志。

## 2026-10-26 · HyperGryph Editorial 审计与装饰扩展

- 将用户另一项目中的 `hypergryph-editorial` skill 同步到当前项目 `.claude/skills/hypergryph-editorial/`（含 `SKILL.md` 与 `examples/motion-lab.html`）。
- 按 skill 的四层动效预算重新审计：
  - 每页恢复 **1 个 ambient**：首页 Hero 虚线环 20s 慢转；功能页头图单根虚线弧 20s 慢转；文章主 `RecordPattern` 20s 慢转，副唱片与正文轨迹保持静态；
  - feedback 收紧到 120–240ms：按钮斜线 200ms、产品卡角标 200ms、产品图片 220ms、产品扫描线 220ms、条形码透明度 200ms；返回顶部悬停改为 160ms 环放大，不再旋转 360°；
  - narrative 保留页面进入 500ms、滚动揭示 560ms，并让区块标题刻度线在首次揭示时 560ms 展开；新增 `image-frame` 700ms clip-path 揭示、条形码 360ms + stagger 打印、产品卡/新闻行 stagger 揭示；
  - signature 保留主题切换 900ms HUD；
- 新增 `Barcode.astro`：根据真实 section / product / article id 生成确定性条形码，加入 Hero、PageHero、区块标题、产品卡、产品详情、文章侧栏与页脚。
- 新增低透明度点阵场：首页区块左下角与功能页内容右上角；功能页内容左侧增加刻度轨；移动端隐藏。
- Hero 虚线环内侧增加 60 格静态刻度环，与 20s 慢转的虚线环形成仪表感。
- 产品卡增加 220ms 扫描线反馈；斜切纹理和条形码让卡片更像档案物件。
- 产品卡与新闻行加入一次性 stagger 揭示。
- 新增 `html[data-page-hidden]`：标签页不可见时暂停所有动画。
- 重新参考 rahoo.online 的图形母题库，所有条形码、点阵、斜切纹理均由本地 CSS/SVG 程序化生成，不复制外部素材。
- 文档同步：主题与动效、Banner、首页区块、页面、架构、QA、README 与开发规范。

## 2026-10-26

### 动效收束与斜切装饰

- 按 Hypergryph 编辑式 / endfield-ui 的“动效对应操作、无持续装饰动画”原则收束全站环境动效：
  - Hero 背景呼吸、光点漂浮、滚动提示循环、`SpaceLines` 轨道环旋转/移动光点、`TrajectoryLines` 虚线流动与节点呼吸全部停止，保留静态细线；
  - 文章页继续使用 `quiet` 变体隐藏多余轨道环与节点；
  - 主题切换从 1.6s 收短到 900ms，HUD 环 / 扫描 / 标签同步缩短；返回顶部悬停改为单圈 1.2s，点击仍保留 720–760ms 发射；
  - 滚动揭示从 16px / blur 4px 收短为 10px / blur 2px、560ms。
- 参考 <https://rahoo.online/> 的封面图形语言，加入克制的斜切与斜线细节，不复制素材：
  - 产品卡图片右下角斜切三角 + 斜线纹理，悬停 360ms 滑入；
  - `image-frame` 右下角同款斜切纹理；
  - 页面 / 文章 hero 细线框右上角短斜线带；
  - 首页区块标题右侧低透明度斜线刻度带；
  - 按钮悬停斜线扫过（420ms）与箭头位移。
- 所有新增图形只用 `currentColor`、现有强调色和低透明度，不增加发光、渐变球、假技术文字或假数据。
- 当时 `hypergryph-editorial` skill 尚未同步到当前项目；后续已在当天完成同步并按它重新审计。

## 2026-10-25

### 文章页金色唱片与编辑式细节（当前）

- 新增静态 `RecordPattern`：同心圆槽纹、60 根径向刻度、内圈辐条、右上星图扇形和唯一一条 accent 刻度；不写假二进制/坐标，不加滤镜或光影。
- 图案放在文章正文右侧页边，主图案透明度约 0.09、下方小图案约 0.055，向正文方向遮罩淡出；1000px 以下隐藏，打印隐藏。
- 文章页 `SpaceLines` / `TrajectoryLines` 使用 `quiet` 变体，停止持续循环；首页和其他页面保留原动效。
- 文章 hero 元信息改为真实的 PUBLISHED / UPDATED / AUTHOR 字段条；h2 增加真实章节序号；正文末尾增加细线终止标记；上一篇/下一篇增加 hover/focus 小幅位移。
- 文章页继续增加：hero 四角静态角标、正文左侧页边刻度尺、第二处下方唱片纹样；区块标题下增加静态刻度短线。
- 主唱片图案透明度从 0.06 提高到 0.09，遮罩更早进入可见区，解决“看不到环线”的问题。
- `hypergryph-editorial` skill 本地未安装；本次实际参考 endfield-ui 阅读页/动效原则与现有 Hypergryph 编辑式语言。

### 星迹线 Astrorbit 品牌与航天动效

- 项目更名为「星迹线 Astrorbit」：配置、页面标题、页脚、OG、favicon、README 与文档同步更新。
- favicon 改为轨道环 + 星点；品牌字标改为「星」。
- 主题切换加入 View Transitions 圆形揭示 + 轨道环 / 扫描线 / `MODE // LIGHT/DARK` HUD 标签；无 View Transitions 时退回 HUD 环。
- 返回顶部按钮加入轨道环旋转、向上发射尾迹与点击脉冲。
- 新增 `TrajectoryLines`：页面内容与文章正文背后的虚线轨迹；增强 `SpaceLines`，加入旋转虚线轨道环和移动光点。
- 导航栏在首页 Hero 上保持完全透明，离开 Hero 后切换为半透明黑色玻璃；其他页面初始即为玻璃态。
- 新增右侧轨道滚动进度、文章左侧刻度轨道、页面/文章背景虚线轨道与旋转轨道环。
- 深色 / 明亮模式切换、返回顶部与轨迹动画都尊重 `prefers-reduced-motion`。

### 第三轮反馈

- 移除首页最后一屏与页脚之间的空白；页脚 `margin-top` 改为 0。
- 顶部导航的中文 / 拉丁文标签居中对齐。
- 图片遮罩改为主题感知：明亮模式更浅，黑暗模式更实；Navbar 在明亮模式为较浅的黑色蒙版，黑暗模式为更实的黑色蒙版。
- 明亮纸色改为 `#ECEFF1`，黑暗纸色改为 `#0b1924`。
- 增加 `SpaceLines` 极细航天风线条（竖线、横线、准星、圆弧），默认低透明度。
- 背景图恢复为之前的二次元测试素材；OG 图随之重新生成。
- 产品卡片字段可配置，支持 `slug` 生成本地 `src/pages/products/[slug].astro` 详情页。
- 「霜星挽歌」卡片与详情页内容按 <https://luminoa.ilyich.top/product/sxwg> 的真实信息替换，没有虚构产品功能、角色或人员名单。

### 吸附与蒙版修正

- 首页第三块（新闻）的遮罩由 `light` 改为 `dark`，与其它区块统一。
- `scrollSnap` 默认改为 `mandatory` + `scroll-snap-stop: always`，Banner 与页脚也加入吸附点。
- 吸附模式下压缩区块留白；任一区块高于视口时自动退化为 `proximity`。
- 1023px 以下默认关闭吸附，避免窄屏内容无法读完。
- 背景图恢复为之前的二次元测试素材，产品 logo 保留为测试素材。

### 设计方向重做

- 移除浅色渐变、光斑、毛玻璃卡片、胶囊按钮、大圆角和软阴影。
- 改为整幅大图铺底：首页每一屏、功能页头图、文章头图、404 均使用大图。
- 新增深色 / 亮色遮罩、`.on-media` / `.on-light` 文字上下文。
- 首页 Hero 改为天空大图 + 左下大标题 + 右侧档案 + 细线 HUD。
- 新增测试背景素材与版权占位说明。
- 新增首页底图配置：`homeConfig.sections[].image / overlay / imagePosition`。
- 新增功能页头图配置：`aboutConfig.hero`、`contactConfig.hero`、`productsConfig.hero`、`newsConfig.hero`。
- 产品页改为 3 列细线卡片，避免 3 个项目在 2 列网格里留下空灰格。
- 新闻首页模块改用深色遮罩，保持与其它区块一致的白色文字。
- 深色主题下，亮色遮罩区块强制使用深色文字（保留可选的 light 模式）。

### 功能

- Slogan 支持固定 / 随机 / 一言，逐字显示与 reduced motion 回退。
- 增加 GitHub Pages base path 支持：
  - `siteConfig.basePath`；
  - `withBase()`；
  - 导航、页脚、图片、RSS、robots、Markdown 内链同步。
- 导航在 Hero 上透明，越过头图后变为深色实心栏。
- 移动端菜单改为整幅图背景 + 深色遮罩，包含焦点陷阱。
- 新闻分类筛选、明暗切换、返回顶部。
- OG 图改为新视觉并压缩为 JPG。
- 新增图片版权文档。

### 文档

- 新增本目录所有模块文档。
- 新增 README、图片版权、GitHub Actions 工作流。
- 新增 `.gitignore`。

## 2026-10-24

- 初始化 Astro 7 + TypeScript 项目。
- 配置系统、主题注入、页面开关、首页滚动模块。
- 新闻 Content Collections、RSS、Sitemap、robots、404。
- 初版视觉（浅色柔和风），后续已被 10-25 的大图方向替换。

## 已知限制

- 没有自动图片 `srcset`。
- 源站的游戏描述、角色描述与制作人员仍是占位文本，页面如实展示，不补写虚构内容。
- 联系页没有表单。
- 没有自动化视觉回归 / 单元测试。
- 示例内容与统计数字需要替换。

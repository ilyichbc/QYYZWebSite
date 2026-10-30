---
name: hypergryph-editorial
description: 生成“明日方舟 / 终末地 / 鹰角”式工业科幻编辑网页，并设计其动态效果与图形变换。Use when the user asks for Arknights/Endfield/HyperGryph-inspired UI, tactical archive, HUD/blueprint visual language, anime game landing page, operator dossier, generative graphics, gooey/metaball effects, mask reveals, SVG line fields, 3D card transforms, or a vibe-coded frontend with monochrome + cyan/acid-yellow, bilingual microtype, hard-edged frames, and cinematic motion. Inspired by HyperGryph, ignoredone.space and rahoo.online; also use for art direction or critique in this style.
---

# 鹰角式工业编辑部 · HyperGryph Editorial UI

一句话方法：**把网页当成“军事档案 + 时尚杂志 + 游戏 HUD”的三层合成物——用黑白灰建立秩序，用影像制造情绪，用一个信号色控制注意力，用一种可复用的图形变换系统制造“活着的技术界面”。**

静态设计只完成一半。真正让这类页面成立的是：**图形不是贴图，而是可以被读取、拆解、重组的“技术对象”；动效不是装饰，而是让这些对象进入工作状态。**

四个参考坐标：

- **ARK / Endfield**：提供编辑层级、色彩纪律、硬质界面与档案语法。
- **ignoredone.space**：提供“融球 / 螺旋扩散 / 毛玻璃音波 / 双螺旋 / 蒙版洞 / 波浪线场”的动态实验方法。
- **rahoo.online**：提供图形素材库与构图变换语法——同心圆、半调、HUD 线、刻度、条形码、点阵、等高线、射线、环形阵列、透视证件卡与斜切分屏。

> 只迁移设计语法与技术思路，不复制品牌 Logo、角色立绘、原文案或专有素材。

**目录**：`0 适用` · `1 参考坐标` · `2 十二条规则` · `3 模式` · `4 设计令牌` · `5 六遍法` · `6 页面骨架` · `7 组件` · `8 动态与图形变换` · `9 响应式` · `10 文案` · `11 素材` · `12 反模式` · `13 验收` · `14 完成定义` · `15 来源`

---

## 0. 何时启用 / 默认行为

**适用**

- 游戏官网、版本专题、角色档案、世界观/影像资料页
- 工业科幻、战术装备、未来品牌、展览/活动专题
- 需要“高冷、专业、昂贵、带叙事感”的落地页
- 用 AI 快速生成前端，但不想得到 SaaS 模板味 / 紫色渐变味

**不适用**

- 亲和型母婴、餐饮、教育产品
- 需要高密度表单、后台管理表格（可借用 tokens，但不要整套皮肤）
- 用户明确要求圆润、可爱、手作感

**启用后的默认行为**

1. 不要连续追问。最多确认三件事：**页面目标、可用素材、偏 ARK 还是 ENDFIELD**。其余按本 skill 默认值推进。
2. 没有角色/游戏素材时，默认走 **ARK 排版驱动模式**，不要硬凹动漫人物。
3. 每页先定 **一个运动系统 + 两个图形母题**（如“点阵 + 同心圆”，动效为“径向扩散 + 蒙版揭示”），再写代码。不要先堆十个效果。
4. 绝不复制鹰角的 Logo、角色立绘、专有图标或原文案。只迁移设计语言，产出原创页面与素材。
5. 按下方“六遍法”执行。即使要求“一把梭”，也在内部保持六遍，不要把所有效果一次性混在一起。
6. 直接改文件、给可运行页面；不要只输出设计建议。

---

## 1. 参考坐标（只提炼语言）

| | **ARK / 档案信号**（ak.hypergryph.com） | **ENDFIELD / 工业前沿**（endfield.hypergryph.com） | **IGNOREDONE / 动态实验**（ignoredone.space） | **RAHOO / 图形装配**（rahoo.online） |
|---|---|---|---|---|
| 第一印象 | 黑色剧场、军情档案、冷冽广播 | 米白纸面、工业设计年鉴、前线终端 | 白色展厅里的液态机械装置 | 工业制图软件 + 封面拼装台 |
| 画布 | 纯黑全屏舞台，固定视口，章节切换 | 长滚动编辑页，固定左侧工具栏 | 单屏实验场，背景/图形/文字多层叠加 | 工具型白底界面，中央画布 + 右侧参数 |
| 主色 | `#000` / `#FFF` / 青蓝 `#18D1FF` | 纸白 `#F2F2F2` / 石墨 `#191919` / 酸性黄 `#FFFA00` | 白 / 黑 / 黄 `#FFDE00`，大量灰阶点阵 | 白 / 黑 / 青 / 黄 / 少量品红与绿 |
| 辅助色 | 灰阶 `#1D1F20`、`#585858` | 薄荷 `#00FFA2`、品红 `#FF1AAC`，仅作状态/极小面积 | 透明玻璃、暖黄光晕、极淡黑色线场 | 青色用于选中态，黄色用于标题块，红色仅操作按钮 |
| 字体气质 | 窄体、粗重、全大写、机械感 | 几何宽体 + 编辑部无衬线 + 等宽元数据 | 轻字重、大字号、极宽字距、打字机 | 窄体全大写 + 中文黑体 + 数字/条形码 |
| 几何 | 0–2px 直角、细线、切割、蓝图 | 4–6px 小圆角、胶囊按钮、黄色实体块、斜切卡片 | 圆点、螺旋、球体、圆环、液态融合 | 多边形切割、斜切分屏、透视卡、叠层画框、刻度/射线 |
| 影像 | 全屏视频、手稿/蓝图、角色剪影、强对比 | 大尺寸角色插画、场景渲染、留白式排版 | 固定背景图 + 白色蒙版 + 洞口透出 | 插画裁切、斜向拼贴、强对比色块 |
| 标志性运动 | 缓慢、压迫、镜头式 | 轻快、精准、带机械滑动感 | 融球扩散、蒙版洞、毛玻璃音波、线场呼吸、打字机 | 素材参数变化、透视旋转、封面层展开/收拢 |
| 可迁移的核心 | 编辑层级 + 硬质边框 + 单信号色 | 档案式长页 + 黄色转场 + 越界大图 | **图形变换即叙事：图形是对象，动效是它的工作状态** | **图形母题库 + 变换算子：一切画面由可复用 primitives 组装** |

**共同 DNA（真正要迁移的部分）**

- **双语层级**：英文全大写小标签 + 中文大标题；英文负责“系统感”，中文负责“叙事”。
- **技术编辑符号**：`[ REC ]`、`//`、`01 / 06`、`SI // 01`、日期、坐标、细横线。符号必须承担信息，不能只是装饰。
- **非对称构图**：大图越界、窄栏压边、标题裁切，永远有一个“重心偏离中心”的元素。
- **低饱和 + 高对比**：画面颜色主要来自影像；界面本身近乎无彩色。
- **硬质界面**：细线框、小圆角或直角、没有柔软投影；层级靠留白、明度、字号，而不是卡片阴影。
- **一个视觉中心**：每个视口只有一个主角（巨字 / 角色 / 场景 / 数据），其余全部退后。
- **图形母题复用**：一个页面只建立 2–3 个基本图元（圆点、圆环、线场、点阵、条形码），它们在不同区块以不同尺度、密度、裁切方式重复；不要每个 section 发明一套新图形。
- **运动是对象的状态**：圆点被鼠标排斥、线场缓慢呼吸、蒙版洞随质心游走、刻度圆随数据展开。动画必须解释“这个对象正在做什么”，而不是单纯“动起来”。
- **多层合成而非单一背景**：底层影像 → 白色遮罩/暗色遮罩 → 氛围光 → 线场/点阵 → 内容 → 玻璃栏/HUD。每层都可单独关闭，且关掉后内容仍成立。

---

## 2. 十二条硬规则

1. **80 / 15 / 5**：80% 中性色（黑白灰/纸白），15% 影像，5% 信号色。信号色只给动作、状态、关键数字。
2. **只选一个信号色**：ARK 用青蓝，ENDFIELD 用酸性黄。不要青蓝 + 黄 + 紫同时上场。薄荷/品红只作状态点，面积小于一张邮票。
3. **两种字体声音 + 一种机器声音**：展示字、正文字、等宽元数据。不要三种展示字体。
4. **先构图，再装饰**：先有明确的主次与阅读路径，才允许加 HUD、线框、编号。
5. **每个符号都有工作**：编号用于排序，斜线用于分隔，括号用于标记状态。解释不了用途的装饰，删掉。
6. **留白是材料**：一个视口最多一个主角。留白不够时，减内容，不要缩小字号。
7. **影像必须被导演**：裁切、去饱和、压暗、叠色、遮罩，四选一；不要原图直出。
8. **正文永远优先于气氛**：信号色不做正文；复杂影像上必须加渐变遮罩；正文对比度至少 4.5:1。
9. **运动是镜头，不是烟花**：一个入场、一个滚动揭示、一个环境循环，到此为止。
10. **原创资产**：不抄 Logo、角色、图标、文案。参考的是语法，不是皮肤。
11. **动效分四层，每层只做一个机制**：环境（持续）、反馈（交互）、叙事（滚动/转场）、标志（全页只出现一次）。标志级效果不得重复。
12. **图形变换必须可解释**：每次切片、透视、融球、蒙版开洞，都要回答“它模拟的是扫描、归档、信号、部署还是解析”。不能回答，就不要动。

---

## 3. 选模式：ARK / ENDFIELD / HYBRID

| 需求 | 模式 | 选择理由 |
|---|---|---|
| 电影感首屏、单页叙事、活动预告 | **ARK** | 黑场 + 全屏影像 + 巨大裁切字最有压迫感 |
| 长滚动官网、角色/版本档案、内容很多 | **ENDFIELD** | 纸白底 + 信息栏 + 黄色转场更适合承载长内容 |
| 品牌首页 + 深度内容 | **HYBRID** | 首屏用 ARK，内容区切 ENDFIELD；用一条全宽信号色过渡板完成换气 |

**HYBRID 的比例**

- 首屏：ARK 黑场，70% 影像，巨字，固定顶部导航。
- 第二屏起：切纸白，左侧/顶部工具栏，进入 ENDFIELD 的档案节奏。
- 转场：**一块纯信号色横板**，高度 `clamp(96px, 14vw, 220px)`，上压巨大双语章节名与线稿物件；只出现 1–2 次。
- 整页仍然只能有一个信号色。HYBRID 不是把两套颜色混在一起。

---

## 4. 设计令牌（可直接落地）

```css
:root {
  /* 字体：先定义 CJK，便于其他栈回退 */
  --font-cjk: "Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-display: "Barlow Condensed", "Oswald", "Arial Narrow", var(--font-cjk);
  --font-ui: "Space Grotesk", "Inter", var(--font-cjk), sans-serif;
  --font-mono: "IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace;

  /* 尺度 */
  --gutter: clamp(16px, 4vw, 64px);
  --section-y: clamp(80px, 12vw, 176px);
  --rail: clamp(64px, 7vw, 112px);
  --maxw: 1680px;
  --line: 1px;

  /* 动效 */
  --motion-instant: 120ms;
  --motion-fast: 220ms;
  --motion-base: 480ms;
  --motion-slow: 800ms;
  --motion-cinematic: 1200ms;
  --motion-ambient: 12s;
  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --ease-in: cubic-bezier(.7, 0, .84, 0);
  --ease-inout: cubic-bezier(.65, 0, .35, 1);
  --ease-linear: linear;
}

/* ARK：黑场、青蓝信号、硬边 */
[data-mode="ark"] {
  --bg: #000;
  --surface: #1d1f20;
  --paper: #e8e6e3;
  --ink: #f5f5f5;
  --muted: #ababab;
  --accent: #18d1ff;
  --accent-ink: #001015;
  --stroke: rgba(255, 255, 255, .18);
  --radius: 0px;
  --radius-pill: 0px;
}

/* ENDFIELD：纸白、酸性黄、微圆角 */
[data-mode="endfield"] {
  --bg: #f2f2f2;
  --surface: #fff;
  --paper: #fafafa;
  --ink: #191919;
  --muted: #666;
  --accent: #fffa00;
  --accent-ink: #191919;
  --stroke: #d9d9d9;
  --signal-mint: #00ffa2;
  --signal-magenta: #ff1aac;
  --radius: 4px;
  --radius-pill: 999px;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
  font-variant-numeric: tabular-nums;
  -webkit-font-smoothing: antialiased;
}
```

**颜色使用纪律**

- 酸性黄在浅色底上**只做色块/高亮条**，不做小字；黄色块内文字用石墨黑。
- 青蓝在黑色底上可做强调文字与细线；不要用青蓝写长段落。
- 品红、薄荷只用于 `LIVE`、`ONLINE`、`ALERT` 这类状态点，面积控制在 8px 级。
- 正文不要纯白 `#fff` 大面积铺在纯黑上，使用 `#f5f5f5` 或 `#e8e6e3` 降低刺眼感。

### 字体层级

| 角色 | 栈 | 用法 |
|---|---|---|
| 巨字 / 英文标题 | `--font-display` | 600–800，全大写，`clamp(4rem, 12vw, 13rem)`，`line-height: .8`，字距 `-.02em` |
| 中文大标题 | `--font-cjk` | 700–900，`clamp(2.5rem, 7vw, 7rem)`，`line-height: .95`，字距 `0` |
| 英文眉题 | `--font-ui` | 11–13px，全大写，字距 `.16em`，常配中文小字 |
| 元数据 / 编号 | `--font-mono` | 10–12px，`[ REC ]`、`01 / 06`、坐标、日期 |
| 正文 | `--font-ui` | 15–18px，行高 1.65–1.8；中文每行 28–36 字 |
| 巨型背景字 | `--font-display` | `clamp(8rem, 24vw, 24rem)`，透明填充 + 1px 描边，`aria-hidden="true"` |

规则：**中文不要用窄体展示字**；中文字重与英文巨字拉开对比，不要为了“科技感”把中文压成小字。正文最小 14px，移动端正文 16px。

### 栅格与间距

- 12 列是骨架，但优先用非对称比例：**5/7、4/8、7/5、3/9**。
- 常用间距：`8 / 16 / 24 / 32 / 48 / 64 / 96 / 128px`；区间间距用 `--section-y`。
- 页面宽度 `min(100% - 2*gutter, 1680px)`，但**主图必须允许越界到视口边缘**。
- 细线只用 1px；不要给普通卡片加阴影，层级交给明度、留白、线框。
- 圆角：ARK 0–2px；ENDFIELD 4–6px；胶囊只给按钮和小计数器，不给内容卡片。

---

## 5. 六遍法：vibe coding 的核心工作流

> 不要用一句“做得高级一点”解决设计。把页面拆成六个可验收的 pass；每个 pass 都有明确的完成条件。**静态 pass 与动态 pass 必须分开，否则模型会用动画掩盖糟糕的构图。**

### Pass 1 · BRIEF（定调，不写代码）

写出一张 10 行以内的“信号简报”：

```text
MODE: ENDFIELD
PAGE: 新章节官网 / 单页
PROMISE: 在陌生边境建立第一座前哨站
ACTION: 预约 / 下载 / 查看档案
PALETTE: 纸白 #F2F2F2 + 石墨 #191919 + 酸性黄 #FFFA00
TYPE: Barlow Condensed / Space Grotesk / IBM Plex Mono / Noto Sans SC
GRAPHICS: 同心圆 + 条形码；变换算子 = 径向展开 + 斜切揭示
MOTION: 环境=点阵呼吸 / 反馈=磁吸圆点 / 叙事=蒙版洞 / 标志=加载器裁切入场
SECTIONS: Hero / Dossier / World / Archive / CTA
NO: 紫色渐变、玻璃卡、圆角 24px、满屏光晕、滚动劫持
```

**完成条件**：能说清楚“这个页面唯一的主角是什么”“用户第一屏之后做什么”“哪一个动效只出现一次”。说不清就不要进入下一步。

**vibe coding 提示模板**

> 先不要写代码。根据以下简报，给出 1 个视觉中心、2 种备选构图、2 个图形母题、1 个标志性动态机制（不超过 3 句话）；然后进入结构 pass。

---

### Pass 2 · BONES（语义结构与真实内容）

- 先写出完整语义结构：`header / nav / main / section / footer`，每段有唯一 `h1` 或明确标题层级。
- **内容先于占位图**：用真实标题、真实按钮、真实日期。没有内容就写 `[示例]`，不要 lorem ipsum。
- 同时画出 1440 与 390 两种构图：不是把桌面缩小，而是重新安排阅读顺序。
- 用 `<img>` 的宽高比占位（16:9、3:4、1:1），先不加载真实图片。
- 所有交互控件的可访问名称、焦点顺序先确定。

**完成条件**：去掉颜色、图片、动效后，页面仍然层级清楚、像一份可读的编辑稿；390px 无横向滚动。

**vibe coding 提示模板**

> 只做结构 pass：输出语义 HTML + 基础 CSS 栅格与排版，不写装饰、不写动画、不接图片。使用真实文案。必须给出桌面 1440 与移动 390 的构图差异；不要只做响应式缩小。页面在无图片时也要能读。

---

### Pass 3 · SURFACE（表层：影像、装置、界面）

顺序很重要：**底场 → 影像 → 遮罩 → 内容 → 界面框 → 反馈**。

1. **底场**：纸面/黑场；可加 2–4% 噪声或 48px 技术网格，不要同时加三种纹理。
2. **影像**：裁切、去饱和、压暗、叠色，至少做一种处理；主图越界。
3. **遮罩**：文字放在影像上时，必须用从底色出发的渐变遮罩；不要直接白字压亮图。
4. **界面框**：左轨/顶栏、1px 分隔线、索引、角标、状态条；`pointer-events:none`，只让控件可点。
5. **标志装置**：只选一个——黄色过渡板、蓝图线稿、巨大裁切字、圆形 HUD 环。不要五个全上。
6. **收尾**：删除 20% 装饰。用“眯眼测试”检查：缩到 50% 仍能看出主次，才算成立。

**完成条件**：截图有明确的“鹰角味”而不是通用游戏风；信号色面积不超过 5%；正文对比度达标。

**vibe coding 提示模板**

> 只做 surface pass，不改 DOM 与文案。加入纸面/黑场底、影像裁切与遮罩、1px 界面线、索引/角标、一个标志装置。全站只允许一个信号色。不要引入新的圆角卡片、阴影或渐变装饰。先保证正文可读，再加氛围。

---

### Pass 4 · GRAPHICS（图形母题与变换算子）

先建“图形库”，再排版；不要边写 section 边随手画 SVG。

1. **选 2 个母题**：从第 8.4 节的图元库选两个（例如“同心圆 + 条形码”“点阵 + 斜切多边形”）。它们必须在 Hero、Dossier、Footer 以不同尺度复用。
2. **选 1 套变换语法**：每个母题只配一种变换方式——旋转扫描、径向扩散、遮罩揭示、切片错位、透视倾斜、线稿绘制。不要给每个图元配五种动画。
3. **先用静态快照验证**：没有动画时，图形必须仍然像“技术图纸/仪表/档案”，而不是随机装饰。透明度通常 0.06–0.2；覆盖面积不超过 30%。
4. **图形层次**：背景场（最大、最淡）→ 结构线（中等、局部）→ 焦点图形（最小、最清晰）。同一屏最多一层“焦点图形”。
5. **生成而非贴图**：优先 CSS gradient / inline SVG / Canvas 程序化生成；保证任意分辨率清晰、可换色、可动。
6. **减少 20%**：删掉无法解释用途的线、点、环、刻度。

**完成条件**：截图里能指出两个母题及其复用关系；每个图形都有明确的信息角色（定位、分区、状态、进度、扫描、归档）；关闭动画后画面依然成立。

**vibe coding 提示模板**

> 只做 graphics pass：从图形库选 2 个母题，用 CSS/SVG 程序化实现，定义 1 套变换语法并给出静态版。不要改布局和文案；不要加新的颜色；所有图形 `aria-hidden`；先保证没有动画也像技术界面。

---

### Pass 5 · MOTION（动效编排）

按四层搭建，不要从“炫酷效果”倒推动画：

1. **环境 ambient**：最多一个持续运动——点阵呼吸、线场起伏、刻度慢转。低对比、低速度（6–20s 周期），永远在内容之下。
2. **反馈 feedback**：只做 2–3 种——磁吸/排斥、下划线绘制、图片轻微放大、按钮信号条滑动。160–240ms，不改变布局。
3. **叙事 narrative**：滚动揭示 + 一次章节转场。全站同一套，只触发一次；优先 `opacity/transform/clip-path`。
4. **标志 signature**：全页只允许一个“记忆点”——加载器裁切、蒙版洞游走、融球扩散、双螺旋生成。它必须位于首屏或第一次转场，后面不再重复。

**完成条件**：静音、减少动态效果、关闭 JS 三种情况下内容都完整；任意时刻同时运动的区域不超过 2 个；所有循环动画在页面不可见时暂停；页面没有滚动劫持。

**vibe coding 提示模板**

> 只做 motion pass：先列出环境/反馈/叙事/标志四层，各选 1 个机制，再实现。标志级效果只出现一次。所有动画只改 transform / opacity / clip-path / filter；必须实现 `prefers-reduced-motion` 的静态版本；不要新增滚动监听或第三方动画库，除非现有库已存在。

---

### Pass 6 · AUDIT（验收）

按第 13 节清单逐项过。**先修可读性、响应式和性能，再谈氛围。** 每轮只聚焦 3–5 个问题，不要越改越花。

**vibe coding 提示模板**

> 只做审计，不新增设计：根据 390 / 768 / 1440 截图、录屏与检查表，找出最严重的 5 个问题（层级、对比度、溢出、可访问性、动效性能），逐项修复并说明原因。不要加入新装饰。

---

## 6. 页面骨架与配方

### 6.1 叙事顺序

游戏/品牌官网优先采用五段式：

1. **Hero / 信号舞台**：一句话主张 + 一个主角影像。
2. **Dossier / 档案特写**：证明世界观或产品能力的核心对象。
3. **World / 世界观或场景**：用暗场/影像换气，降低信息密度。
4. **Archive / 索引轨**：角色、视频、版本、公告的横向或网格归档。
5. **CTA / 收束**：下载、预约、进入档案；用巨型字标结束。

内容多的页面可以重复 2–4，但**每一段只解决一个问题**。

### 6.2 Hero：电影式首屏

- 高度 `100svh`（移动端不要用 `100vh`）。
- 桌面：固定左轨或顶部导航；主图占 60–80%，从右侧或底部越界裁切。
- 标题放在**下三分之一**或**左侧窄栏**，不要默认居中。
- 眉题 + 巨大标题 + 一行说明 + 一个 CTA；最多再放一个 HUD 细节。
- ENDFIELD 变体：纸白底，人物/场景在右，标题压在左下，底部黑/灰功能块；黄色只做小面积高亮或章节板。
- ARK 变体：黑场，全屏视频/蓝图，巨大裁切字，右侧下载抽屉或右下角状态条。
- 移动端：主图满幅，内容压底部 1/3；顶部 48–56px 紧凑栏；CTA 做成 44px 高的黑色/黄色实体条。

```html
<section class="hero" data-mode="endfield">
  <div class="hero__media" aria-hidden="true">
    <img src="/key-art.avif" alt="" />
  </div>
  <div class="hero__scrim" aria-hidden="true"></div>

  <header class="topbar">
    <a class="brand" href="/" aria-label="返回首页">ORIGINAL / 原创项目</a>
    <nav aria-label="主导航">
      <a href="#archive">档案</a>
      <a href="#world">世界</a>
      <a class="btn" href="#deploy">进入前线</a>
    </nav>
  </header>

  <div class="hero__content">
    <p class="eyebrow"><span class="mono">01</span> FRONTIER / 前线档案</p>
    <h1>越过边界<br />抵达未知</h1>
    <p class="lede">在废土之上重建工业秩序。一次关于生存、协议与开拓的行动。</p>
    <div class="actions">
      <a class="btn btn--solid" href="#deploy">开始部署</a>
      <a class="btn btn--ghost" href="#archive">查看档案</a>
    </div>
  </div>

  <p class="hud mono" aria-hidden="true">[ REC ] 00:00:14 / SECTOR 07</p>
</section>
```

```css
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-items: end;
  overflow: clip;
  background: var(--bg);
  isolation: isolate;
}
.hero__media { position: absolute; inset: 0; z-index: -2; }
.hero__media img { width: 100%; height: 100%; object-fit: cover; object-position: 62% 40%; }
.hero__scrim {
  position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background: linear-gradient(90deg,
    var(--bg) 0%,
    color-mix(in srgb, var(--bg) 70%, transparent) 34%,
    transparent 68%),
    linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--bg) 78%, transparent) 100%);
}
.hero__content {
  width: min(100% - 2 * var(--gutter), var(--maxw));
  margin-inline: auto;
  padding-block: var(--section-y);
}
.topbar {
  position: absolute; inset: 0 0 auto; z-index: 2;
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px var(--gutter);
}
```

### 6.3 Dossier：窄栏档案

ENDFIELD 最有用的结构：**一窄一宽**。

```css
.dossier {
  display: grid;
  grid-template-columns: minmax(280px, 4fr) minmax(0, 8fr);
  min-height: 100svh;
  background: var(--paper);
}
.dossier__copy {
  align-self: center;
  padding: var(--section-y) var(--gutter);
  border-left: 1px solid var(--stroke);
}
.dossier__media { position: relative; overflow: clip; }
.dossier__media img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; }

@media (max-width: 900px) {
  .dossier { grid-template-columns: 1fr; }
  .dossier__media { min-height: 52svh; }
  .dossier__copy { border-left: 0; border-top: 1px solid var(--stroke); }
}
```

窄栏内容按这个顺序排：

1. 眉题：`OPERATOR FILE / 干员档案`
2. 索引：`01 / 06`
3. 中文名 + 英文名/罗马字
4. 一行引语（最多 2 行）
5. 2–4 行简介 / 说明
6. 3–5 行元数据（阵营、状态、日期、编号）
7. 一个动作（查看完整档案）

**不要**在窄栏里塞大段正文；大段文字要放到更宽的阅读列或下一屏。

### 6.4 Index Rail：索引轨

- 标题左对齐，右侧放 `01 / 06` 与圆形上一页/下一页。
- 卡片用 `scroll-snap-type: x mandatory`；每张卡 `scroll-snap-align: start`。
- 卡片内部：影像、分类、日期、标题；用 1px 顶线分隔，不用阴影。
- 当前项用信号色 2–3px 下划线或左侧竖条标记，不要整卡发光。
- 键盘可左右切换；按钮有 `aria-label="上一项"` / `"下一项"`；自动播放必须提供暂停。

### 6.5 章节过渡板

用于 ARK → ENDFIELD 的换气。结构：

```html
<div class="interlude" aria-hidden="true">
  <span class="interlude__index mono">SECTION 02</span>
  <p class="interlude__en">LORE</p>
  <p class="interlude__cn">世界观资料</p>
  <svg class="interlude__line" viewBox="0 0 240 120"><!-- 原创线稿 --></svg>
</div>
```

```css
.interlude {
  position: relative;
  min-height: clamp(96px, 14vw, 220px);
  background: var(--accent);
  color: var(--accent-ink);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px var(--gutter);
  overflow: clip;
}
.interlude__en { font: 600 clamp(2.5rem, 7vw, 6rem)/.9 var(--font-display); text-transform: uppercase; }
.interlude__cn { font: 800 clamp(1.5rem, 4vw, 3.5rem)/1 var(--font-cjk); }
.interlude__line { position: absolute; right: 12%; top: 50%; width: 18%; transform: translateY(-50%); color: var(--accent-ink); opacity: .7; }
```

### 6.6 档案网格 / 公告

- 主新闻占 2 列，其余占 1 列；用 1px 横线形成“报纸栏”而不是卡片圆角。
- 每项必须包含：分类、日期、标题。缩略图 16:9，标题悬停时下划线从左画出。
- 移动端改为单列或横向滑动；不要丢失日期与分类。
- 空状态也要像档案：`[ EMPTY ] / 暂无记录`，不要用卡通插画。

### 6.7 图形素材库 / 实验索引（rahoo 式）

如果页面本身是工具、设计系统或素材库，不要把它做成普通的卡片列表；把它做成“图形实验台”：

- 白底、细线、无阴影；每个卡片的预览占 60–70% 面积，标题在左下，英文名用等宽小字。
- 4–5 列桌面、2 列平板、1–2 列移动；卡片比例 16:9 或 4:3。
- 每张卡只展示一个 primitive；hover/focus 时让该 primitive 做 **一次** 10–30% 的变换（旋转 8°、扫描线走一遍、点阵呼吸一次），离开复位。
- 点击卡片：复制 SVG/CSS 或打开参数面板；提供“静态/动画”切换，方便导出。
- 分类用“场 / 径向 / 框架 / 数据”，不要用“素材 1、素材 2”。
- 工具界面保持克制：白底、1px 线、Element/Ant 风格控件都可以；复杂只发生在预览区。

### 6.8 页脚

- 巨型字标（可以是描边字）+ 4–6 个索引链接 + 法务/版权小字。
- 用一条 1px 线把页脚与内容分开；末行可放状态条：`END OF RECORD / 2026.10.25 / 00:00:00`。
- 不要在这里突然加入 newsletter 大圆角卡片或社交图标墙。

---

## 7. 组件配方（CSS）

### 7.1 编辑网格

```css
.shell {
  width: min(100% - 2 * var(--gutter), var(--maxw));
  margin-inline: auto;
}
.editorial {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--gutter);
}
.editorial > .aside { grid-column: 1 / span 4; }
.editorial > .main  { grid-column: 5 / -1; }
@media (max-width: 900px) {
  .editorial { grid-template-columns: 1fr; }
  .editorial > * { grid-column: 1 / -1; }
}
```

### 7.2 左侧工具栏 / 图标轨

```css
.shell--rail { display: grid; grid-template-columns: var(--rail) minmax(0, 1fr); }
.rail {
  position: sticky; top: 0; z-index: 40;
  height: 100svh;
  display: flex; flex-direction: column; align-items: center;
  padding: 20px 0;
  border-right: 1px solid var(--stroke);
  background: var(--surface);
}
.rail a, .rail button {
  position: relative;
  width: 44px; height: 44px;
  display: grid; place-items: center;
  color: var(--muted);
  text-decoration: none;
}
.rail [aria-current="page"] { color: var(--ink); }
.rail [aria-current="page"]::before {
  content: ""; position: absolute; left: -12px; top: 8px;
  width: 3px; height: 28px; background: var(--accent);
}
.rail .tooltip {
  position: absolute; left: calc(100% + 12px); top: 50%;
  transform: translateY(-50%);
  opacity: 0; pointer-events: none;
  white-space: nowrap; font: 12px var(--font-mono);
  background: var(--ink); color: var(--bg); padding: 6px 8px;
}
.rail a:hover .tooltip, .rail a:focus-visible .tooltip { opacity: 1; }

@media (max-width: 1023px) {
  .shell--rail { display: block; }
  .rail {
    position: fixed; inset: auto 0 0; height: 56px; width: 100%;
    flex-direction: row; justify-content: space-around;
    border-right: 0; border-top: 1px solid var(--stroke);
  }
}
```

图标必须配 `aria-label`。桌面用工具提示补全文字，触屏不能只靠 hover。

### 7.3 眉题 / 索引 / 技术标签

```css
.eyebrow {
  display: flex; align-items: center; gap: 12px;
  font: 500 11px/1.2 var(--font-ui);
  text-transform: uppercase; letter-spacing: .16em;
  color: var(--muted);
}
.eyebrow::before { content: ""; width: 28px; height: 1px; background: var(--accent); }
.mono { font-family: var(--font-mono); font-size: 11px; letter-spacing: .04em; }
.index { font-family: var(--font-mono); color: var(--accent); }

.tag {
  display: inline-flex; align-items: center; min-height: 24px;
  padding: 2px 8px;
  font: 500 11px/1 var(--font-mono);
  color: var(--bg); background: var(--ink);
  border-radius: var(--radius);
}
[data-mode="endfield"] .tag--accent { background: var(--accent); color: var(--accent-ink); }
[data-mode="ark"] .tag--accent { background: var(--accent); color: var(--accent-ink); }
```

### 7.4 切角面板

```css
.cut {
  --cut: 14px;
  position: relative;
  background: var(--surface);
  clip-path: polygon(
    0 0,
    calc(100% - var(--cut)) 0,
    100% var(--cut),
    100% 100%,
    0 100%
  );
}
/* 需要描边时：外层用 1px 背景，内层同形状内缩 1px */
.cut-frame {
  background: var(--stroke);
  padding: 1px;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%);
}
.cut-frame > * { clip-path: polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 0 100%); }
```

切角是“机械/档案”的语法，不要每个元素都切。一个页面出现 1–3 次即可。

### 7.5 蓝图底场 / 技术网格

```css
.field {
  position: relative;
  background-color: var(--bg);
  background-image:
    linear-gradient(var(--stroke) 1px, transparent 1px),
    linear-gradient(90deg, var(--stroke) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: center;
}
.field::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(circle at 50% 40%, transparent 0 38%, var(--bg) 82%);
}
```

用两层网格（48px 主网格 + 8px 次网格）时，次网格透明度降到主网格的 1/3。网格只负责“工程感”，不要压过内容。

### 7.6 影像处理与遮罩

```css
.media { position: relative; overflow: clip; background: var(--surface); }
.media > img { width: 100%; height: 100%; object-fit: cover; display: block; }
.media--duotone > img { filter: grayscale(1) contrast(1.08); }
.media--duotone::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: var(--accent); mix-blend-mode: multiply; opacity: .14;
}
.media--grain::before {
  content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  opacity: .05;
  background-image: url("/noise.svg"); /* 使用原创/自建噪点纹理 */
}
```

**文字压图**必须加遮罩；亮图用底色渐变，暗图用黑色渐变。不要用 `text-shadow` 硬扛。

### 7.7 按钮

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 44px; padding: 0 20px;
  border: 1px solid var(--ink);
  border-radius: var(--radius-pill);
  font: 600 12px/1 var(--font-ui);
  letter-spacing: .08em; text-transform: uppercase;
  text-decoration: none; color: var(--ink);
  background: transparent;
  transition: background-color var(--motion-fast) ease, color var(--motion-fast) ease;
}
.btn--solid { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.btn--solid:hover { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
```

ENDFIELD 的下载/平台块可以做成黑底方块；ARK 则保持窄长直角条。不要把每个按钮都做成信号色。

### 7.8 滚动揭示

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--motion-slow) var(--ease-out),
              transform var(--motion-slow) var(--ease-out);
  transition-delay: var(--delay, 0ms);
}
[data-reveal].is-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
  [data-reveal] { opacity: 1; transform: none; }
}
```

```js
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
```

只做一次；不要监听 `scroll` 重新计算。

---

## 8. 动态与图形变换系统

> 核心公式：**图形 = 母题（Primitive）× 变换（Transform）× 时间（Timing）**。  
> 母题决定“它是什么”，变换决定“它怎么工作”，时间决定“它像不像这个世界里的机器”。

> 可运行的最小示例：`examples/motion-lab.html`。包含蒙版洞、融球、玻璃音波、雷达绘制、透视卡和 reduced-motion 开关；先跑起来看，再按本节的参数改成自己的品牌。

### 8.0 两个动态参考站，具体学什么

**ignoredone.space：学“多层合成 + 可运动的图形对象”**

- 固定背景图 + 半透明白色遮罩；遮罩不是静态的，而是被 `mask-image` 的圆孔切开。孔的位置来自圆点族的实时质心，所以“背景”和“图形”是同一个系统。
- 融球圆点不是装饰：它们从中心向外扩散、被鼠标推开、质心驱动暖光。一个对象同时承担构图、交互、光照三种职责。
- 线场、点阵、音波、打字机全部低对比、低速度：**动效面积大，但视觉噪音小**。
- 每层都可以独立关闭：关闭线场仍有点阵，关闭圆点仍有标题。这保证了性能和降级。
- 页面转场/加载器只负责“交接待机画面”，不为了动画拖时间。

**rahoo.online：学“图形母题库 + 参数化变换”**

- 素材面板把图形拆成可命名的 primitive（concentricCircle、halftone、barcode……），每个都可单独预览、组合、变换。不要每次从零画装饰。
- 封面/通行证/幻灯片不是“卡片列表”，而是**斜切分屏、叠层画框、透视视角、条形码、雷达图**的组合；所有元素都是可调的参数。
- 动态立绘工具把“角色动画”拆成 idle/enter 两段视频 + 帧步进 + 保存当前帧；这说明动态内容也可以被**时间轴化、可检查、可导出**，而不只是自动播放。
- 界面本身保持白底、细线、小圆角；复杂只发生在画布内。工具界面不能和作品抢戏。

**取舍**

- 从 ignoredone 取“合成方法/运动语法”，不要照搬它的文案、背景图、Logo、具体配色比例。
- 从 rahoo 取“图元库/构图与参数化思维”，不要复制它的素材缩略图、角色图、封面成图。
- 两个站都是“实验室”，不是“模板库”。目标是把它们的机制抽象成可复用组件，而不是复刻页面。

**动态招式选择器**

| 想要的感觉 | 首选机制 | 次选 | 不要同时加 |
|---|---|---|---|
| 冷峻扫描 / 秘密档案 | 蒙版洞 + 线稿绘制 | 条形码扫描、刻度圆 | 融球、彩色光晕 |
| 液态未来 / 生物机械 | 融球螺旋 + 毛玻璃音波 | 双螺旋、点阵呼吸 | 大量硬切、密集 HUD |
| 工业仪表 / 数据面板 | 雷达绘制 + 刻度旋转 | 数字增长、HUD 线 | 大幅粒子、液态效果 |
| 厚重纸质 / 档案拼贴 | 斜切分屏 + 叠层画框 | 透视卡、条形码 | 全屏 3D、流体 |
| 神秘叙事 / 太空信号 | 双螺旋 + 点云/线场 | 打字机、遮罩揭示 | 卡通弹跳、明亮渐变 |
| 节奏 / 发布会 | 词语循环 + 信号色擦除 | 音波、卡片 stagger | 长循环背景动画 |



### 8.1 四层运动与预算

| 层级 | 作用 | 数量上限 | 时间尺度 | 典型机制 |
|---|---|---:|---|---|
| **环境 Ambient** | 让画面像在运行，但不抢内容 | 全页 1 个 | 6–20s 循环 | 点阵呼吸、线场起伏、刻度慢转、背景暖光漂移 |
| **反馈 Feedback** | 回应用户，建立“可操作”的手感 | 2–3 种交互 | 120–240ms | 圆点磁吸/排斥、下划线绘制、图片微放大、按钮信号条 |
| **叙事 Narrative** | 引导滚动与章节切换 | 1 套系统 | 500–900ms | 淡入上移、`clip-path` 揭示、斜切擦除、数字增长 |
| **标志 Signature** | 留下记忆点，建立品牌动作 | **全页 1 个** | 800–1600ms | 加载器裁切、蒙版洞、融球扩散、双螺旋生成、首屏字体循环 |

**硬约束**

- 同一时刻最多 **2 个区域**在运动。背景已经在呼吸，标题就不要再漂浮。
- 标志级效果只出现一次。第二次出现就降级为环境或反馈。
- 所有循环动画必须在页面不可见时暂停；所有动效必须有静态版本。
- 不用滚动劫持，不用全屏鼠标跟随光晕，不用超过 2 层的视差。

### 8.2 运动令牌

基础令牌已在 **Section 4** 的 `:root` 中定义（`--motion-*`、`--ease-*`）。不要重复定义第二套时长变量。

| 场景 | 时长 | 缓动 | 属性 |
|---|---|---|---|
| 按钮/链接反馈 | 120–220ms | ease-out | background/color/transform |
| 磁吸/排斥 | 持续跟随 | lerp 0.12–0.2 | translate3d/scale |
| 标题入场 | 600–900ms | `--ease-out` | opacity/translateY/clip-path |
| 图片揭示 | 700–1000ms | `--ease-out` | clip-path/scale |
| 章节擦除 | 500–800ms | `--ease-inout` | clip-path/translateX |
| 雷达/线稿绘制 | 900–1600ms | `--ease-out` | stroke-dashoffset |
| 环境点阵/线场 | 6–20s | linear/inout | transform/opacity |
| 加载器退场 | 600–1000ms | `--ease-inout` | clip-path/opacity |

**禁止弹跳/overshoot**，除非主题明确是“机械卡扣”（最多 3% 过冲）。这套语言的运动应像精密机械，不像果冻。

### 8.3 标志性机制（按参考站拆解）

#### A. 蒙版洞 / 指针聚光

底层固定影像，上层白色或黑色遮罩。遮罩上用 `mask-image` 挖出若干圆形洞，洞的位置由运动的圆点或指针驱动。视觉上像“扫描仪在档案上开孔”，比直接放亮色圆点高级。

```css
.stage { position: relative; isolation: isolate; background: #f2f2f2 url("/field.avif") center/cover; }
.veil {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: #f2f2f2; opacity: .48;
  -webkit-mask-image: var(--holes, none);
          mask-image: var(--holes, none);
  -webkit-mask-composite: source-in;
          mask-composite: intersect;
}
```

```js
// 每 2–3 帧更新一次即可；不要 60fps 重写整串 mask
const holes = points.map(p =>
  `radial-gradient(circle at ${p.x}px ${p.y}px, transparent 0 ${p.r}px, #000 ${p.r + 1}px)`
).join(',');
stage.style.setProperty('--holes', holes);
```

**要点**：多洞必须用 `mask-composite: intersect`（Safari `-webkit-mask-composite: source-in`）；用 `add` 会让各层的黑色区域互相盖住，洞口消失。洞的数量 2–6 个；半径 20–120px；只有桌面显示；移动端退化为静态大洞或直接取消。遮罩层 `pointer-events:none`，内容层永远在上方。多洞 `mask` 在旧浏览器合成不一致时，改用 inline SVG `<mask>` + `<circle>`，或只保留一个洞。

#### B. 融球 / 螺旋扩散

参考 ignoredone 的实现：16 个圆点按圆周分布在容器内，以不同半径、时长、延迟向外扩散，再返回；容器套 SVG gooey 滤镜，使靠近的圆点融合成液态团块。鼠标靠近时，内层圆点被平滑推开并放大；整簇的质心还能驱动背景暖光。

```html
<svg width="0" height="0" aria-hidden="true">
  <defs>
    <filter id="gooey">
      <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 35 -15" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  </defs>
</svg>
```

```css
.metaballs { position: absolute; inset: 0; filter: url(#gooey); pointer-events: none; }
.ball {
  position: absolute; top: 50%; left: 50%;
  width: var(--size); aspect-ratio: 1;
  margin: calc(var(--size) / -2); border-radius: 50%;
  background: var(--accent); opacity: .9;
  will-change: transform;
}
```

```js
// 每个圆点：从中心出发，沿自己的角度向外呼吸
const count = 16;
for (let i = 0; i < count; i++) {
  const angle = (i / count) * Math.PI * 2;
  const radius = 180 + (i % 5) * 90;
  const ball = createBall(i);
  ball.animate([
    { transform: 'translate3d(0,0,0) scale(.6)' },
    { transform: `translate3d(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px, 0) scale(1.3)` }
  ], {
    duration: 2200 + (i % 4) * 420,
    delay: i * 110,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out'
  });
}
```

**性能与范围**：最多 16–20 个圆点，容器不超过视口 50%；只在首屏/一个标志性区块使用；移动端改为无滤镜的 CSS 圆点环。Safari 对 SVG filter + 大面积动画较敏感，必须做降级。鼠标交互用 `lerp`：

```js
// 排斥：靠近时推开，离开后回位
const f = Math.max(0, 1 - dist / 300);
const ease = f * f * (3 - 2 * f);
const targetX = (dx / dist) * ease * 55;
const targetY = (dy / dist) * ease * 55;
currentX = lerp(currentX, targetX, .18);
currentY = lerp(currentY, targetY, .18);
```

#### B2. 双螺旋 / 轨道粒子

这是 ignoredone 标题里的第三个实验。它不是“画一条螺旋线”，而是让两组粒子在同一螺旋轨道上相差 180° 运动，用极小的点、透明度和透视缩放制造纵深。

参数化思路（伪代码）：

```js
// time 随时间递增；drawParticle(x, y, r, alpha) 由 Canvas/SVG 实现
const turns = 2.5;
const n = 36;
for (let i = 0; i < n; i++) {
  const t = i / (n - 1);
  const a = t * turns * Math.PI * 2 + time;
  const y = (t - .5) * height;
  const depth = Math.sin(a);                 // -1 前，1 后
  const x = Math.cos(a) * radius;
  const scale = .55 + (depth + 1) * .35;     // 近大远小
  drawParticle(x * scale + centerX, y + centerY, 2 + depth * 1.2, scale);
  drawParticle(Math.cos(a + Math.PI) * radius * scale + centerX, y + centerY, 2 - depth * 1.2, scale);
}
```

- 两条链相位差 π；每 4–6 个点画一条极细的“横档”，透明度 0.05。
- 用 Canvas/SVG，不要用 DOM 创建 100 个节点。
- 旋转速度极慢（20–40s/圈）；粒子 ≤ 80；只在 hero/加载器使用。
- 触屏和 `prefers-reduced-motion` 显示静态螺旋；移动端减少到 24 个点。

#### C. 毛玻璃音波

用 24–32 根细长玻璃条组成横向波形，条高按中心权重起伏。它看起来像音频频谱，但不需要真实音频分析。关键是 **backdrop-filter + 细边框 + 低透明度**，而不是发光。

```css
.wave { display: flex; align-items: center; gap: 6px; }
.wave span {
  width: 6px; height: 60px; border-radius: 99px;
  border: 1px solid rgba(255,255,255,.42);
  background: rgba(255,255,255,.22);
  -webkit-backdrop-filter: blur(8px) saturate(150%);
          backdrop-filter: blur(8px) saturate(150%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.5);
  transform-origin: center;
  animation: wave 1.2s ease-in-out infinite alternate;
  animation-delay: calc(var(--i) * -90ms);
}
@keyframes wave { from { transform: scaleY(.45); } to { transform: scaleY(1); } }
```

**要点**：条数 ≤ 32；只在小面积使用 `backdrop-filter`；用 `scaleY` 而非 `height`；中心条振幅更大；移动端减少到 12 条或静态。

#### D. Three.js 波浪线场

ignoredone 用 18 条 `THREE.Line`、每条 160 段，叠加三组正弦波；每 6 条有 1 条黄色，透明度仅 0.045–0.1；相机以极慢速度漂移。它不是主角，而是“空气里的扫描线”。

实现要点：

- `LineBasicMaterial({ transparent:true, opacity:.05–.1, depthWrite:false })`
- 只动顶点位置，不重建 geometry；`position.needsUpdate = true`
- DPR 上限 2；`prefers-reduced-motion` 时只渲染一帧
- `visibilitychange` 时暂停 `requestAnimationFrame`
- 没有 WebGL/Three 经验时，用 2D Canvas 画 8–12 条贝塞尔/正弦线即可，性能更稳：

```js
function draw(t) {
  ctx.clearRect(0, 0, w, h);
  for (let l = 0; l < 10; l++) {
    ctx.beginPath();
    for (let x = 0; x <= w; x += 12) {
      const y = h * .5 + (l - 5) * 46
        + Math.sin(x * .006 + t * .0002 + l) * 14
        + Math.sin(x * .017 - t * .00015 + l * .7) * 5;
      x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.strokeStyle = l === 3 ? 'rgba(255,214,0,.10)' : 'rgba(0,0,0,.055)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  requestAnimationFrame(draw);
}
```

#### E. 线稿绘制 / 雷达展开

SVG 的 `pathLength="1"` 让路径长度归一化；用 `stroke-dasharray:1; stroke-dashoffset:1` 做“绘图”效果。适合 HUD 环、同心圆、角色雷达图、地图路线。

```html
<svg viewBox="0 0 200 200">
  <polygon class="radar" points="100,20 165,65 142,145 58,145 35,65" pathLength="1" />
</svg>
```

```css
.radar {
  fill: none; stroke: var(--accent); stroke-width: 1.5;
  stroke-dasharray: 1; stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.2s var(--ease-out);
}
.is-in .radar { stroke-dashoffset: 0; }
```

数字增长用 `requestAnimationFrame` 或 CSS `@property`；数字和图形同时展开时，图形先、数字后 120ms。

#### F. 打字机 / 词语循环

参考 ignoredone：首屏大标题在两组词组之间循环，逐字打出、停留、删除。它适合“品牌宣言/档案代号”，但不适合长正文。

- 保留固定高度/宽度，避免布局抖动；用 `min-height` / `ch` 占位。
- 装饰性循环文字可 `aria-hidden="true"`；真正标题用静态可读文本。
- 打字速度 70–110ms/字；停留 2–3s；删除 40–60ms/字；每轮之间留 400–700ms。
- 移动端只打一次，不循环；`prefers-reduced-motion` 直接显示最终文字。

#### G. 透视倾斜 / 叠层卡片

参考 rahoo 的“视角控制”和封面叠层：让卡片像一块被拿在手里的证件/面板，而不是网页卡片。

```css
.tilt {
  transform: perspective(900px)
             rotateX(var(--rx, 0deg))
             rotateY(var(--ry, 0deg));
  transition: transform 350ms var(--ease-out);
  transform-style: preserve-3d;
}
```

```js
card.addEventListener('pointermove', (e) => {
  if (!matchMedia('(pointer: fine)').matches) return;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5;
  const y = (e.clientY - r.top) / r.height - .5;
  card.style.setProperty('--ry', `${x * 8}deg`);
  card.style.setProperty('--rx', `${-y * 8}deg`);
});
card.addEventListener('pointerleave', () => {
  card.style.setProperty('--rx', '0deg');
  card.style.setProperty('--ry', '0deg');
});
```

**要点**：±6–10° 足够；不要高光扫过整卡；不要给所有卡片都加；触屏保持静态；`prefers-reduced-motion` 关闭。

#### H. 页面转场 / 加载器

参考 ignoredone 的移动端“白色遮罩淡入 → 跳转”，但升级为不阻塞、可中断、符合品牌的动作：

- 同文档转场：`document.startViewTransition()`；给主图/标题设置 `view-transition-name`；旧页淡出 250ms，新页用 `clip-path` 向上揭示 550ms。
- 跨文档转场：`@view-transition { navigation: auto; }`（同源页面）；不支持时回退到 300ms 淡入。
- 首屏加载器：品牌字标 + 进度/百分比；退场用 `clip-path: inset(0 0 0 0) → inset(0 0 100% 0)`，700–1000ms；不要为了动画强行等待资源。
- 页面跳转延迟不超过 **600ms**；用户点击后立即给出视觉反馈，不能假装“加载中”卡住。
- 移动端兜底：全屏遮罩 + 品牌标记 + 400ms 淡出；`prefers-reduced-motion` 直接切换。

#### I. 动态立绘 / 帧步进（rahoo 式）

当页面要展示角色动画、产品旋转或任何“可逐帧检查”的内容时，不要只放一个自动播放的视频。把动画变成可检查的时间轴：

- 提供两段状态：`IDLE`（待机循环）与 `ENTER`（登场）；默认播放 IDLE，交互时播放 ENTER 一次，再回 IDLE。
- 控制条：Play/Pause、`-8帧`、`-1帧`、`+1帧`、`+8帧`、保存当前帧。
- 键盘：`Space` 播放/暂停，`←/→` 单帧，`Shift + ←/→` 跳 8 帧；按钮必须有 `aria-label`。
- 实现：`video.currentTime += 1 / fps`；更新前 `pause()`；需要精确帧时用 `requestVideoFrameCallback()`。不要把视频逐帧画到 Canvas，除非必须导出。
- 移动端隐藏帧步进，只保留播放/暂停；`prefers-reduced-motion` 显示 poster 和静态帧。
- 这是“工具化叙事”：让用户感觉自己在操作一台设备，而不是看一个宣传视频。

### 8.4 图形母题库（来自 rahoo 的素材思维）

不要在每个 section 画新的装饰。建立一个 2–3 个母题的小库，用尺度、密度、裁切、透明度反复组合。以下 17 个图元可作为母题库：

| 组 | 图元 | 视觉作用 | 适合的动效 |
|---|---|---|---|
| **场 / 密度** | halftone 半调 | 压低影像、制造印刷感 | 透明度呼吸、图案缓慢漂移 |
| | dotMatrix 点阵 | 数字空间、地形扫描 | 三层错峰呼吸、鼠标视差 |
| | linePattern 重复线 | 背景速度/方向 | 横向平移、遮罩擦除 |
| | waveTexture 波浪纹 | 信号、流体、干扰 | 相位移动、轻微扭曲 |
| | contour 等高线 | 地形、扫描、世界地图 | 缓慢漂移、绘制 |
| **径向 / 轨道** | concentricCircle 同心圆 | 目标、雷达、焦点 | 慢速旋转、同心圆依次绘制 |
| | scaleCircle 刻度圆 | 仪表、测量、装载 | 扫描线旋转、刻度点亮 |
| | rays 射线 | 爆发、信号发射、聚焦 | 扫光、由中心向外展开 |
| | ringArray 环形阵列 | 粒子环、编码、机械结构 | 交错旋转、逐个出现 |
| | y2kRing 星环 | 轨道、光环、未来感 | 椭圆轨道运行、局部高亮 |
| | globeSphere 经纬球 | 全球、坐标、档案 | 经纬线旋转、线框绘制 |
| **框架 / 数据** | barcode 条形码 | 身份、版本、归档 | 扫描线上下扫过、条码抖动 |
| | hudLines HUD 线 | 界面框、瞄准、分区 | 虚线绘制、角标出现 |
| | squareGrid 方形网格 | 坐标、工程纸、基底 | 透视位移、网格浮现 |
| | polygonGrid 多边形网格 | 地形、低多边形、结构 | 顶点脉冲、斜切遮罩 |
| | nestedPolygons 嵌套多边形 | 层级、权限、递归 | 逐层缩放、逐层绘制 |
| | normalShape 常规图形 | 箭头、切角、警示块 | 裁切揭示、位移动画 |

**生成方式优先级**

1. **CSS gradient**：点阵、半调、条形码、重复线、射线、同心圆。轻量、可换色。
2. **Inline SVG**：HUD、刻度、经纬球、嵌套多边形、等高线。可描边、可 dash 绘制、分辨率无关。
3. **Canvas / Three.js**：大量粒子、线场、融球、流体。只在确有性能预算时使用。

```css
/* 可直接用的 4 个低成本母题 */
.barcode {
  background: repeating-linear-gradient(90deg,
    currentColor 0 1px, transparent 1px 4px,
    currentColor 4px 7px, transparent 7px 12px);
}
.halftone {
  background: radial-gradient(circle, currentColor 1px, transparent 1.5px) 0 0 / 10px 10px;
  -webkit-mask-image: linear-gradient(135deg, #000, transparent 70%);
          mask-image: linear-gradient(135deg, #000, transparent 70%);
}
.ring-field {
  background: repeating-radial-gradient(circle,
    transparent 0 22px, currentColor 22px 23px);
}
.ray-field {
  background: repeating-conic-gradient(from 0deg,
    currentColor 0 .4deg, transparent .4deg 8deg);
  -webkit-mask-image: radial-gradient(circle, transparent 0 34%, #000 35%);
          mask-image: radial-gradient(circle, transparent 0 34%, #000 35%);
}
```

所有母题默认 `color: currentColor; opacity: .06–.18; pointer-events: none;`。用 `mix-blend-mode: multiply`（浅底）或 `screen`（深底）让它“印”在画面上，而不是浮在上面。

### 8.5 图形变换算子

| 算子 | 做法 | 适用 | 注意 |
|---|---|---|---|
| **Slice 切片** | `clip-path: polygon(...)`；斜切分屏、切角卡 | 角色档案、封面、面板 | 不要切掉文字与关键轮廓 |
| **Stack 叠层** | 2–5 层卡片旋转/偏移；hover 展开 4–8px | 封面、公告、通行证 | 层数 ≤ 5；焦点层最清晰 |
| **Tilt 透视** | `perspective(900px) rotateX/rotateY(±8deg)` | 证件卡、封面、数据板 | 仅精细指针；触屏静态 |
| **Scale/Crop 缩放裁切** | `object-fit: cover` + `object-position`；hover `scale(1.03)` | 大图、档案缩略图 | 不裁脸/手/产品 Logo |
| **Echo 错位重影** | 复制一层，偏移 2–6px，降低透明度/通道色 | 标题、封面、警示标签 | 幅度小；不要全站使用 |
| **Mask Reveal 遮罩揭示** | `mask-image` 圆孔/线性渐变；`clip-path: inset()` | 转场、首屏、图片入场 | 内容不能被永久遮挡 |
| **Line Draw 线稿绘制** | SVG `pathLength=1` + dashoffset | 雷达、地图、HUD | 只在进入视口时播放一次 |
| **Field Morph 场变形** | gooey 圆点、粒子螺旋、正弦线场 | Hero、加载、章节切换 | 成本高；1 个标志点即可 |

**组合规则**

- 一页只选 **1 套主变换语法**（例如“切片 + 遮罩揭示”），其他都是微反馈。
- 一个母题只配 **1 种主运动**。同心圆不要又旋转又缩放又变色。
- 切片边缘必须与版式有关：沿人物轮廓、分栏比例、数据面板边界，而不是随机斜切。
- 叠层卡片要保留一层“纸/黑底”作为夹层，制造厚度；不要只靠阴影。

#### 斜切分屏 + 叠层（rahoo 封面语法）

```css
.split {
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  background: #0b0b0b;
  overflow: clip;
}
.split__art {
  clip-path: polygon(0 0, 100% 0, 82% 100%, 0 100%);
  overflow: clip;
}
.split__art img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.02); }
.split__tape {
  position: absolute; left: 54%; top: -12%;
  width: 120px; height: 130%;
  transform: rotate(-32deg);
  background: var(--accent);
  color: var(--accent-ink);
  font: 700 11px/1 var(--font-mono);
  letter-spacing: .14em;
  display: grid; place-items: center;
  white-space: nowrap;
  z-index: 2;
}
```

再叠加 2–3 个错位画框：

```css
.plate { position: absolute; inset: 8% 10%; border: 1px solid rgba(255,255,255,.3); transform: rotate(-5deg) translate(-14px, 8px); }
.plate:nth-child(2) { transform: rotate(4deg) translate(18px, -10px); opacity: .5; }
```

进入视口时只让最上层图片 `scale(1.06) → 1`，其他层保持静止；悬停时叠层展开 4px，不要整体旋转。

### 8.6 编排模板

#### 模板 A：Hero「实验样本」（ignoredone 式）

1. **0–200ms**：固定背景与遮罩出现；遮罩上已有 2 个静态洞口，避免首帧空白。
2. **120–700ms**：线场从 0 透明度淡入（不逐条绘制，太慢）。
3. **200–900ms**：圆点从中心向外扩散；标志级只此一次。
4. **350–1000ms**：主标题打字或 `clip-path` 上翻；副标题最后 120ms 出现。
5. **700–1100ms**：玻璃工具栏/CTA 从下方 14px 进入；随后允许鼠标排斥与暖光跟随。
6. **常驻**：点阵呼吸 + 线场极慢漂移；两者都低对比。

静态兜底：无 JS 时直接显示背景、标题、CTA，隐藏圆点与线场。

#### 模板 B：Dossier「仪表盘」（rahoo 式）

1. 进入视口：左侧图像 `clip-path` 从右向左揭示 700ms。
2. 同段：右侧元数据逐行出现，间隔 50ms；不要做逐字打字。
3. 雷达图/刻度圆开始绘制；数字从 0 到目标值 900ms。
4. 鼠标在图像上做 ±3px 视差；离开复位。
5. 不再加粒子、发光、扫描线。这个区块的主角是“角色 + 数据”。

#### 模板 C：章节转场「信号切换」

- 用一条纯信号色板从左侧 `clip-path`/`translateX` 擦入，600ms；上面压章节英文与索引；随后整页从深色切到纸白。
- 只做 1–2 次；不要每个 section 都擦。
- 转场期间禁止同时运行三个以上动画；旧内容先淡出 150ms，再进入新内容。

#### 模板 D：索引轨「机械抽屉」

- 卡片从 `translateY(16px)` + 透明度进入，stagger 50–70ms。
- 当前项用信号色 3px 竖条标记；hover 图片 scale 1.02；切换时轨道用 `transform` 平移，不用 `scrollLeft` 补间。
- 键盘左右切换；触屏用原生横向滑动 + `scroll-snap`。

### 8.7 性能、降级与可访问性

**性能预算**

- 动画只改 `transform / opacity / clip-path / filter`；不要动 `top/left/width/height` 触发布局。
- `will-change` 只在 hover/进入视口时加，结束后移除；不要全站常驻。
- `backdrop-filter` 只用于小面积（音波条、工具栏），不要全屏玻璃。
- 大面积 SVG filter / gooey 只用于一个 hero 区块；移动端默认关闭。
- Three.js / Canvas：DPR ≤ 2；离屏暂停；标签页隐藏暂停；线段数 ≤ 20，段数 ≤ 200。
- 用 `IntersectionObserver` 触发一次性动画；不要持续监听 `scroll` 计算布局。
- 动画帧内先读后写；批量读取 `getBoundingClientRect()`，避免强制重排。

**技术选型**

| 需求 | 首选 | 适用 | 不要 |
|---|---|---|---|
| 状态反馈、悬停、简单入场 | CSS transition / animation | 90% 的界面动效 | 为一个淡入引入动画库 |
| 精确编排、暂停/倒放、帧同步 | Web Animations API | 加载序列、帧步进、可中断转场 | 用 `setTimeout` 串动画 |
| 复杂时间线 / 滚动编排 | GSAP + ScrollTrigger（仅必要时） | 多元素叙事、可逆滚动、钉住段落 | 用 GSAP 做按钮 hover |
| React 组件动效 | Framer Motion / Motion One | 列表进出、布局动画、手势 | 在 render 内创建动画实例 |
| 简单错峰循环 | anime.js | 圆点扩散、音波条、独立循环 | 全站只为一个循环引入 |
| 3D / 大量粒子 / 流体 | Three.js / OGL / PixiJS | 线场、双螺旋、点云、WebGL 变形 | 用 Three.js 做普通排版 |

**React 特别注意**

- 在 `useEffect` 中创建并清理 WAAPI/GSAP/Three 实例；不要每次 render 重建。
- 用 `useReducedMotion()` / `matchMedia` 控制变体；服务端渲染时不要直接访问 `window`。
- 布局动画优先 CSS `transform`，不要用 React state 驱动每帧位置。
- 列表 stagger 用 CSS 变量 `--i` 或 motion variants，不要 map 里写 50 个 `setTimeout`。

**兼容性备注**

- 多洞 `mask-image` 合成在旧 Safari/Firefox 上可能不一致；降级为单个大洞或 inline SVG `<mask>`。
- `backdrop-filter` 在没有 GPU 加速的环境会退化；始终保证不加模糊也能读。
- SVG filter 对大面积元素可能触发整层重绘；把滤镜区域限制在 ≤ 50% 视口，并提供无滤镜版本。

**降级顺序**

1. `prefers-reduced-motion: reduce`：关闭所有非必要动画，只保留即时状态切换；圆点/线场显示静态帧。
2. 粗指针（触屏）：关闭磁吸、透视、蒙版跟随；保留点击反馈和一次入场。
3. 低性能/省电模式：关闭 SVG filter、backdrop-filter、Three.js；用 CSS 渐变母题替代。
4. JS 失败：内容完整可见，不依赖动画类名显示；图形作为 `aria-hidden` 背景。

**可访问性**

- 所有装饰图形 `aria-hidden="true"`；重要数据（数值、状态）在 DOM 中可读。
- 不给正文使用循环打字；循环文字提供静态可读版本。
- 闪烁不超过 3 次/秒；扫描线要慢、低对比。
- 视频静音、有 poster、可暂停；自动播放不阻止阅读。
- 动效不能是唯一的状态提示：状态需同时有文字/图标/颜色。
- 页面转场不阻塞焦点；转场后焦点落到新页面标题或主内容。

### 8.8 动效验收（录屏）

用 1440×1000 与 390×844 各录 10 秒：

- [ ] 首屏 1.5 秒内能读到主张；动效没有延迟内容出现。
- [ ] 同时运动的区域 ≤ 2 个；没有“每个元素都在动”。
- [ ] 循环动画接缝不可见；点阵/线场没有突然跳帧。
- [ ] 鼠标离开后磁吸/倾斜在 400ms 内复位。
- [ ] 关闭“减少动态效果”后，页面依然完整、有层级。
- [ ] 标签页切回时没有时间跳跃或动画堆积。
- [ ] 移动端没有滤镜卡顿、横向溢出、滚动劫持。
- [ ] 录屏中没有任何动画遮挡正文超过 200ms。

---

## 9. 响应式：重排，不是缩小

**断点建议**：`480 / 768 / 1024 / 1440 / 1920`。

| 区间 | 策略 |
|---|---|
| < 768 | 单列；主图满幅；导航收为顶部 48–56px 或底部 dock；标题 `clamp(2.6rem, 14vw, 4rem)`；隐藏非必要 HUD；正文 16px |
| 768–1023 | 两列或主图背景化；左轨改成顶部栏；保留 1–2 个元数据 |
| ≥ 1024 | 13 列/左轨 + 内容；大图越界；标题可到 10vw；保留技术标签 |
| ≥ 1600 | 保持最大内容宽度，让影像继续向视口外延伸，不要无限放大文字 |

**移动端必须检查**

- 使用 `100svh`，避免浏览器工具栏导致内容被裁。
- 主图换成竖构图或重新裁切焦点，不能只是 `object-fit: cover` 把人物头裁掉。
- 可点击区域 ≥ 44×44px；下载/预约按钮置底时留 `env(safe-area-inset-bottom)`。
- 横向滚动条只出现在索引轨内部，页面本身不能横向溢出。
- 大标题换行要手动控制 `br` 或 `text-wrap: balance`，不要出现孤字/断词。
- 隐藏的 hover 信息必须在移动端有替代展示（始终显示或点击展开）。
- **动态降级**：< 768 默认关闭 SVG gooey、Three.js 线场、指针跟随、全屏 backdrop-filter；只保留一次入场 + 一个低对比环境循环（如 CSS 点阵）。
- 触屏交互优先“点按/滑动”反馈，不做“悬停才出现”的信息，不做“鼠标位置驱动”的视觉。
- 横向索引轨用原生 `overflow-x` + `scroll-snap`，不要用 JS 模拟滚动；拖拽结束要有惯性/吸附。
- 竖屏主视觉若必须保留复杂图形，把它移到内容下方作为静态图，不要盖住标题。

**动效分级（按视口）**

| 视口 | 允许 | 禁止 |
|---|---|---|
| < 768 | 淡入、clip-path 揭示、CSS 点阵/圆环慢转、按钮反馈 | 融球、Three.js、全屏模糊、指针透视、复杂遮罩洞 |
| 768–1023 | 上述 + 单层 SVG 线稿绘制、轻量视差（≤ 8px） | 大面积 gooey、多簇粒子 |
| ≥ 1024 | 全部，但仍需遵守“一个标志级”和“同时 2 个运动区域” | 滚动劫持、全屏鼠标光圈、超过 2 层视差 |

---

## 10. 文案与技术符号系统

**推荐英文标签**（短、可复用）：

`INDEX / INFORMATION / OPERATOR / WORLD / MEDIA / ARCHIVE / NOTICE / SYSTEM / DEPLOY / RECORD / FIELD / LOG`

**层级格式**

```text
[ 01 ]  //  OPERATOR FILE
干员档案
SI // 01
阵营 / FACTION      ——
状态 / STATUS       ACTIVE
日期 / DATE         2026.10.25
```

**规则**

- 英文眉题最多 4 个词，全大写，字距拉开；中文标题紧随其后，字号更大。
- 索引统一两位：`01 / 06`、`010`，不要同页混用 `1`、`01`、`001`。
- 日期统一 `YYYY.MM.DD`；状态用 `[ LIVE ]`、`[ ARCHIVED ]`、`[ SECURED ]`。
- 斜线、括号、编号必须有含义：分组、状态、序列。不要为了“科技感”把 `/// // []` 塞满。
- 正文写人话：一句主张 + 2–4 句解释。不要用假大空的“次世代”“赋能”“重构想象”。
- 中文为主时，英文是辅助标签；英文为主时，中文用于世界观标题。不要让两种语言争夺主标题。
- 没有真实数据就不要编造百分比、评分、下载量；用定性状态代替。

---

## 11. 无素材 / 原创素材策略

**没有角色立绘时，优先做 ARK 排版驱动模式**

- 巨大裁切字 + 蓝图线稿 + 深色场 + 一条青蓝扫描线。
- 用原创 SVG 绘制地形等高线、机械剖面、坐标网格、圆环刻度。线稿比假二次元角色更可信。
- 使用有版权的抽象摄影/材质（纸张、金属、混凝土），做去饱和/单色处理。
- 用 CSS 生成点阵、线性渐变、遮罩；不要用低质 AI 动漫图硬凑 IP 感。

**有主视觉时**

- 人物视线/动作方向要朝向内容区，而不是背对文字。
- 主图至少越出栅格一侧；不要让角色像贴纸一样被框在卡片中央。
- 文本压在画面安静区域（天空、墙面、暗部），必要时用渐变遮罩。
- 需要裁切时，优先保脸、手、武器/产品轮廓；宁可切掉边缘，不要切断关节。
- 去饱和、叠色、局部对比三选一；不要同时加五种滤镜。

**品牌安全**

- 不使用鹰角/明日方舟/终末地的 Logo、角色、专有术语组合与官方素材。
- 不冒充官网、不写“官方”字样、不使用官方域名视觉。
- 在作品说明中标注“设计语言研究 / 非官方概念稿”，避免误导。

---

## 12. 反模式：一出现就掉价

- 紫色/蓝色大面积模糊渐变，或“AI 极光”背景。
- 玻璃拟态卡片、24px 大圆角、柔软投影、悬浮胶囊堆叠。
- 每个 Section 都是居中标题 + 三张圆角卡片。
- 三种以上强调色；酸性黄、青蓝、品红同时出现。
- 全大写小字写正文；中文正文小于 14px；字距过大导致难读。
- 无意义的 HUD：随机坐标、乱码、扫描线盖住文字、`[ ERROR ]` 装饰。
- 把“斜切”和“切角”用到每个卡片，页面像电竞外设包装。
- 全屏动画/滚动劫持导致用户无法到达页脚。
- 用假数据、假评价、假许可证营造“真实感”。
- 直接复制参考站的 Logo、角色、图标、文案或下载按钮配色（平台品牌色除外）。
- 为了“高级”把正文对比度降到 2:1；为了“未来感”牺牲可读性。
- **每个 section 都在动**：背景呼吸 + 标题漂移 + 卡片逐个弹入 + 粒子 + 扫光同时进行。
- **把 ignoredone 的实验效果当主题公园**：融球、双螺旋、音波、蒙版洞、线场全部堆在首屏。
- **把 rahoo 的图形库当贴纸包**：17 种图元全用一遍，画面变成素材拼盘。
- 全屏 `backdrop-filter`、大面积 SVG gooey 滤镜、每帧重写 `mask-image`；没有性能降级。
- 滚动劫持、全屏自定义光标无触屏替代、动画延迟导航、加载器超过 1.5 秒。
- 文字逐字打印到正文段落；每个标题都用打字机；每个 hover 都旋转 360°。
- 用“随机坐标/乱码/假 HUD 数字”冒充技术感；用虚假系统状态制造“高级”。
- 图形变换没有语义：随机切角、随机透视、随机遮罩，和内容毫无关系。

---

## 13. 验收清单（发布前逐项过）

### 识别度

- [ ] 缩到 50% 截图，仍能看出这是“工业编辑档案”，而不是通用深色官网。
- [ ] 去掉 Logo 和品牌名后，视觉语言仍成立。
- [ ] 页面有且只有一个视觉中心；第一屏能在 3 秒内说出主张。
- [ ] 信号色面积 ≤ 5%，且只承担动作/状态/关键数字。
- [ ] 至少有一个可记住的标志装置（巨字/切角/黄色板/蓝图/索引轨），但没有堆满。

### 布局与排版

- [ ] 320 / 390 / 768 / 1024 / 1440 / 1920 无横向溢出。
- [ ] 移动端首屏使用 `100svh`；人物/产品焦点没有被裁掉。
- [ ] 只有一个 `h1`；标题层级连续。
- [ ] 中文正文每行 28–36 字；英文 60–70ch；长文有舒适行高。
- [ ] 大标题换行自然，没有孤字、孤词、半个词。
- [ ] 图片有明确的 `alt`；装饰性图像 `alt=""` 且不进入可访问树。
- [ ] 图标按钮都有 `aria-label`；桌面 hover 提示在触屏有替代。

### 可访问性

- [ ] 正文对比度 ≥ 4.5:1；大字号 ≥ 3:1；黄色块内文字用深色。
- [ ] 键盘可到达所有交互；焦点环清晰（2px 信号色 + offset 4px）。
- [ ] `prefers-reduced-motion: reduce` 下所有内容可见、动画停止。
- [ ] 200% 缩放不丢内容、不重叠。
- [ ] 视频静音、有 poster、可暂停；自动播放不携带声音。
- [ ] 没有仅靠颜色传达的状态（同时用文字/图标）。

### 图形与动效

- [ ] 页面只有 2 个主图形母题，且在不同区块有复用/尺度变化，不是每个 section 新画一套。
- [ ] 每个图形都能说明“它在模拟什么”：扫描、归档、测量、通信、部署、解析。
- [ ] 全页只有 1 个标志级动效；环境/反馈/叙事各不超过规定数量。
- [ ] 同一时刻运动区域 ≤ 2；没有元素为了动而动。
- [ ] 关闭动画后，画面仍然像完整的技术界面；图形不依赖动画才“成立”。
- [ ] 鼠标/触屏反馈 240ms 内完成；离开后 400ms 内复位。
- [ ] 页面转场 ≤ 600ms，不阻塞用户；取消动画后仍能正常导航。
- [ ] 录屏中没有循环接缝、时间跳跃、焦点丢失；标签页隐藏时动画暂停。
- [ ] 没有全屏 gooey、全屏 backdrop-filter、超量粒子；移动端按分级关闭重效果。
- [ ] 数值/雷达/线稿的重要信息同时存在于 DOM 文本，不仅存在于 Canvas/SVG。

### 性能与工程

- [ ] 首屏主图使用 AVIF/WebP + `srcset`；非首屏 `loading="lazy"` + 尺寸占位。
- [ ] 视频 `preload="metadata"`、`playsinline`、`muted`；不在移动端自动下载大文件。
- [ ] 无布局抖动（CLS）；字体有合理回退；不等字体加载才显示正文。
- [ ] JS 只保留必要交互；无大型动画库仅为一个淡入。
- [ ] Lighthouse 移动端 Performance / Accessibility ≥ 90（内容型页面目标）。
- [ ] 控制台无 404、无未处理异常。

### 内容

- [ ] 无 lorem ipsum、无“待补充”、无假数据。
- [ ] 英文标签拼写正确；中英文语气一致。
- [ ] 每个链接有明确去向；CTA 文案是动词。
- [ ] 所有引语/数据有来源或明确标注为示例。
- [ ] 没有未经授权使用第三方 IP 素材。

---

## 14. 完成定义（Definition of Done）

一个页面只有同时满足以下条件才算完成：

1. **不看说明也能懂**：首屏主张、下一动作、页面结构在 3 秒内成立。
2. **有识别度**：黑白灰 + 单一信号色 + 双语技术层级 + 硬质界面，四者至少三者清晰。
3. **内容真实**：文案可发布，不是占位符；数据有来源或标注示例。
4. **响应式成立**：390px 是重新构图，不是桌面缩小；无溢出、无裁切事故。
5. **动效克制**：环境/反馈/叙事/标志四层各有明确机制；标志级只出现一次；减少动态效果后仍完整。
6. **图形有语法**：2 个母题 + 1 套变换语法贯穿全页；每个图形有信息角色，不是贴纸。
7. **可访问**：键盘、对比度、焦点、alt、reduce motion 全部过关；装饰图形不进入可访问树。
8. **性能达标**：首屏不依赖大视频；重滤镜/3D 有降级；图片有尺寸和懒加载；移动端可用。
9. **原创合规**：没有复制第三方 Logo、角色、图标、原文案；必要时标注非官方概念稿。

> 最后一次检查：**删掉最花的那 10%。** 如果删掉后页面更清楚，说明它本来就不该在。

---

## 15. 参考来源（只做语言研究）

- Arknights 官网：<https://ak.hypergryph.com/>
- Arknights: Endfield 官网：<https://endfield.hypergryph.com/>
- ignoredone's space（动态实验）：<https://www.ignoredone.space/>
- rahoo.online（封面 / 图形生成器）：<https://rahoo.online/>

**从参考站观察到的关键实现线索（供灵感，不要照搬）**

- ENDFIELD 桌面端使用约 120px 固定左轨、纸白 `#f2f2f2`、酸性黄 `#fffa00`、石墨 `#191919`、4–6px 小圆角与胶囊按钮；大量 1px 分隔线、黄色章节板、切角卡片、圆形翻页按钮、巨大越界插画。
- ARK 首页是固定全屏舞台：纯黑外框、青蓝 `#18d1ff` 信号、巨幅裁切字、蓝图/手稿底、顶部双语导航、右侧下载抽屉、0–2px 硬边。
- ignoredone 的动态实验使用 `#FFDE00` 黄色 + 黑/白：固定背景图、半透明白色遮罩、`mask-image` 圆孔、SVG gooey 融球、16 个螺旋扩散圆点、30 根玻璃音频条、18 条 Three.js 正弦线、三层点阵呼吸、打字机标题、玻璃工具栏。核心不是效果数量，而是**每层都可独立关闭、都服务于同一个“液态档案”叙事**。
- rahoo 的素材面板列出 17 个图形母题：`concentricCircle / halftone / hudLines / scaleCircle / barcode / waveTexture / linePattern / dotMatrix / polygonGrid / contour / normalShape / nestedPolygons / globeSphere / squareGrid / rays / y2kRing / ringArray`；封面与通行证工具使用斜切分屏、叠层画框、条形码、透视参数、雷达图和强对比色块。
- 四站共用的不是某个组件，而是**编辑层级 + 图形语法**：英文系统标签、中文叙事标题、等宽编号、极窄/极宽对比、影像主导、界面退后；动态只负责让这些“技术对象”进入工作状态。

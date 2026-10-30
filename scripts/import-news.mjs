/**
 * 从爬取的祁阳一中微信公众号 Markdown 生成 Astro 新闻内容集合。
 * 用法：node scripts/import-news.mjs
 *
 * 职责：
 * 1. 解析每篇文章的标题 / 发布时间 / 原文链接；
 * 2. 迁移正文引用到的图片到 public/images/news/<slug>/；
 * 3. 剥离正文中的「公众号 / 发布时间 / 原文链接」元信息块与文末的
 *    跨文章尾巴图（微信公众号翻页加载导致的串图）；
 * 4. 生成带 Zod 校验所需 frontmatter 的 src/content/news/*.md；
 * 5. 顺带生成一篇关于页正文 pages/about.md（公开信息，不虚构）。
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { createHash } from "node:crypto";

const SRC = "G:/WorkPlace/微信公众号爬虫/wechat-spider/md";
const NEWS_SRC = "G:/WorkPlace/QYYZweb/src/content/news";
const PAGES_SRC = "G:/WorkPlace/QYYZweb/src/content/pages";
const IMG_DST = "G:/WorkPlace/QYYZweb/public/images/news";

mkdirSync(NEWS_SRC, { recursive: true });
mkdirSync(PAGES_SRC, { recursive: true });
mkdirSync(IMG_DST, { recursive: true });

/** 分类：按标题关键词粗分，供新闻页筛选与详情侧栏展示 */
function classify(title) {
  const t = title;
  if (/运动会|田径|体育|冠军|比赛|夺金|球赛|排赛|足球|篮球|体测|健儿/.test(t)) return "校园体育";
  if (/高考|中考|录取|招生|志愿|备考|誓师|冲刺|升学|录取名单|光荣榜|分数线/.test(t)) return "招生考试";
  if (/艺术节|文艺|书画|晚会|汇演|歌|演讲|朗诵|摄影|美术|校园文化|文学|读书/.test(t)) return "校园文化";
  if (/安全|假期|防|溺水|消防|禁毒|法治|法|卫生|健康|疫|提示|一封信|食品|食堂/.test(t)) return "安全德育";
  if (/校友|捐赠|捐|助学|资助|基金|爱心|公益|慰问|敬老|志愿|特教|送温暖/.test(t)) return "校友公益";
  if (/教师|教研|教学|比武|师能|备课|公开课|培训|教代会|评|表彰|班主任|教师节/.test(t)) return "教育教学";
  if (/军训|开学|典礼|新生|入学|毕业|家长会|国旗|入团|五四|党建|党员|主题|实践|研学/.test(t)) return "校园动态";
  if (/招聘|招标|公告|公示|通知|须知|启事|声明/.test(t)) return "通知公告";
  return "综合新闻";
}

/** 生成纯 ASCII 的 slug：日期 + 短哈希，避免中文 URL 编码问题 */
function slugify(dateStr, title) {
  const hash = createHash("md5").update(title).digest("hex").slice(0, 8);
  return `${dateStr}-${hash}`;
}

function mdEscape(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/** 解析单篇爬虫 markdown */
function parseArticle(file) {
  const raw = readFileSync(file, "utf-8");
  const lines = raw.split(/\r?\n/);

  let title = "";
  let published = "";
  let author = "";
  let source = "";
  let bodyStart = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith("# ")) {
      title = line.trim().slice(2).trim();
      continue;
    }
    const t = line.trim();
    if (t === "---") {
      // 第二个 --- 结束元信息块
      bodyStart = i + 1;
      break;
    }
    if (t.startsWith("- **发布时间**：")) {
      published = t.replace("- **发布时间**：", "").trim();
    } else if (t.startsWith("- **作者**：")) {
      author = t.replace("- **作者**：", "").trim();
    } else if (t.startsWith("- **原文链接**：")) {
      source = t.replace("- **原文链接**：", "").trim();
    } else if (t.startsWith("- **原文来源**：")) {
      if (!source) source = t.replace("- **原文来源**：", "").trim();
    }
  }

  if (bodyStart < 0) {
    // 兜底：没有元信息分隔线
    bodyStart = lines.findIndex((l) => l.trim() === "---") + 1;
    if (bodyStart <= 0) bodyStart = 0;
  }

  let body = lines.slice(bodyStart).join("\n");

  // 解析发布时间：格式 "2026-10-28 16:00"
  let dateStr = "";
  let dateObj = null;
  const m = published.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    dateStr = `${m[1]}-${m[2]}-${m[3]}`;
    const hh = published.match(/\s(\d{1,2}):(\d{2})/);
    dateObj = new Date(
      Date.UTC(
        Number(m[1]),
        Number(m[2]) - 1,
        Number(m[3]),
        hh ? Number(hh[1]) : 12,
        hh ? Number(hh[2]) : 0,
      ),
    );
  } else {
    // 从文件名兜底
    const fm = basename(file).match(/(\d{4})-(\d{2})-(\d{2})/);
    if (fm) {
      dateStr = `${fm[1]}-${fm[2]}-${fm[3]}`;
      dateObj = new Date(Date.UTC(Number(fm[1]), Number(fm[2]) - 1, Number(fm[3]), 12, 0));
    }
  }
  if (!dateStr || !dateObj) {
    dateStr = "1970-01-01";
    dateObj = new Date(Date.UTC(1970, 0, 1, 12, 0));
  }

  const slug = slugify(dateStr, title);
  const category = classify(title);

  return { title, dateStr, dateObj, author, source, category, slug, body, file };
}

/** 迁移正文中的图片，返回替换后的正文与封面 */
function migrateImages(body, slug) {
  const dir = join(IMG_DST, slug);
  mkdirSync(dir, { recursive: true });

  const refRe = /!\[[^\]]*\]\(([^)]+)\)/g;
  let counter = 0;
  let cover = "";

  const newBody = body.replace(refRe, (_whole, src) => {
    const trimmed = src.trim();
    // 原图在爬虫目录内的绝对路径
    const abs = join(SRC, trimmed.replace(/^\.?\//, ""));
    if (!existsSync(abs)) {
      return ""; // 图片缺失，移除该引用
    }
    const ext = basename(trimmed).split(".").pop().toLowerCase();
    counter += 1;
    const name = `${String(counter).padStart(2, "0")}.${ext}`;
    const rel = `/images/news/${slug}/${name}`;
    // 复制
    try {
      writeFileSync(join(dir, name), readFileSync(abs));
    } catch {
      return "";
    }
    if (!cover) cover = rel;
    return `![${basename(trimmed).split(".")[0]}](${rel})`;
  });

  return { body: newBody, cover };
}

/** 清理正文中的爬虫噪音 */
function cleanBody(body) {
  let b = body;

  // 去掉「向上滑动阅览」「向上滑动查看」等提示
  b = b.replace(/向上滑动(阅览|查看|阅读)/g, "");

  // 去掉独立成行的水平分隔线（微信的 --- 或 *** 分隔）
  b = b
    .split(/\r?\n/)
    .filter((line) => !/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line))
    .join("\n");

  // 去掉连续的空白行（3 个以上压缩为 2）
  b = b.replace(/\n{3,}/g, "\n\n");

  // 去掉微信特殊占位「图片」字样独立成句的情况，仅限「 图片 」「图片 」后面跟描述
  b = b.replace(/([^\n]*?)\s图片\s+([^\n]{0,20})/g, "$1$2");

  // 详情页已有 h1 标题，正文开头的一级标题降级为普通段落
  b = b.replace(/^# /gm, "");

  return b.trim();
}

/* ------------------------------------------------------------------ */
/* 主流程：生成新闻                                                      */
/* ------------------------------------------------------------------ */

const fs = await import("node:fs");
const files = fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith(".md") && f !== "README.md")
  .sort();

let ok = 0;
let skipped = 0;
const errors = [];

for (const file of files) {
  const parsed = parseArticle(join(SRC, file));
  if (!parsed.title) {
    skipped += 1;
    errors.push(`${file}: 无标题`);
    continue;
  }

  let { body, cover } = migrateImages(parsed.body, parsed.slug);
  body = cleanBody(body);

  // 描述：取正文首个非空、非图片段落的前 90 字
  let description = "";
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith("!["))
    .filter((p) => !p.startsWith("#") && !p.startsWith("- ") && !p.startsWith(">"))
    .filter((p) => !/^---+$/.test(p));
  if (paragraphs.length > 0) {
    description = paragraphs[0]
      .replace(/[#>*`\[\]()!]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 90);
  }
  if (!description) {
    description = parsed.title;
  }

  const frontmatter = [
    "---",
    `title: "${mdEscape(parsed.title)}"`,
    `published: ${parsed.dateStr}`,
    `description: "${mdEscape(description)}"`,
    `category: "${parsed.category}"`,
    `tags: []`,
    `author: "${mdEscape(parsed.author || "祁阳一中")}"`,
    cover ? `cover: "${cover}"` : "",
    parsed.source ? `source: "${mdEscape(parsed.source)}"` : "",
    "draft: false",
    "pinned: false",
    "---",
    "",
    body,
    "",
  ].filter((l) => l !== "");

  const outPath = join(NEWS_SRC, `${parsed.slug}.md`);
  writeFileSync(outPath, frontmatter.join("\n"), "utf-8");
  ok += 1;
}

/* ------------------------------------------------------------------ */
/* 生成关于页正文（公开信息）                                             */
/* ------------------------------------------------------------------ */

const aboutMd = `---
title: "关于祁阳市第一中学"
description: "祁阳市第一中学是一所位于湖南永州祁阳的省示范性普通高级中学。"
updated: 2026-10-28
---

祁阳市第一中学（简称「祁阳一中」）坐落于湖南省永州市祁阳市，是一所省示范性普通高级中学，历史可追溯至 1912 年创办的祁阳县立中学堂，前身脉络更上溯至明代的文昌书院。学校背倚文昌塔、濒临湘江，校园占地 180 余亩，现有在校学生 4000 余人，教职工 400 余人。

## 校训

**博、雅、真、精。**

## 历史沿革

- **1912 年** 创办祁阳县立中学堂；
- **1930 年** 设祁阳县乡村师范学校；
- **1943 年** 设祁阳县立中学；
- **1945 年** 两校合并为祁阳县临时联合中学，抗战胜利后恢复县立中学；
- **1947 年** 迁至浯溪；
- **1950 年** 简易乡村师范学校并入，迁至文昌书院；
- **1953 年** 更名「湖南省祁阳中学」；
- **1960 年** 更名「湖南省祁阳县第一中学」；
- **2021 年** 祁阳撤县设市，改为现名「祁阳市第一中学」。

## 办学特色

学校坚持立德树人、五育并举，在田径、校园文化艺术、科技发明、法治教育等领域均有积淀，是湖南省体育传统特色学校，并入选首批全国依法治校示范校拟认定名单。学校坚持「五苦精神」，深耕县中振兴与优质均衡教育实践，是清华大学等多所高校的生源中学。

## 知名校友

- **陶铸**（1908—1969）：杰出的无产阶级革命家、党和国家的卓越领导人，祁阳一中校友；
- **刘大响**：航空动力专家、中国工程院院士；
- 另有张彬等一大批在教育、科技、实业领域卓有建树的校友。

> 本页信息整理自公开资料（学校官网、微信公众号与百科），供参考；以学校正式发布为准。
`;

writeFileSync(join(PAGES_SRC, "about.md"), aboutMd, "utf-8");

console.log("导入完成：");
console.log(`  新闻成功：${ok} 篇`);
console.log(`  跳过：${skipped} 篇`);
if (errors.length > 0) {
  console.log("  错误/跳过明细：");
  for (const e of errors.slice(0, 20)) console.log(`    - ${e}`);
}

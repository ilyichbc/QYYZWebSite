# SEO、RSS 与部署

## 功能

- 每页 title / description / canonical / robots；
- Open Graph、Twitter Card；
- 默认 OG 图（可用 `pnpm og` 重新生成）；
- 首页 WebSite 结构化数据，文章页 BlogPosting；
- RSS、Sitemap、robots.txt；
- GitHub Pages Actions 工作流；
- 支持根路径与项目子路径部署。

## 配置入口

`src/config.ts`：

```ts
siteURL: "https://example.com/", // 只填根地址
basePath: "/",                    // 子路径
seo: {
  titleTemplate: "%s — 星迹线 Astrorbit",
  ogImage: "/images/og-default.jpg",
  twitterCard: "summary_large_image",
  robots: "index, follow",
},
```

## 实现

### Head

`src/layouts/partials/Head.astro`：

- `pageTitle`：首页用「名称 + 拉丁名 — tagline」，其它页用 `titleTemplate`；
- `canonical`：`new URL(Astro.url.pathname, siteURL)`，pathname 已包含 base path；
- `description` / `keywords`（仅首页）/ robots；
- `og:*` / `twitter:*`，OG 图使用绝对 URL；
- `link rel="alternate"` 指向 RSS；
- favicon（跟随 base path / CDN）；
- `theme-color` 浅色 / 深色；
- 内联主题 CSS 与初始化脚本；
- JSON-LD：WebSite 或 BlogPosting。

`BaseLayout` 接收 `pageType`，文章页传 `article` 元信息（发布时间、更新时间、作者）。

### RSS

`src/pages/rss.xml.ts`：

- channel `site` 为 `withBase("/")` 的绝对地址；
- item link 为文章绝对 URL（含 base path）；
- 包含 title / description / pubDate / categories / author；
- 语言来自 `siteConfig.lang`。

### robots

`src/pages/robots.txt.ts`：

```text
User-agent: *
Allow: /

Sitemap: <absolute url to sitemap-index.xml>
```

Sitemap 由 `@astrojs/sitemap` 生成，`site` + `base` 自动带子路径。

### 404

`src/pages/404.astro`：

- `noindex`；
- 整幅天空图 + 深色遮罩；
- 返回首页 / 新闻；
- GitHub Pages 会使用仓库根的 `404.html`。

### GitHub Actions

`.github/workflows/deploy.yml`：

1. checkout；
2. pnpm 10 + Node 22；
3. `pnpm install --frozen-lockfile`；
4. `pnpm check`；
5. `pnpm build`；
6. `actions/configure-pages` + `upload-pages-artifact`；
7. `actions/deploy-pages`。

启用方式：仓库 Settings → Pages → Source 选择 GitHub Actions。

### 根路径 / 子路径

| 场景            | siteURL                   | basePath      |
| --------------- | ------------------------- | ------------- |
| 自定义域名      | `https://example.com/`    | `/`           |
| 用户 / 组织主页 | `https://user.github.io/` | `/`           |
| 项目页          | `https://user.github.io/` | `/Astrorbit/` |

切换 `basePath` 后，导航、页脚、图片、RSS、robots、Markdown 内链都会自动调整。已验证：

- 构建输出路由仍在 `dist/` 根下；
- 页面链接 / 资源 / `_astro` 路径带 base；
- RSS / robots / sitemap 带 base；
- canonical 为 `https://example.com/Astrorbit/...`。

### 部署前检查

1. `siteURL` / `basePath` 是否正确；
2. `ogImage` 是否存在（`pnpm og`）；
3. `pnpm check` 和 `pnpm build` 通过；
4. 图片路径与 CDN 前缀；
5. RSS 与 sitemap 在预览服务中可访问；
6. 404 页面在托管平台生效。

## 可改进方向

1. 每篇文章独立 OG 图（Satori / Sharp 动态生成）。
2. Twitter / 微博等平台的分享卡片调试。
3. JSON-LD 增加 BreadcrumbList / Organization / WebSite SearchAction。
4. 增加 sitemap 的 `lastmod`、文章更新频率。
5. 增加 IndexNow / 百度站长提交脚本。
6. 部署后自动跑 Lighthouse CI。

# 图片、CDN 与懒加载

## 功能

- 所有站内图片统一通过 `resolveAsset()` 解析；
- 支持 CDN 前缀替代站内路径；
- 完整 URL 不受 CDN 前缀影响；
- 支持 GitHub Pages 子路径部署；
- 非首屏图片默认懒加载；
- 首屏图片（Banner / PageHero）显式 eager，作为 LCP 例外；
- Markdown 图片自动补同样的规则。

## 配置入口

`src/config.ts`：

```ts
imageConfig: {
  cdnPrefix: "",     // 例：https://cdn.example.com/studio
  lazy: true,
  eagerHero: true,
  decoding: "async",
}
```

图片文件放在 `public/images/`：

```text
public/images/
├── backgrounds/     # 页面 / 区块 / 文章头图
├── test/            # 测试素材（正式使用前替换）
└── og-default.jpg   # 默认 OG 图
```

## 实现

### `resolveAsset`

`src/utils/assets.ts:51`：

| 输入                               | 输出                                                              |
| ---------------------------------- | ----------------------------------------------------------------- |
| `https://cdn.example.com/a.jpg`    | 原样                                                              |
| `//cdn.example.com/a.jpg`          | 原样                                                              |
| `data:image/...`                   | 原样                                                              |
| `/images/a.webp`，`cdnPrefix` 为空 | `/images/a.webp`（根部署）或 `/Astrorbit/images/a.webp`（子路径） |
| `/images/a.webp`，`cdnPrefix` 有值 | `https://cdn.example.com/studio/images/a.webp`                    |
| `images/a.webp`                    | 先补 `/`，再按上面规则                                            |

`withBase()`（`src/utils/assets.ts:19`）负责 base path，且是幂等的：已经带 base 的路径不会重复拼接。

### `Image` 原子

`src/components/atoms/Image.astro`：

- 默认 `loading` 来自 `imageConfig.lazy`；
- `priority` 时 `loading="eager"`、`fetchpriority="high"`；
- 设置 `decoding`；
- 支持 `width` / `height`，建议首屏图填写以避免 CLS；
- 支持 `style`（例如 `object-position`）。

用法：

```astro
<Image
  src="/images/backgrounds/hero-clouds.webp"
  alt=""
  class="hero__bg"
  width={2400}
  height={1500}
  priority
  style="object-position: center 55%"
/>
```

### CSS 背景图

有两处背景图不是 `<img>`：

- 页脚：`Footer.astro` 用 `resolveAsset(bannerConfig.background)` 注入 `--footer-image`；
- 移动端菜单：`Navbar.astro` 用 `resolveAsset(bannerConfig.background)` 注入 `--menu-bg`。

它们属于装饰性背景，浏览器会在需要时加载；如果对性能非常敏感，可以改成 `<img>` + 遮罩。

### Markdown 图片

`src/plugins/rehype-site-enhance.mjs` 在构建时处理：

- `img[src]` 按 CDN / base path 解析；
- 加 `loading="lazy"`、`decoding`；
- `a[href]` 站内链接补 base path，站外链接加 target/rel。

## 懒加载与 LCP

- 首页 Banner、功能页 PageHero、文章头图、404 背景：`priority`（eager）。
- 首页区块背景、产品图、新闻封面、关于配图：懒加载。
- 页面头图是 LCP 元素，若也懒加载会拖慢首屏；因此保留这个例外，并在文档中明确。
- 所有背景图已压缩为 WebP（2400px 宽，质量 82）。

## 图片素材

- 背景图为二次元测试占位素材，授权信息见 [../image-credits.md](../image-credits.md)；正式上线前请替换。
- 产品 logo `public/images/test/sxwg-logo.webp` 来自星籁浮屿官网，正式上线前请替换或确认授权。
- OG 图由 `scripts/generate-og.mjs` 从 `hero-clouds.webp` 合成，运行 `pnpm og` 重新生成。

## 可改进方向

1. 用 `sharp` 生成多尺寸 `srcset`，按视口加载 1200 / 1800 / 2400。
2. 输出 AVIF + WebP 的 `<picture>`。
3. 为 Banner 提供桌面 / 手机不同裁切。
4. 自动生成 LQIP / blurhash 占位。
5. 在构建时检查配置里引用的图片是否存在。
6. 如果启用 CDN，提供 `images.remotePatterns` 或 CDN 预热脚本。

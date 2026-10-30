import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { imageConfig, siteConfig } from "./src/config";
import rehypeSiteEnhance from "./src/plugins/rehype-site-enhance.mjs";

export default defineConfig({
	site: siteConfig.siteURL,
	base: siteConfig.basePath,
	trailingSlash: "always",
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "viewport",
	},
	integrations: [sitemap()],
	markdown: {
		processor: unified({
			rehypePlugins: [
				[
					rehypeSiteEnhance,
					{
						cdnPrefix: imageConfig.cdnPrefix,
						basePath: siteConfig.basePath,
						lazy: imageConfig.lazy,
						decoding: imageConfig.decoding,
					},
				],
			],
		}),
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
		},
	},
});

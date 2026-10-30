import type { APIRoute } from "astro";

import { siteConfig } from "../config";
import { absoluteUrl, withBase } from "../utils/assets";

export const GET: APIRoute = () => {
	const sitemap = absoluteUrl(
		withBase("/sitemap-index.xml"),
		siteConfig.siteURL,
	);

	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};

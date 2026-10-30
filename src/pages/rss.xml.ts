import rss from "@astrojs/rss";

import { siteConfig } from "../config";
import { withBase } from "../utils/assets";
import { getNewsHref, getSortedNews } from "../utils/content";

export async function GET() {
	const entries = await getSortedNews();

	return rss({
		title: `${siteConfig.identity.name} ${siteConfig.identity.nameLatin}`,
		description: siteConfig.identity.description,
		site: new URL(withBase("/"), siteConfig.siteURL).toString(),
		items: entries.map((entry) => ({
			title: entry.data.title,
			description: entry.data.description,
			pubDate: entry.data.published,
			link: new URL(getNewsHref(entry), siteConfig.siteURL).toString(),
			categories: entry.data.tags,
			author: entry.data.author,
		})),
		customData: `<language>${siteConfig.lang.toLowerCase()}</language>`,
	});
}

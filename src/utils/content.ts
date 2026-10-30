import { getCollection, type CollectionEntry } from "astro:content";
import { withBase } from "./assets";

export type NewsEntry = CollectionEntry<"news">;

/** 已发布新闻，置顶优先，其余按发布日期倒序 */
export async function getSortedNews(): Promise<NewsEntry[]> {
	const entries = await getCollection("news", ({ data }) =>
		import.meta.env.PROD ? !data.draft : true,
	);

	return entries.sort((a, b) => {
		if (a.data.pinned !== b.data.pinned) {
			return a.data.pinned ? -1 : 1;
		}
		return b.data.published.getTime() - a.data.published.getTime();
	});
}

/** 用 UTC 避免构建机器时区导致的日期偏移 */
export function formatDate(
	date: Date,
	style: "full" | "short" = "full",
): string {
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");

	return style === "full" ? `${year}.${month}.${day}` : `${month}.${day}`;
}

/** 新闻详情路径 */
export function getNewsHref(entry: NewsEntry): string {
	return withBase(`/news/${entry.id}/`);
}

/** 分类列表，按出现次数排序 */
export function getNewsCategories(entries: NewsEntry[]): string[] {
	const counts = new Map<string, number>();
	for (const entry of entries) {
		const category = entry.data.category;
		if (category) {
			counts.set(category, (counts.get(category) ?? 0) + 1);
		}
	}
	return [...counts.entries()]
		.sort((a, b) => b[1] - a[1])
		.map(([name]) => name);
}

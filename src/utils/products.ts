import type { ProductItem } from "../types/config";
import { isExternalLink, withBase } from "./assets";

/**
 * 产品卡片的最终链接：
 * - 配置了完整外链时优先使用外链；
 * - 否则有 slug 时指向本地详情页 /products/<slug>/；
 * - 两者都没有时返回 undefined，卡片渲染为 article。
 */
export function getProductHref(item: ProductItem): string | undefined {
	const href = item.href?.trim();
	if (href) {
		return isExternalLink(href) ? href : withBase(href);
	}

	if (item.slug) {
		return withBase(`/products/${item.slug}/`);
	}

	return undefined;
}

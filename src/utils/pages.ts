import { siteConfig } from "../config";
import { withBase } from "./assets";
import type { FeatureKey, NavItem, PageEntry } from "../types/config";

export interface EnabledPage {
	key: FeatureKey;
	page: PageEntry;
}

/** 所有已启用的页面，按导航顺序排列 */
export function getEnabledPages(): EnabledPage[] {
	return (Object.entries(siteConfig.page) as [FeatureKey, PageEntry][])
		.filter(([, page]) => page.enabled)
		.sort((a, b) => a[1].navOrder - b[1].navOrder)
		.map(([key, page]) => ({ key, page }));
}

/** 主导航中的页面 */
export function getNavPages(): EnabledPage[] {
	return getEnabledPages().filter(({ page }) => page.inNav);
}

/** 主导航配置 + 额外链接（自动过滤关闭的功能页） */
export function getNavItems(): NavItem[] {
	const pageItems: NavItem[] = getNavPages().map(({ page }) => ({
		label: page.label,
		latin: page.latin,
		href: withBase(page.href),
		enabled: true,
	}));

	const extraItems = siteConfig.navbar.extraItems.filter((item) => {
		if (!item.enabled) {
			return false;
		}
		if (item.requiresFeature) {
			return siteConfig.page[item.requiresFeature].enabled;
		}
		return true;
	});

	return [...pageItems, ...extraItems].map((item) => ({
		...item,
		href: withBase(item.href),
	}));
}

/** 页脚等需要渲染的链接同样遵循功能页开关 */
export function filterNavItems(items: NavItem[]): NavItem[] {
	return items
		.filter((item) => {
			if (!item.enabled) {
				return false;
			}
			if (item.requiresFeature) {
				return siteConfig.page[item.requiresFeature].enabled;
			}
			return true;
		})
		.map((item) => ({ ...item, href: withBase(item.href) }));
}

/** 除首页外可以生成独立路由的功能页 */
export function getGeneratableFeaturePages(): EnabledPage[] {
	return getEnabledPages().filter(({ key }) => key !== "home");
}

/** 判断某个功能页是否启用 */
export function isFeatureEnabled(key: FeatureKey): boolean {
	return siteConfig.page[key].enabled;
}

/** 根据路径判断导航激活状态 */
export function isActivePath(currentPath: string, href: string): boolean {
	if (href === "/") {
		return currentPath === "/";
	}
	return currentPath === href || currentPath.startsWith(href);
}

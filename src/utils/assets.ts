import { imageConfig } from "../config";

function normalizeBase(value: string): string {
	const trimmed = value.trim();
	if (!trimmed || trimmed === "/") {
		return "/";
	}
	return `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
}

const BASE_PATH = normalizeBase(import.meta.env.BASE_URL ?? "/");

/**
 * 给站内链接补上部署子路径。
 * - 外部链接、mailto、tel、data、锚点原样返回；
 * - 已包含 base 的路径不会重复拼接；
 * - 根路径在子路径部署下会变成 base 本身。
 */
export function withBase(path: string): string {
	if (!path || path.startsWith("#")) {
		return path;
	}

	if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith("//")) {
		return path;
	}

	const normalized = path.startsWith("/") ? path : `/${path}`;

	if (BASE_PATH === "/") {
		return normalized;
	}

	if (normalized === BASE_PATH || normalized.startsWith(BASE_PATH)) {
		return normalized;
	}

	return `${BASE_PATH.slice(0, -1)}${normalized}`;
}

/**
 * 把站内资源路径转换为最终 URL。
 *
 * 规则：
 * - 空值返回空字符串；
 * - http(s)://、//、data:、blob: 等带协议的完整 URL 原样返回；
 * - 配置了 CDN 前缀时，站内路径拼到 CDN 前缀后；
 * - 未配置 CDN 时，站内路径补上部署子路径。
 * - 不以 / 开头的相对路径先补成站内绝对路径。
 */
export function resolveAsset(src: string | undefined | null): string {
	const value = (src ?? "").trim();
	if (!value) {
		return "";
	}

	if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//")) {
		return value;
	}

	const path = value.startsWith("/") ? value : `/${value}`;
	const prefix = imageConfig.cdnPrefix.trim().replace(/\/+$/, "");

	return prefix ? `${prefix}${path}` : withBase(path);
}

/** 判断是否为站外链接 */
export function isExternalLink(href: string): boolean {
	return (
		/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(href) || href.startsWith("mailto:")
	);
}

/** 把路径转成绝对 URL，用于 canonical、RSS 与 OG */
export function absoluteUrl(path: string, siteURL: string): string {
	return new URL(path, siteURL).toString();
}

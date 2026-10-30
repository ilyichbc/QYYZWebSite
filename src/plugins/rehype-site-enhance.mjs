/**
 * rehype-site-enhance
 *
 * Markdown 渲染后的轻量增强：
 * 1. 站内图片按 CDN 前缀或部署子路径转换；
 * 2. 非首屏图片补 loading="lazy" 与 decoding；
 * 3. 站外链接补 target="_blank" 与 rel；
 * 4. 站内链接补部署子路径。
 *
 * 不依赖 unist 工具库，避免为一个遍历增加依赖。
 */

const EXTERNAL_LINK = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i;
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

function normalizeBase(value) {
	const trimmed = String(value ?? "").trim();
	if (!trimmed || trimmed === "/") {
		return "/";
	}
	return `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
}

function resolveSrc(src, cdnPrefix, basePath) {
	if (typeof src !== "string" || !src.trim()) {
		return src;
	}

	const value = src.trim();
	if (HAS_SCHEME.test(value) || value.startsWith("//")) {
		return value;
	}

	const path = value.startsWith("/") ? value : `/${value}`;
	const prefix = String(cdnPrefix ?? "")
		.trim()
		.replace(/\/+$/, "");
	if (prefix) {
		return `${prefix}${path}`;
	}

	const base = normalizeBase(basePath);
	return base === "/" ? path : `${base.slice(0, -1)}${path}`;
}

function resolveHref(href, basePath) {
	if (typeof href !== "string" || !href.trim()) {
		return href;
	}

	const value = href.trim();
	if (
		value.startsWith("#") ||
		HAS_SCHEME.test(value) ||
		value.startsWith("//")
	) {
		return value;
	}

	const path = value.startsWith("/") ? value : `/${value}`;
	const base = normalizeBase(basePath);

	if (base === "/") {
		return path;
	}

	if (path === base || path.startsWith(base)) {
		return path;
	}

	return `${base.slice(0, -1)}${path}`;
}

function walk(node, visit) {
	visit(node);
	if (Array.isArray(node.children)) {
		for (const child of node.children) {
			walk(child, visit);
		}
	}
}

export default function rehypeSiteEnhance(options = {}) {
	const {
		cdnPrefix = "",
		basePath = "/",
		lazy = true,
		decoding = "async",
	} = options;

	return (tree) => {
		walk(tree, (node) => {
			if (!node || node.type !== "element" || !node.properties) {
				return;
			}

			if (node.tagName === "img") {
				node.properties.src = resolveSrc(
					node.properties.src,
					cdnPrefix,
					basePath,
				);
				node.properties.loading = lazy ? "lazy" : "eager";
				node.properties.decoding = decoding;
				if (!node.properties.alt) {
					node.properties.alt = "";
				}
				return;
			}

			if (
				node.tagName === "a" &&
				typeof node.properties.href === "string"
			) {
				const href = node.properties.href;

				if (EXTERNAL_LINK.test(href) || /^mailto:/i.test(href)) {
					if (EXTERNAL_LINK.test(href)) {
						node.properties.target = "_blank";
						node.properties.rel = "noopener noreferrer";
						const className = node.properties.className;
						node.properties.className = Array.isArray(className)
							? [...className, "external-link"]
							: ["external-link"];
					}
					return;
				}

				node.properties.href = resolveHref(href, basePath);
			}
		});
	};
}

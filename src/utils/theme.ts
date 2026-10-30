import { themeConfig } from "../config";
import type { ThemePalette } from "../types/config";

function paletteVars(palette: ThemePalette): string {
	return [
		`--paper: ${palette.paper};`,
		`--panel: ${palette.panel};`,
		`--panel-glass: ${palette.panelGlass};`,
		`--ink: ${palette.ink};`,
		`--ink-soft: ${palette.inkSoft};`,
		`--muted: ${palette.muted};`,
		`--line: ${palette.line};`,
		`--line-strong: ${palette.lineStrong};`,
		`--accent: ${palette.accent};`,
		`--accent-ink: ${palette.accentInk};`,
		`--accent-soft: ${palette.accentSoft};`,
		`--sky: ${palette.sky};`,
	].join("\n\t");
}

/**
 * 颜色与字体只在配置里维护，构建时注入 CSS 变量。
 * 这样换强调色、纸色不需要改样式文件。
 */
export function buildThemeCss(): string {
	const fonts = themeConfig.fonts;
	const fontVars = [
		`--font-latin: ${fonts.latin};`,
		`--font-chinese: ${fonts.chinese};`,
		`--font-body: ${fonts.body};`,
		`--font-mono: ${fonts.mono};`,
	].join("\n\t");

	return `
:root, :root[data-theme="light"] {
	color-scheme: light;
	${paletteVars(themeConfig.light)}
	--image-scrim-opacity: ${themeConfig.imageScrimOpacity.light};
	${fontVars}
}
:root[data-theme="dark"] {
	color-scheme: dark;
	${paletteVars(themeConfig.dark)}
	--image-scrim-opacity: ${themeConfig.imageScrimOpacity.dark};
}
@media (prefers-color-scheme: dark) {
	:root:not([data-theme]) {
		color-scheme: dark;
		${paletteVars(themeConfig.dark)}
		--image-scrim-opacity: ${themeConfig.imageScrimOpacity.dark};
	}
}
`.trim();
}

/** 在首屏渲染前确定主题，避免闪白 */
export function buildThemeInitScript(): string {
	const storageKey = JSON.stringify(themeConfig.storageKey);
	const defaultMode = JSON.stringify(themeConfig.defaultMode);

	return `(function(){var d=document.documentElement;d.classList.add("js");try{var k=${storageKey};var stored=localStorage.getItem(k);var mode=stored==="light"||stored==="dark"?stored:${defaultMode};var dark=window.matchMedia("(prefers-color-scheme: dark)").matches;d.dataset.theme=mode==="system"?(dark?"dark":"light"):mode;d.dataset.themeMode=mode;}catch(e){d.dataset.theme="light";d.dataset.themeMode="light";}})();`;
}

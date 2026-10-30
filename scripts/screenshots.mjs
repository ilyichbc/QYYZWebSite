/**
 * 视觉回归截图（开发辅助）
 * 用法：pnpm exec node scripts/screenshots.mjs
 * 需要本机安装 Chrome；截图输出到 .screenshots/
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.PREVIEW_URL ?? "http://127.0.0.1:4321";
const outDir = path.resolve(".screenshots");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const errors = [];

async function shot(page, name) {
	await page.screenshot({ path: path.join(outDir, `${name}.png`) });
}

async function openPage({ width, height, dark = false, url }) {
	const context = await browser.newContext({
		viewport: { width, height },
		colorScheme: dark ? "dark" : "light",
		deviceScaleFactor: 1,
	});
	const page = await context.newPage();
	page.on("pageerror", (error) => errors.push(`${url}: ${error.message}`));
	page.on("console", (message) => {
		if (message.type() === "error") {
			errors.push(`${url} console: ${message.text()}`);
		}
	});
	await page.goto(`${base}${url}`, { waitUntil: "networkidle" });
	await page.waitForTimeout(900);
	return { context, page };
}

async function scrollToSection(page, id) {
	await page.evaluate((sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) {
			window.scrollTo({ top: element.offsetTop, behavior: "instant" });
		}
	}, id);
	await page.waitForTimeout(950);
}

async function primeReveals(page) {
	const height = await page.evaluate(
		() => document.documentElement.scrollHeight,
	);
	for (let y = 0; y < height; y += 700) {
		await page.evaluate(
			(top) => window.scrollTo({ top, behavior: "instant" }),
			y,
		);
		await page.waitForTimeout(120);
	}
	await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
	await page.waitForTimeout(400);
}

// 首页：桌面浅色
{
	const { context, page } = await openPage({
		width: 1440,
		height: 960,
		url: "/",
	});
	await shot(page, "home-hero-light");

	for (const id of ["intro", "history", "news", "contact"]) {
		await scrollToSection(page, id);
		await shot(page, `home-${id}-light`);
	}

	await primeReveals(page);
	await page.screenshot({
		path: path.join(outDir, "home-desktop-full.png"),
		fullPage: true,
	});

	await context.close();
}

// 首页：深色
{
	const { context, page } = await openPage({
		width: 1440,
		height: 960,
		dark: true,
		url: "/",
	});
	await shot(page, "home-hero-dark");
	await scrollToSection(page, "intro");
	await shot(page, "home-intro-dark");
	await scrollToSection(page, "contact");
	await shot(page, "home-contact-dark");
	await context.close();
}

// 功能页
const pages = {
	about: "/about/",
	products: "/products/",
	news: "/news/",
	contact: "/contact/",
	article: "/news/2026-10-24-site-renewal/",
	notfound: "/404/",
};

for (const [name, url] of Object.entries(pages)) {
	const { context, page } = await openPage({ width: 1440, height: 960, url });
	await shot(page, `${name}-desktop`);
	await primeReveals(page);
	await page.screenshot({
		path: path.join(outDir, `${name}-desktop-full.png`),
		fullPage: true,
	});
	await context.close();
}

// 新闻筛选
{
	const { context, page } = await openPage({
		width: 1440,
		height: 960,
		url: "/news/",
	});
	const chip = page.locator('[data-news-filter="设计"]');
	await chip.click();
	await page.waitForTimeout(400);
	await shot(page, "news-filtered");
	const visible = await page
		.locator("[data-news-item]:not([hidden])")
		.count();
	console.log(`news filter visible rows: ${visible}`);
	await context.close();
}

// 手机端
for (const [name, url, ids] of [
	["home", "/", ["intro", "history", "news", "contact"]],
	["products", "/products/", []],
	["article", "/news/2026-10-24-site-renewal/", []],
]) {
	const { context, page } = await openPage({ width: 390, height: 844, url });
	await shot(page, `${name}-mobile`);

	for (const id of ids) {
		await scrollToSection(page, id);
		await shot(page, `${name}-${id}-mobile`);
	}

	await primeReveals(page);
	await page.screenshot({
		path: path.join(outDir, `${name}-mobile-full.png`),
		fullPage: true,
	});
	await context.close();
}

// 手机菜单
{
	const { context, page } = await openPage({
		width: 390,
		height: 844,
		url: "/",
	});
	await page.locator("[data-menu-toggle]").click();
	await page.waitForTimeout(500);
	await shot(page, "home-mobile-menu");
	await context.close();
}

// 主题切换
{
	const { context, page } = await openPage({
		width: 1440,
		height: 960,
		url: "/",
	});
	await page.locator("[data-theme-toggle]").click();
	await page.waitForTimeout(500);
	await shot(page, "home-theme-toggled");
	await context.close();
}

await browser.close();

if (errors.length > 0) {
	console.log("Page errors:");
	for (const error of errors) {
		console.log(`- ${error}`);
	}
} else {
	console.log("No page errors.");
}
console.log(`Screenshots written to ${outDir}`);

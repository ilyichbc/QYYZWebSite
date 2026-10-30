/**
 * 生成默认 OG 分享图。
 * 用法：pnpm og
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const background = path.join(
	root,
	"public",
	"images",
	"backgrounds",
	"qyyz",
	"qyyz-06.webp",
);
const output = path.join(root, "public", "images", "og-default.jpg");

const overlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
	<defs>
		<linearGradient id="scrim" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#03121c" stop-opacity="0.78"/>
			<stop offset="0.55" stop-color="#03121c" stop-opacity="0.32"/>
			<stop offset="1" stop-color="#03121c" stop-opacity="0.5"/>
		</linearGradient>
		<linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
			<stop offset="0" stop-color="#7fd2ff"/>
			<stop offset="1" stop-color="#7fd2ff" stop-opacity="0"/>
		</linearGradient>
	</defs>
	<rect width="1200" height="630" fill="url(#scrim)"/>
	<rect x="32" y="32" width="1136" height="566" fill="none" stroke="#ffffff" stroke-opacity="0.24"/>
	<path d="M32 86V32h54M1114 32h54v54M32 544v54h54M1168 544v54h-54" fill="none" stroke="#ffffff" stroke-opacity="0.6"/>
	<text x="72" y="112" font-family="Saira, Helvetica, Arial, sans-serif" font-size="16" letter-spacing="6" fill="#ffffff" opacity="0.66">// QIYANG NO.1 HIGH SCHOOL</text>
	<text x="64" y="300" font-family="'Microsoft YaHei', 'Noto Sans SC', sans-serif" font-size="118" font-weight="700" letter-spacing="-4" fill="#ffffff">祁阳一中</text>
	<text x="70" y="360" font-family="Saira, Helvetica, Arial, sans-serif" font-size="24" font-stretch="125%" letter-spacing="14" fill="#ffffff" opacity="0.78">QIYANG NO.1 HIGH SCHOOL</text>
	<rect x="72" y="400" width="180" height="2" fill="url(#line)"/>
	<text x="72" y="470" font-family="'Microsoft YaHei', 'Noto Sans SC', sans-serif" font-size="25" fill="#ffffff" opacity="0.82">博、雅、真、精</text>
	<text x="72" y="530" font-family="Saira, Helvetica, Arial, sans-serif" font-size="14" letter-spacing="4" fill="#ffffff" opacity="0.5">HUNAN YONGZHOU QIYANG / EST. 1912</text>
	<text x="1100" y="530" text-anchor="end" font-family="Saira, Helvetica, Arial, sans-serif" font-size="14" letter-spacing="4" fill="#ffffff" opacity="0.5">1912 — 2026</text>
</svg>
`;

await sharp(background)
	.resize(1200, 630, { fit: "cover", position: "south" })
	.composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
	.jpeg({ quality: 84, mozjpeg: true })
	.toFile(output);

console.log(`OG image written to ${output}`);

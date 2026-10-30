import type {
	AboutPageConfig,
	BannerConfig,
	ContactPageConfig,
	HomeConfig,
	ImagesConfig,
	MotionConfig,
	NewsPageConfig,
	PageConfigMap,
	ProductsPageConfig,
	SiteConfig,
	ThemeConfig,
} from "./types/config";

/* ------------------------------------------------------------------ */
/* 站点标识与开关                                                       */
/* ------------------------------------------------------------------ */

export const siteConfig: SiteConfig = {
	identity: {
		name: "祁阳一中",
		nameLatin: "QIYANG NO.1 HIGH SCHOOL",
		tagline: "博、雅、真、精",
		description:
			"祁阳市第一中学，坐落于湖南永州祁阳文昌塔下、湘江之畔的省示范性普通高级中学，肇始于 1912 年。",
		foundingYear: "1912",
		location: "中国 · 湖南永州 · 祁阳",
		logo: {
			mode: "image",
			image: "/images/logo.png",
			alt: "祁阳市第一中学",
		},
	},
	// 部署前请改成真实域名，并以 / 结尾；sitemap 与 canonical 都会使用它。
	siteURL: "https://example.com/",
	// 根路径部署填 "/"；GitHub Pages 项目页填 "/仓库名/"。
	basePath: "/",
	lang: "zh-CN",
	locale: "zh_CN",
	keywords: [
		"祁阳一中",
		"祁阳市第一中学",
		"湖南省示范性高中",
		"永州祁阳",
		"文昌塔",
	],
	page: {
		home: {
			enabled: true,
			inNav: true,
			navOrder: 1,
			label: "首页",
			latin: "INDEX",
			href: "/",
			title: "祁阳市第一中学",
			description: "湖南省示范性普通高级中学，肇始于 1912 年。",
		},
		news: {
			enabled: true,
			inNav: true,
			navOrder: 2,
			label: "新闻",
			latin: "NEWS",
			href: "/news/",
			title: "新闻",
			description: "祁阳一中校园新闻、通知公告与活动记录，按时间倒序排列。",
		},
		about: {
			enabled: true,
			inNav: true,
			navOrder: 3,
			label: "学校简介",
			latin: "ABOUT",
			href: "/about/",
			title: "学校简介",
			description: "祁阳市第一中学的校史沿革、办学特色与知名校友。",
		},
		contact: {
			enabled: true,
			inNav: true,
			navOrder: 4,
			label: "联系方式",
			latin: "CONTACT",
			href: "/contact/",
			title: "联系方式",
			description: "祁阳市第一中学的联系方式与来访信息。",
		},
		products: {
			enabled: false,
			inNav: false,
			navOrder: 5,
			label: "产品",
			latin: "PRODUCTS",
			href: "/products/",
			title: "所有产品",
			description: "",
		},
	} satisfies PageConfigMap,
	seo: {
		titleTemplate: "%s — 祁阳市第一中学",
		ogImage: "/images/og-default.jpg",
		twitterCard: "summary_large_image",
		robots: "index, follow",
	},
	navbar: {
		showThemeToggle: true,
		showStatus: true,
		statusText: "博雅真精",
		extraItems: [],
	},
	footer: {
		statement: "文昌塔下，湘江之畔，一所走过百年的学校。",
		columns: [
			{
				title: "站点",
				latin: "PAGES",
				links: [
					{
						label: "新闻",
						latin: "NEWS",
						href: "/news/",
						enabled: true,
						requiresFeature: "news",
					},
					{
						label: "学校简介",
						latin: "ABOUT",
						href: "/about/",
						enabled: true,
						requiresFeature: "about",
					},
					{
						label: "联系方式",
						latin: "CONTACT",
						href: "/contact/",
						enabled: true,
						requiresFeature: "contact",
					},
				],
			},
			{
				title: "订阅",
				latin: "FEEDS",
				links: [
					{
						label: "RSS",
						latin: "RSS",
						href: "/rss.xml",
						enabled: true,
					},
					{
						label: "站点地图",
						latin: "SITEMAP",
						href: "/sitemap-index.xml",
						enabled: true,
					},
				],
			},
		],
		social: [
			{
				label: "微信公众号",
				latin: "WECHAT",
				href: "https://mp.weixin.qq.com/",
				enabled: true,
				external: true,
			},
		],
		copyright: "© 2026 祁阳市第一中学. 保留所有权利。",
		icp: null,
		backToTop: true,
	},
};

/* ------------------------------------------------------------------ */
/* 主题                                                                */
/* ------------------------------------------------------------------ */

export const themeConfig: ThemeConfig = {
	defaultMode: "system",
	toggle: true,
	storageKey: "astrorbit-theme",
	light: {
		paper: "#ECEFF1",
		panel: "#F7F9FA",
		panelGlass: "rgba(236, 239, 241, 0.72)",
		ink: "#0b1720",
		inkSoft: "#2f434e",
		muted: "#667c88",
		line: "rgba(11, 23, 32, 0.16)",
		lineStrong: "rgba(11, 23, 32, 0.42)",
		accent: "#0b63d6",
		accentInk: "#ffffff",
		accentSoft: "rgba(11, 99, 214, 0.12)",
		sky: "#4db8ff",
	},
	dark: {
		paper: "#0b1924",
		panel: "#12232f",
		panelGlass: "rgba(11, 25, 36, 0.62)",
		ink: "#f3f8fa",
		inkSoft: "#c9d8df",
		muted: "#8fa6b1",
		line: "rgba(243, 248, 250, 0.16)",
		lineStrong: "rgba(243, 248, 250, 0.4)",
		accent: "#5ab8ff",
		accentInk: "#041018",
		accentSoft: "rgba(90, 184, 255, 0.16)",
		sky: "#6fd6ff",
	},
	imageScrimOpacity: {
		light: 0.84,
		dark: 1,
	},
	fonts: {
		latin: '"Saira Variable", "Saira", "Helvetica Neue", Arial, sans-serif',
		chinese:
			'"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
		body: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
		mono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
	},
};

/* ------------------------------------------------------------------ */
/* 图片与动效                                                           */
/* ------------------------------------------------------------------ */

export const imageConfig: ImagesConfig = {
	// 例：https://cdn.example.com/astrorbit 。留空则使用 /images/... 站内路径。
	cdnPrefix: "",
	lazy: true,
	eagerHero: true,
	decoding: "async",
};

export const motionConfig: MotionConfig = {
	enabled: true,
	reveal: true,
	scrollSnap: {
		enabled: true,
		mobile: false,
		behavior: "mandatory",
		stop: "always",
	},
	// 图形装饰：半调、等高线、射线属于同一套母题库，可按需关闭
	decor: {
		halftone: true,
		contour: true,
		rays: true,
		canvasField: false,
		particles: true,
		density: "medium",
	},
	// 环境层：每页只保留一个运动系统
	ambient: {
		heroOrbit: true,
		heroMotes: true,
		sectionDrift: true,
		pageHeroOrbit: true,
		articleRecord: true,
	},
	// 反馈层：按钮、卡片、条码
	feedback: {
		cardTilt: true,
		barcodeScan: true,
		buttonSignal: true,
	},
	// 叙事层：数字增长与线稿绘制
	narrative: {
		statsCount: true,
		contourDraw: true,
		revealDistance: 40,
	},
	// 标志层：首屏档案扫描只执行一次
	signature: {
		heroScan: true,
	},
};

/* ------------------------------------------------------------------ */
/* 首页 Banner                                                          */
/* ------------------------------------------------------------------ */

export const bannerConfig: BannerConfig = {
	enabled: true,
	background: "/images/backgrounds/qyyz/qyyz-01.webp",
	// 可选视频背景，填入 mp4/webm 后替代静态底图；留空则使用图片 + 缓慢推移
	video: "",
	backgroundPosition: "center 55%",
	overlay: "dark",
	kicker: "// QIYANG NO.1 HIGH SCHOOL / EST. 1912",
	actions: [
		{
			label: "了解学校",
			href: "/about/",
			variant: "solid",
			enabled: true,
			requiresFeature: "about",
		},
		{
			label: "查看新闻",
			href: "/news/",
			variant: "ghost",
			enabled: true,
			requiresFeature: "news",
		},
	],
	showFrame: true,
	showGrid: false,
	showGrain: true,
	// 首屏大标题使用文字；导航栏仍按 identity.logo 显示图片
	logoMode: "text",
	logoImage: "",
	logoAlt: "祁阳市第一中学",
	// 首页左侧的粒子成像：text 使用文字，image 填写图片路径
	particleEcho: {
		enabled: true,
		mode: "image",
		text: "祁阳一中",
		image: "/images/logo.png",
		count: 45200,
		stir: 40,
		spring: 10,
		scale: 1,
		opacity: 1,
		figureSize: 0.75,
		offsetX: 0.02,
		offsetY: 0.09,
		// 边缘渐隐：图形四周的粒子变淡；关闭后边缘与中心一样实
		edgeFade: false,
		// 渐隐过渡宽度，0.05-0.6，越大边缘越虚
		edgeFadeWidth: 0.08,
	},
	slogan: {
		mode: "random",
		fixed: "博、雅、真、精",
		list: [
			"文昌塔下，湘江之畔，百年弦歌不辍。",
			"博学、雅正、求真、精进。",
			"让每一份努力，都在岁月里开花。",
			"从 1912 年走来，向更远的未来出发。",
		],
		typing: true,
		hitokoto: {
			endpoint: "",
			categories: [],
			timeoutMs: 4500,
			fallback: ["博、雅、真、精", "文昌塔下，湘江之畔。"],
		},
	},
	scrollHint: {
		enabled: true,
		label: "向下滚动",
	},
	meta: {
		topLeft: "// SCHOOL FILE 001",
		topRight: "EST. 1912 / CN",
		bottomLeft: "26.5794° N / 111.8470° E",
		bottomRight: "SCROLL TO EXPLORE",
	},
};

/* ------------------------------------------------------------------ */
/* 首页滚动模块                                                         */
/* ------------------------------------------------------------------ */

export const homeConfig: HomeConfig = {
	sections: [
		{
			type: "intro",
			id: "intro",
			enabled: true,
			index: "01",
			eyebrow: "// SCHOOL",
			title: "文昌塔下，百年弦歌",
			lead: "祁阳市第一中学坐落于湘江之畔、文昌塔下，是一所走过百余年光阴的省示范性普通高级中学。",
			image: "/images/backgrounds/qyyz/wct.png",
			imageAlt: "祁阳一中校园插画",
			imagePosition: "center 52%",
			overlay: "dark",
			fullHeight: true,
			decor: "halftone",
		},
		{
			type: "history",
			id: "history",
			enabled: true,
			index: "02",
			eyebrow: "// CHRONICLE",
			title: "一路走来的刻度",
			lead: "从 1912 年的祁阳县立中学堂，到今天的祁阳市第一中学，每一个年份都是真实的脚步。",
			image: "/images/backgrounds/qyyz/qyyz-05.webp",
			imageAlt: "祁阳一中校园插画",
			imagePosition: "center 58%",
			overlay: "dark",
			fullHeight: true,
			decor: "contour",
		},
		{
			type: "news",
			id: "news",
			enabled: true,
			index: "03",
			eyebrow: "// DISPATCH",
			title: "最近的消息",
			lead: "校园新闻、通知公告与活动记录，来自祁阳一中微信公众号。",
			image: "/images/backgrounds/qyyz/qyyz-06.webp",
			imageAlt: "祁阳一中校园插画",
			imagePosition: "center 45%",
			overlay: "dark",
			fullHeight: true,
			decor: "halftone",
		},
		{
			type: "contact",
			id: "contact",
			enabled: true,
			index: "04",
			eyebrow: "// CONTACT",
			title: "来访与联系",
			lead: "欢迎校友、家长与社会各界来访，了解学校、共话教育。",
			image: "/images/backgrounds/qyyz/qyyz-11.webp",
			imageAlt: "祁阳一中校园插画",
			imagePosition: "center 55%",
			overlay: "dark",
			fullHeight: true,
			decor: "rays",
		},
		{
			type: "products",
			id: "products",
			enabled: false,
			index: "05",
			eyebrow: "// PRODUCTS",
			title: "所有产品",
			lead: "",
			image: "",
			imageAlt: "",
			imagePosition: "center 55%",
			overlay: "dark",
			fullHeight: true,
			decor: "rays",
		},
	],
	intro: {
		paragraphs: [
			"祁阳市第一中学，肇始于 1912 年创办的祁阳县立中学堂，前身脉络更上溯至明代的文昌书院。校园占地 180 余亩，现有在校学生 4000 余人。",
			"学校坚持立德树人、五育并举，在田径、校园文化艺术、科技发明、法治教育等领域均有积淀，是清华大学等多所高校的生源中学。",
		],
		stats: [
			{ value: "1912", label: "年建校", latin: "FOUNDED" },
			{ value: "4000", label: "余名学生", latin: "STUDENTS" },
			{ value: "400", label: "余名教职工", latin: "STAFF" },
		],
		signature: "— 祁阳市第一中学 / 校训：博、雅、真、精",
	},
	history: {
		entries: [
			{
				year: "1912",
				month: "",
				title: "创办祁阳县立中学堂",
				description: "近代学制下的祁阳中学教育由此起步。",
				tag: "肇始",
			},
			{
				year: "1950",
				month: "",
				title: "迁至文昌书院",
				description: "简易乡村师范学校并入，学校落户文昌塔下的书院故址。",
				tag: "校址",
			},
			{
				year: "1953",
				month: "",
				title: "更名「湖南省祁阳中学」",
				description: "学校纳入省级中学序列。",
				tag: "更名",
			},
			{
				year: "1960",
				month: "",
				title: "更名「湖南省祁阳县第一中学」",
				description: "祁阳一中之名由此确立。",
				tag: "更名",
			},
			{
				year: "2021",
				month: "",
				title: "撤县设市，改为现名",
				description: "祁阳撤县设市，学校更名为「祁阳市第一中学」。",
				tag: "新程",
			},
		],
		note: "校史信息整理自公开资料（学校官网、微信公众号与百科），以学校正式发布为准。",
	},
};

/* ------------------------------------------------------------------ */
/* 关于 / 联系 / 产品 / 新闻                                            */
/* ------------------------------------------------------------------ */

export const aboutConfig: AboutPageConfig = {
	eyebrow: "// ABOUT",
	title: "祁阳市第一中学",
	lead: "一所坐落于湘江之畔、文昌塔下的省示范性普通高级中学，走过百余年光阴，仍在续写新的篇章。",
	contentEntry: "about",
	facts: [
		{ label: "创办", latin: "FOUNDED", value: "1912 年" },
		{ label: "所在地", latin: "BASE", value: "湖南永州 · 祁阳" },
		{ label: "规模", latin: "SCALE", value: "180 余亩 / 学生 4000 余人" },
		{ label: "校训", latin: "MOTTO", value: "博、雅、真、精" },
	],
	image: "/images/backgrounds/qyyz/qyyz-05.webp",
	imageAlt: "祁阳一中校园插画",
	hero: {
		image: "/images/backgrounds/qyyz/qyyz-07.webp",
		imageAlt: "祁阳一中校园插画",
		imagePosition: "center 55%",
		overlay: "dark",
	},
};

export const contactConfig: ContactPageConfig = {
	eyebrow: "// CONTACT",
	title: "来访与联系",
	lead: "欢迎校友、家长与社会各界来访交流。学校位于湖南省永州市祁阳市，详细地址与联络方式以学校官方发布为准。",
	note: "本页为静态信息展示，请通过学校官方渠道核实最新联系方式。",
	channels: [
		{
			id: "wechat",
			label: "微信公众号",
			latin: "WECHAT",
			value: "祁阳一中（微信搜索关注）",
			href: "https://mp.weixin.qq.com/",
			note: "校园新闻与通知的官方发布渠道",
			enabled: true,
		},
	],
	hero: {
		image: "/images/backgrounds/qyyz/qyyz-08.webp",
		imageAlt: "祁阳一中校园插画",
		imagePosition: "center 55%",
		overlay: "dark",
	},
};

export const productsConfig: ProductsPageConfig = {
	eyebrow: "// PRODUCTS",
	title: "所有产品",
	lead: "",
	note: "",
	homePreviewCount: 3,
	items: [],
	hero: {
		image: "/images/backgrounds/qyyz/qyyz-09.webp",
		imageAlt: "祁阳一中校园插画",
		imagePosition: "center 55%",
		overlay: "dark",
	},
};

export const newsConfig: NewsPageConfig = {
	eyebrow: "// DISPATCH",
	title: "新闻与公告",
	lead: "祁阳一中校园新闻、通知公告与活动记录，来自微信公众号，按时间倒序排列。",
	emptyText: "这里还没有发布任何消息。",
	homePreviewCount: 5,
	showCategories: true,
	pageSize: 10,
	hero: {
		image: "/images/backgrounds/qyyz/qyyz-10.webp",
		imageAlt: "祁阳一中校园插画",
		imagePosition: "center 55%",
		overlay: "dark",
	},
	detailImage: "/images/backgrounds/qyyz/qyyz-04.webp",
	detailImageAlt: "祁阳一中校园插画",
	detailOverlay: "dark",
};

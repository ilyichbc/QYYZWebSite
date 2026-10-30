/**
 * 全站配置类型定义
 *
 * 约定：
 * 1. 所有可调项先在类型里定义，再在 `src/config.ts` 中赋默认值；
 * 2. 组件只读取已经定型的配置，不在组件内部散落硬编码；
 * 3. 新增字段时保持向后兼容，组件侧保留兜底值。
 */

/** 站点标识 */
export interface IdentityConfig {
	/** 中文名，用于导航、页脚、Banner */
	name: string;
	/** 拉丁字标，用于宽体大标题与装饰 */
	nameLatin: string;
	/** 一句话定位 */
	tagline: string;
	/** SEO 默认描述 */
	description: string;
	/** 成立年份（真实数据，用于展示） */
	foundingYear: string;
	/** 所在地 */
	location: string;
	/** logo 展示方式 */
	logo: {
		mode: "text" | "image";
		image: string;
		alt: string;
	};
}

/** 浅色 / 深色共用的一组颜色 token */
export interface ThemePalette {
	/** 页面底色 */
	paper: string;
	/** 卡片 / 面板底色 */
	panel: string;
	/** 半透明玻璃面板 */
	panelGlass: string;
	/** 主文字 */
	ink: string;
	/** 次级文字 */
	inkSoft: string;
	/** 弱化说明文字 */
	muted: string;
	/** 细分割线 */
	line: string;
	/** 强分割线 / 技术边框 */
	lineStrong: string;
	/** 唯一强调色，只用于填充 */
	accent: string;
	/** 强调色上的文字颜色 */
	accentInk: string;
	/** 强调色的低透明度背景 */
	accentSoft: string;
	/** 天空色，用于细线与光点，不用于大面积填充 */
	sky: string;
}

export type ThemeMode = "system" | "light" | "dark";

export interface FontConfig {
	/** 拉丁字体族，建议保留可变宽度轴 */
	latin: string;
	/** 中文字体族 */
	chinese: string;
	/** 中文正文使用的字体族 */
	body: string;
	/** 等宽字体族 */
	mono: string;
}

export interface ThemeConfig {
	defaultMode: ThemeMode;
	toggle: boolean;
	storageKey: string;
	light: ThemePalette;
	dark: ThemePalette;
	/** 图片深色遮罩的透明度：明亮模式更浅，黑暗模式更实 */
	imageScrimOpacity: {
		light: number;
		dark: number;
	};
	fonts: FontConfig;
}

/** 图形装饰密度 */
export type DecorDensity = "low" | "medium" | "high";

/** 首页区块可挂载的装饰图元 */
export type SectionDecor = "halftone" | "contour" | "rays" | "none";

export interface MotionConfig {
	/** 总开关，关闭后不做入场、揭示和滚动吸附 */
	enabled: boolean;
	/** 滚动进入视口时揭示 */
	reveal: boolean;
	/** 首页滚动吸附 */
	scrollSnap: {
		enabled: boolean;
		/** 是否在移动端也开启 */
		mobile: boolean;
		/** mandatory 会强制吸附到每一屏；proximity 更宽松 */
		behavior: "proximity" | "mandatory";
		/** always 能阻止快速滚动跳过多屏 */
		stop: "normal" | "always";
	};
	/** 图形装饰开关与密度 */
	decor: {
		halftone: boolean;
		contour: boolean;
		rays: boolean;
		/** 动态 Canvas 线场，默认关闭 */
		canvasField: boolean;
		/** Hero / 区块的 Canvas 粒子层 */
		particles: boolean;
		density: DecorDensity;
	};
	/** 环境层动效开关 */
	ambient: {
		heroOrbit: boolean;
		heroMotes: boolean;
		sectionDrift: boolean;
		pageHeroOrbit: boolean;
		articleRecord: boolean;
	};
	/** 反馈层动效开关 */
	feedback: {
		cardTilt: boolean;
		barcodeScan: boolean;
		buttonSignal: boolean;
	};
	/** 叙事层动效开关 */
	narrative: {
		statsCount: boolean;
		contourDraw: boolean;
		/** 揭示位移距离（px） */
		revealDistance: number;
	};
	/** 标志层动效开关 */
	signature: {
		heroScan: boolean;
	};
}

export interface ImagesConfig {
	/** CDN 前缀；留空则使用站内路径。完整 URL 不受影响 */
	cdnPrefix: string;
	/** 非首屏图片是否懒加载 */
	lazy: boolean;
	/** Banner 首屏图是否提前加载（为 LCP 性能保留的例外） */
	eagerHero: boolean;
	decoding: "async" | "sync" | "auto";
}

/** 页面开关与导航元数据 */
export type FeatureKey = "home" | "about" | "contact" | "products" | "news";

export interface PageEntry {
	enabled: boolean;
	/** 是否出现在主导航 */
	inNav: boolean;
	/** 导航排序，数字小的在前 */
	navOrder: number;
	label: string;
	latin: string;
	href: string;
	/** 浏览器标题 */
	title: string;
	/** SEO 描述 */
	description: string;
}

export type PageConfigMap = Record<FeatureKey, PageEntry>;

export interface NavItem {
	label: string;
	latin: string;
	href: string;
	external?: boolean;
	enabled: boolean;
	/** 关联的功能页；功能页关闭时自动隐藏 */
	requiresFeature?: FeatureKey;
}

export interface NavbarConfig {
	showThemeToggle: boolean;
	showStatus: boolean;
	statusText: string;
	/** 额外导航项（站外链接等） */
	extraItems: NavItem[];
}

export interface FooterColumn {
	title: string;
	latin: string;
	links: NavItem[];
}

export interface FooterConfig {
	statement: string;
	columns: FooterColumn[];
	social: NavItem[];
	copyright: string;
	icp: { label: string; href: string } | null;
	backToTop: boolean;
}

export interface SeoConfig {
	titleTemplate: string;
	ogImage: string;
	twitterCard: "summary" | "summary_large_image";
	robots: string;
}

export interface SiteConfig {
	identity: IdentityConfig;
	/** 站点根地址（不含子路径），以 / 结尾 */
	siteURL: string;
	/** 部署子路径；根路径填 "/"。GitHub Pages 项目页示例："/Astrorbit/" */
	basePath: string;
	lang: string;
	locale: string;
	keywords: string[];
	page: PageConfigMap;
	seo: SeoConfig;
	navbar: NavbarConfig;
	footer: FooterConfig;
}

/* ------------------------------------------------------------------ */
/* Banner                                                              */
/* ------------------------------------------------------------------ */

export type SloganMode = "fixed" | "random" | "hitokoto";

export interface SloganConfig {
	mode: SloganMode;
	/** mode 为 fixed 时使用 */
	fixed: string;
	/** mode 为 random 时使用 */
	list: string[];
	/** 是否逐字显示 */
	typing: boolean;
	hitokoto: {
		/** 一言 API 基础地址，客户端会拼接分类参数 */
		endpoint: string;
		categories: string[];
		timeoutMs: number;
		/** API 失败时使用的本地句子 */
		fallback: string[];
	};
}

export type MediaOverlay = "dark" | "light" | "none";

/** 页头 / 区块的大图背景 */
export interface PageHeroMedia {
	image: string;
	imageAlt: string;
	imagePosition: string;
	/** 可选视频背景；为空时使用图片 */
	video?: string;
	overlay: MediaOverlay;
}

export interface BannerAction {
	label: string;
	href: string;
	variant: "solid" | "accent" | "ghost";
	enabled: boolean;
	/** 关联功能页关闭时自动隐藏 */
	requiresFeature?: FeatureKey;
	external?: boolean;
}

/** 首页左侧的粒子成像：文字或图片被采样成粒子，鼠标搅动后缓慢回位 */
export interface ParticleEchoConfig {
	enabled: boolean;
	/** text 使用文字采样；image 使用图片采样 */
	mode: "text" | "image";
	text: string;
	image: string;
	count: number;
	/** 搅动强度 0-100 */
	stir: number;
	/** 回弹强度 0-100 */
	spring: number;
	/** 粒子尺寸缩放，1 为默认，0.5 减半、1.5 放大 1.5 倍 */
	scale: number;
	/** 整体透明度 0-1，1 为完全不透明，0 为完全透明 */
	opacity: number;
	/** 图形整体大小缩放，1 为默认，围绕图形中心缩放（0.5 缩小一半、1.5 放大 1.5 倍） */
	figureSize: number;
	/** 水平相对位置偏移，占视口宽度比例，正数右移、负数左移 */
	offsetX: number;
	/** 垂直相对位置偏移，占视口高度比例，正数下移、负数上移 */
	offsetY: number;
	/**
	 * 边缘渐隐：开启后图形四周的粒子会变淡，轮廓更柔和。
	 * 关闭时图形边缘保持与中心一致的实心密度。默认开启。
	 */
	edgeFade: boolean;
	/**
	 * 边缘渐隐的过渡宽度，0.05-0.6，数值越大边缘越虚。
	 * 仅在 edgeFade 为 true 时生效。
	 */
	edgeFadeWidth: number;
}

export interface BannerConfig {
	enabled: boolean;
	background: string;
	/** 可选视频背景；为空时使用图片 + 缓慢推移 */
	video?: string;
	backgroundPosition: string;
	/** 压在整幅底图上的暗色 / 亮色遮罩 */
	overlay: MediaOverlay;
	/** 首屏上方的小眉标 */
	kicker: string;
	actions: BannerAction[];
	showFrame: boolean;
	showGrid: boolean;
	showGrain: boolean;
	/** inherit 读取 identity.logo；text 使用文字字标；image 使用图片 logo */
	logoMode: "inherit" | "text" | "image";
	logoImage: string;
	logoAlt: string;
	/** 首页左侧的粒子成像 */
	particleEcho: ParticleEchoConfig;
	slogan: SloganConfig;
	scrollHint: { enabled: boolean; label: string };
	meta: {
		topLeft: string;
		topRight: string;
		bottomLeft: string;
		bottomRight: string;
	};
}

/* ------------------------------------------------------------------ */
/* 首页                                                                */
/* ------------------------------------------------------------------ */

export type HomeSectionType =
	"intro" | "history" | "contact" | "news" | "products";
export interface HomeSectionConfig {
	type: HomeSectionType;
	id: string;
	enabled: boolean;
	/** 序号，如 01 */
	index: string;
	eyebrow: string;
	title: string;
	lead: string;
	/** 整幅背景图；留空时使用纯纸色背景 */
	image: string;
	imageAlt: string;
	imagePosition: string;
	/** 可选视频背景；为空时使用图片 */
	video?: string;
	overlay: MediaOverlay;
	/** 是否强制占满一屏（内容更高时自动撑开） */
	fullHeight: boolean;
	/** 区块装饰图元；缺省时按区块类型自动匹配 */
	decor?: SectionDecor;
}

export interface StatItem {
	value: string;
	label: string;
	latin: string;
}

export interface IntroSectionContent {
	paragraphs: string[];
	stats: StatItem[];
	signature: string;
}

export interface HistoryEntry {
	year: string;
	month: string;
	title: string;
	description: string;
	tag: string;
}

export interface HistorySectionContent {
	entries: HistoryEntry[];
	note: string;
}

export interface HomeConfig {
	sections: HomeSectionConfig[];
	intro: IntroSectionContent;
	history: HistorySectionContent;
}

/* ------------------------------------------------------------------ */
/* 功能页                                                              */
/* ------------------------------------------------------------------ */

export interface FactItem {
	label: string;
	latin: string;
	value: string;
}

export interface AboutPageConfig {
	eyebrow: string;
	title: string;
	lead: string;
	/** 对应 src/content/pages 下的 Markdown 文件名（不含扩展名） */
	contentEntry: string;
	facts: FactItem[];
	image: string;
	imageAlt: string;
	hero: PageHeroMedia;
}

export interface ContactChannel {
	id: string;
	label: string;
	latin: string;
	value: string;
	href: string;
	note: string;
	enabled: boolean;
}

export interface ContactPageConfig {
	eyebrow: string;
	title: string;
	lead: string;
	note: string;
	channels: ContactChannel[];
	hero: PageHeroMedia;
}

export interface ProductCharacter {
	/** 角色名 */
	name: string;
	/** 角色标签，留空不显示 */
	tags?: string;
	/** 角色描述，留空不显示 */
	description?: string;
}

export interface ProductDownload {
	label: string;
	/** 平台说明，例如「PC端现已登陆」 */
	note?: string;
	href: string;
	external?: boolean;
}

export interface ProductDetail {
	/** 详情页正文段落 */
	description?: string[];
	characters?: ProductCharacter[];
	downloadNote?: string;
	downloads?: ProductDownload[];
	/** 制作人员等信息；没有真实名单时只放来源链接，不虚构姓名 */
	creditsNote?: string;
	sourceHref?: string;
	sourceLabel?: string;
}

export interface ProductItem {
	/** 锚点 / 卡片 id */
	id: string;
	/** 本地详情页 slug；生成 /products/<slug>/ */
	slug?: string;
	index: string;
	title: string;
	latin: string;
	description: string;
	/** 卡片状态，留空不显示 */
	status?: string;
	/** 卡片年份 / 版本，留空不显示 */
	year?: string;
	image: string;
	imageAlt: string;
	/** 详情页头图；留空时使用 productsConfig.hero.image */
	heroImage?: string;
	/** 外链；留空时若有 slug 则链接到本地详情页 */
	href?: string;
	/** 卡片标签，留空不显示 */
	tags?: string[];
	enabled: boolean;
	detail?: ProductDetail;
}

export interface ProductsPageConfig {
	eyebrow: string;
	title: string;
	lead: string;
	note: string;
	homePreviewCount: number;
	items: ProductItem[];
	hero: PageHeroMedia;
}

export interface NewsPageConfig {
	eyebrow: string;
	title: string;
	lead: string;
	emptyText: string;
	homePreviewCount: number;
	showCategories: boolean;
	/** 新闻列表每页条数，0 表示不分页 */
	pageSize: number;
	hero: PageHeroMedia;
	/** 文章详情未单独提供封面时使用的头图 */
	detailImage: string;
	detailImageAlt: string;
	detailOverlay: MediaOverlay;
}

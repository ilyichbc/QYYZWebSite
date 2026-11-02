/**
 * 全站客户端行为
 *
 * 这里只处理跨页面存在的小型交互：主题、滚动揭示、导航状态、移动端菜单、
 * 返回顶部。页面私有的交互（Banner 一言、新闻筛选）放在各自组件内。
 */

import { motionConfig, themeConfig } from "../config";

const root = document.documentElement;
const reduceMotion = window.matchMedia(
	"(prefers-reduced-motion: reduce)",
).matches;

if (reduceMotion) {
	for (const video of document.querySelectorAll<HTMLVideoElement>("video")) {
		video.pause();
		video.removeAttribute("autoplay");
	}
}
const motionEnabled = root.dataset.motion !== "off";
const revealEnabled = root.dataset.reveal !== "off";

function syncPageVisibility() {
	root.toggleAttribute("data-page-hidden", document.hidden);
}

syncPageVisibility();
document.addEventListener("visibilitychange", syncPageVisibility);

/**
 * 把多个滚动回调合并到同一个 rAF 里执行。
 * 每个回调都会读 layout（getBoundingClientRect / scrollHeight），
 * 分开监听会让滚动时反复强制同步布局。
 */
const scrollHandlers: Array<() => void> = [];
let scrollQueued = false;

function onScrollFrame() {
	if (scrollQueued) {
		return;
	}

	scrollQueued = true;
	requestAnimationFrame(() => {
		scrollQueued = false;
		for (const handler of scrollHandlers) {
			handler();
		}
	});
}

function addScrollHandler(handler: () => void) {
	scrollHandlers.push(handler);
}

window.addEventListener("scroll", onScrollFrame, { passive: true });

/* ------------------------------------------------------------------ */
/* 主题                                                                */
/* ------------------------------------------------------------------ */

interface ViewTransitionLike {
	ready: Promise<void>;
}

type ViewTransitionDocument = Document & {
	startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

type PseudoElementOptions = KeyframeAnimationOptions & {
	pseudoElement: string;
};

const themeTransition = document.querySelector<HTMLElement>(
	"[data-theme-transition]",
);
const themeTransitionLabel = document.querySelector<HTMLElement>(
	"[data-theme-transition-label]",
);
let themeTimer = 0;

function applyTheme(theme: "light" | "dark") {
	root.dataset.theme = theme;
	root.dataset.themeMode = theme;
	try {
		localStorage.setItem(themeConfig.storageKey, theme);
	} catch {
		// 隐私模式下无法写入，忽略即可
	}
}

function playThemeHud(theme: "light" | "dark", x: number, y: number) {
	if (!themeTransition || !motionEnabled || reduceMotion) {
		return;
	}

	themeTransition.style.setProperty("--tx", `${x}px`);
	themeTransition.style.setProperty("--ty", `${y}px`);
	if (themeTransitionLabel) {
		themeTransitionLabel.textContent =
			theme === "dark" ? "MODE // DARK" : "MODE // LIGHT";
	}

	themeTransition.classList.remove("is-active");
	void themeTransition.offsetWidth;
	themeTransition.classList.add("is-active");

	window.clearTimeout(themeTimer);
	themeTimer = window.setTimeout(() => {
		themeTransition.classList.remove("is-active");
	}, 1200);
}

function playThemeReveal(x: number, y: number) {
	const radius = Math.hypot(
		Math.max(x, window.innerWidth - x),
		Math.max(y, window.innerHeight - y),
	);

	document.documentElement.animate(
		{
			clipPath: [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${radius}px at ${x}px ${y}px)`,
			],
			transform: [
				"translateY(10px) scale(1.012)",
				"translateY(0) scale(1)",
			],
			filter: ["blur(5px)", "blur(0px)"],
		},
		{
			duration: 900,
			easing: "cubic-bezier(0.22, 1, 0.36, 1)",
			pseudoElement: "::view-transition-new(root)",
		} as PseudoElementOptions,
	);
}

function setTheme(theme: "light" | "dark", origin?: HTMLElement) {
	const rect = origin?.getBoundingClientRect();
	const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
	const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
	const apply = () => applyTheme(theme);
	const canViewTransition =
		motionEnabled &&
		!reduceMotion &&
		typeof (document as ViewTransitionDocument).startViewTransition ===
			"function";

	if (canViewTransition) {
		try {
			const transition = (
				document as ViewTransitionDocument
			).startViewTransition?.(apply);

			if (transition) {
				transition.ready
					.then(() => {
						playThemeHud(theme, x, y);
						playThemeReveal(x, y);
					})
					.catch(() => {
						apply();
						playThemeHud(theme, x, y);
					});
				return;
			}
		} catch {
			// 某些浏览器会在连续切换时拒绝新的 view transition
		}
	}

	apply();
	playThemeHud(theme, x, y);
}

document
	.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")
	.forEach((button) => {
		button.addEventListener("click", () => {
			setTheme(root.dataset.theme === "dark" ? "light" : "dark", button);
		});
	});

/* ------------------------------------------------------------------ */
/* 滚动揭示                                                            */
/* ------------------------------------------------------------------ */

const revealElements = Array.from(
	document.querySelectorAll<HTMLElement>("[data-reveal]"),
);

if (
	!motionEnabled ||
	!revealEnabled ||
	reduceMotion ||
	!("IntersectionObserver" in window)
) {
	revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
	const observer = new IntersectionObserver(
		(entries, instance) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}
				entry.target.classList.add("is-visible");
				instance.unobserve(entry.target);
			}
		},
		{
			rootMargin: "0px 0px -2% 0px",
			threshold: 0.08,
		},
	);

	revealElements.forEach((element) => observer.observe(element));
}

/* ------------------------------------------------------------------ */
/* 导航栏                                                              */
/* ------------------------------------------------------------------ */

const snapRoot = document.documentElement;
const snapSections = Array.from(
	document.querySelectorAll<HTMLElement>(".snap-section"),
);

function syncSnapFit() {
	if (snapRoot.dataset.snap !== "on" || snapSections.length === 0) {
		return;
	}

	const viewport = window.innerHeight;
	const hasTallSection = snapSections.some(
		(section) => section.offsetHeight > viewport + 2,
	);

	snapRoot.dataset.snapFit = hasTallSection ? "off" : "on";
}

if (snapRoot.dataset.snap === "on") {
	syncSnapFit();
	window.addEventListener("resize", syncSnapFit, { passive: true });
	document.fonts?.ready.then(syncSnapFit);
}

const header = document.querySelector<HTMLElement>("[data-site-header]");

if (header) {
	const overHero = header.dataset.overHero === "true";

	if (!overHero) {
		header.classList.add("is-solid");
	} else {
		const hero = document.querySelector<HTMLElement>("[data-hero]");

		const syncHeader = () => {
			const headerHeight = header.getBoundingClientRect().height || 64;
			const solid = hero
				? hero.getBoundingClientRect().bottom <= headerHeight
				: window.scrollY > 24;
			header.classList.toggle("is-solid", solid);
		};

		syncHeader();
		addScrollHandler(syncHeader);
		window.addEventListener("resize", syncHeader);
	}
}

/* ------------------------------------------------------------------ */
/* 移动端菜单                                                          */
/* ------------------------------------------------------------------ */

const menu = document.querySelector<HTMLElement>("[data-mobile-menu]");
const menuToggle =
	document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menuClose =
	document.querySelector<HTMLButtonElement>("[data-menu-close]");
let previousFocus: HTMLElement | null = null;

function setMenuOpen(open: boolean) {
	if (!menu || !menuToggle) {
		return;
	}

	menu.classList.toggle("is-open", open);
	menu.setAttribute("aria-hidden", String(!open));
	menu.inert = !open;
	menuToggle.setAttribute("aria-expanded", String(open));
	document.body.classList.toggle("is-locked", open);

	if (open) {
		previousFocus = document.activeElement as HTMLElement | null;
		const firstFocusable =
			menu.querySelector<HTMLElement>("button, a[href]");
		firstFocusable?.focus();
	} else if (previousFocus) {
		previousFocus.focus();
	}
}

menuToggle?.addEventListener("click", () => setMenuOpen(true));
menuClose?.addEventListener("click", () => setMenuOpen(false));

menu?.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
	link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && menu?.classList.contains("is-open")) {
		setMenuOpen(false);
	}
});

// 简单的焦点陷阱，保证菜单打开时键盘不会跑到页面背后
menu?.addEventListener("keydown", (event) => {
	if (event.key !== "Tab") {
		return;
	}

	const focusable = Array.from(
		menu.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
		),
	).filter((element) => element.offsetParent !== null);

	if (focusable.length === 0) {
		return;
	}

	const first = focusable[0];
	const last = focusable[focusable.length - 1];

	if (event.shiftKey && document.activeElement === first) {
		event.preventDefault();
		last.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first.focus();
	}
});

window.addEventListener("resize", () => {
	if (window.innerWidth > 900) {
		setMenuOpen(false);
	}
});

/* ------------------------------------------------------------------ */
/* 返回顶部                                                            */
/* ------------------------------------------------------------------ */

const scrollTop =
	document.querySelector<HTMLButtonElement>("[data-scroll-top]");

if (scrollTop) {
	const syncScrollTop = () => {
		scrollTop.classList.toggle("is-visible", window.scrollY > 640);
	};

	syncScrollTop();
	addScrollHandler(syncScrollTop);

	scrollTop.addEventListener("click", () => {
		if (!motionEnabled || reduceMotion) {
			window.scrollTo({ top: 0, behavior: "auto" });
			return;
		}

		const start = window.scrollY;
		const duration = 900;
		const startedAt = performance.now();
		const previousBehavior = document.documentElement.style.scrollBehavior;

		document.documentElement.style.scrollBehavior = "auto";
		scrollTop.classList.add("is-returning");
		scrollTop.style.setProperty("--return-progress", "0");

		const tick = (now: number) => {
			const progress = Math.min(1, (now - startedAt) / duration);
			const eased =
				progress < 0.5
					? 4 * progress * progress * progress
					: 1 - Math.pow(-2 * progress + 2, 3) / 2;

			window.scrollTo(0, start * (1 - eased));
			scrollTop.style.setProperty("--return-progress", `${eased}`);

			if (progress < 1) {
				requestAnimationFrame(tick);
			} else {
				scrollTop.classList.remove("is-returning");
				scrollTop.style.setProperty("--return-progress", "0");
				document.documentElement.style.scrollBehavior =
					previousBehavior;
			}
		};

		requestAnimationFrame(tick);
	});
}

/* ------------------------------------------------------------------ */
/* 右侧轨道进度                                                        */
/* ------------------------------------------------------------------ */

const orbitProgress = document.querySelector<HTMLElement>(
	"[data-orbit-progress]",
);

if (orbitProgress) {
	const syncOrbitProgress = () => {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		const progress =
			max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
		orbitProgress.style.setProperty(
			"--progress",
			`${(progress * 100).toFixed(3)}%`,
		);
	};

	syncOrbitProgress();
	addScrollHandler(syncOrbitProgress);
	window.addEventListener("resize", syncOrbitProgress);
}

/* ------------------------------------------------------------------ */
/* 页面加载揭示                                                        */
/* ------------------------------------------------------------------ */

const loadingVeil = document.querySelector<HTMLElement>("[data-loading-veil]");

if (loadingVeil) {
	if (!motionEnabled || reduceMotion) {
		loadingVeil.remove();
	} else {
		let hidden = false;

		const hideVeil = () => {
			if (hidden) {
				return;
			}

			hidden = true;
			loadingVeil.classList.add("is-done");
			window.setTimeout(() => loadingVeil.remove(), 1400);
		};

		if (document.readyState === "complete") {
			window.setTimeout(hideVeil, 420);
		} else {
			window.addEventListener(
				"load",
				() => window.setTimeout(hideVeil, 420),
				{ once: true },
			);
		}

		window.setTimeout(hideVeil, 2200);
	}
}

/* ------------------------------------------------------------------ */
/* 首屏档案扫描（全站只执行一次）                                      */
/* ------------------------------------------------------------------ */

const hero = document.querySelector<HTMLElement>(".hero");
const heroScanKey = "astrorbit-hero-scan";

if (hero && motionConfig.signature.heroScan && motionEnabled && !reduceMotion) {
	let scanned = false;

	try {
		scanned = sessionStorage.getItem(heroScanKey) === "1";
	} catch {
		scanned = false;
	}

	if (!scanned) {
		requestAnimationFrame(() => {
			hero.classList.add("is-scanning");
			try {
				sessionStorage.setItem(heroScanKey, "1");
			} catch {
				// 隐私模式下无法写入，忽略即可
			}
			window.setTimeout(() => {
				hero.classList.remove("is-scanning");
			}, 1300);
		});
	}
}

/* ------------------------------------------------------------------ */
/* 装饰图元：进入视口时启动，离开时停止漂移                            */
/* ------------------------------------------------------------------ */

const driftFields = Array.from(
	document.querySelectorAll<HTMLElement>("[data-field-drift]"),
);
const drawFields = Array.from(
	document.querySelectorAll<SVGElement>("[data-contour]"),
);
const rayFields = Array.from(
	document.querySelectorAll<HTMLElement>("[data-ray-field]"),
);
const fieldElements = [...driftFields, ...drawFields, ...rayFields];

if (
	!motionEnabled ||
	!revealEnabled ||
	reduceMotion ||
	!("IntersectionObserver" in window)
) {
	drawFields.forEach((element) => element.classList.add("is-drawn"));
	rayFields.forEach((element) => element.classList.add("is-open"));
} else if (fieldElements.length > 0) {
	const fieldObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const element = entry.target as HTMLElement;

				if (!entry.isIntersecting) {
					if (element.hasAttribute("data-field-drift")) {
						element.classList.remove("is-drift");
					}
					continue;
				}

				if (element.hasAttribute("data-field-drift")) {
					element.classList.add("is-drift");
				}

				if (element.hasAttribute("data-contour")) {
					element.classList.add("is-drawn");
					fieldObserver.unobserve(element);
				}

				if (element.hasAttribute("data-ray-field")) {
					element.classList.add("is-open");
					fieldObserver.unobserve(element);
				}
			}
		},
		{ threshold: 0.12 },
	);

	fieldElements.forEach((element) => fieldObserver.observe(element));
}

/* ------------------------------------------------------------------ */
/* 统计数字增长                                                        */
/* ------------------------------------------------------------------ */

const countTargets = Array.from(
	document.querySelectorAll<HTMLElement>("[data-count]"),
);

if (
	countTargets.length > 0 &&
	motionConfig.narrative.statsCount &&
	motionEnabled &&
	revealEnabled &&
	!reduceMotion &&
	"IntersectionObserver" in window
) {
	const countObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}

				const element = entry.target as HTMLElement;
				const target = Number(element.dataset.count);

				if (!Number.isFinite(target)) {
					countObserver.unobserve(element);
					continue;
				}

				const width = element.textContent?.trim().length ?? 0;
				const startedAt = performance.now();
				const duration = 700;

				const tick = (now: number) => {
					const progress = Math.min(1, (now - startedAt) / duration);
					const eased = 1 - Math.pow(1 - progress, 3);
					const value = Math.round(target * eased);
					element.textContent = String(value).padStart(width, "0");

					if (progress < 1) {
						requestAnimationFrame(tick);
					}
				};

				requestAnimationFrame(tick);
				countObserver.unobserve(element);
			}
		},
		{ threshold: 0.4 },
	);

	countTargets.forEach((element) => countObserver.observe(element));
}

/* ------------------------------------------------------------------ */
/* 产品卡透视                                                          */
/* ------------------------------------------------------------------ */

const tiltCards = Array.from(
	document.querySelectorAll<HTMLElement>("[data-tilt]"),
);
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (
	tiltCards.length > 0 &&
	finePointer &&
	motionConfig.feedback.cardTilt &&
	motionEnabled &&
	!reduceMotion
) {
	// 产品卡透视：跟随指针 ±6°，离开复位

	for (const card of tiltCards) {
		let frame = 0;

		const reset = () => {
			card.style.setProperty("--rx", "0deg");
			card.style.setProperty("--ry", "0deg");
		};

		card.addEventListener("pointermove", (event) => {
			if (frame) {
				return;
			}

			frame = requestAnimationFrame(() => {
				frame = 0;
				const rect = card.getBoundingClientRect();
				const x = (event.clientX - rect.left) / rect.width - 0.5;
				const y = (event.clientY - rect.top) / rect.height - 0.5;
				card.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
				card.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
			});
		});

		card.addEventListener("pointerleave", reset);
		card.addEventListener("blur", reset, true);
	}
}

/* ------------------------------------------------------------------ */
/* 首屏鼠标视差                                                        */
/* ------------------------------------------------------------------ */

const heroStage = document.querySelector<HTMLElement>(".hero");

if (
	heroStage &&
	finePointer &&
	motionConfig.ambient.heroOrbit &&
	motionEnabled &&
	!reduceMotion
) {
	let heroFrame = 0;
	let pendingX = 0;
	let pendingY = 0;

	// 每帧只在 pointermove 真正发生时写一次变量。
	// 把鼠标坐标合并到同一帧再写，避免高频事件触发的重复样式重算。
	heroStage.addEventListener("pointermove", (event) => {
		pendingX = event.clientX;
		pendingY = event.clientY;

		if (heroFrame) {
			return;
		}

		heroFrame = requestAnimationFrame(() => {
			heroFrame = 0;
			const x = pendingX / window.innerWidth - 0.5;
			const y = pendingY / window.innerHeight - 0.5;
			heroStage.style.setProperty(
				"--hero-px",
				`${(x * 18).toFixed(1)}px`,
			);
			heroStage.style.setProperty(
				"--hero-py",
				`${(y * 14).toFixed(1)}px`,
			);
			heroStage.style.setProperty(
				"--spot-x",
				`${((pendingX / window.innerWidth) * 100).toFixed(1)}%`,
			);
			heroStage.style.setProperty(
				"--spot-y",
				`${((pendingY / window.innerHeight) * 100).toFixed(1)}%`,
			);
		});
	});

	heroStage.addEventListener("pointerleave", () => {
		heroStage.style.setProperty("--hero-px", "0px");
		heroStage.style.setProperty("--hero-py", "0px");
		heroStage.style.setProperty("--spot-x", "50%");
		heroStage.style.setProperty("--spot-y", "50%");
	});
}

/* ------------------------------------------------------------------ */
/* 区块镜头运动：进入视口时背景缓慢归位                                */
/* ------------------------------------------------------------------ */

const motionSections = Array.from(
	document.querySelectorAll<HTMLElement>(".home-section, .page-hero"),
);

if (
	motionSections.length > 0 &&
	motionEnabled &&
	motionConfig.ambient.sectionDrift &&
	!reduceMotion &&
	"IntersectionObserver" in window
) {
	const sectionObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				entry.target.classList.toggle(
					"is-in-view",
					entry.isIntersecting,
				);
			}
		},
		{ threshold: 0.35 },
	);

	motionSections.forEach((element) => sectionObserver.observe(element));

	let shiftFrame = 0;

	const syncSectionShift = () => {
		const viewport = window.innerHeight;

		for (const section of motionSections) {
			const rect = section.getBoundingClientRect();
			const progress = Math.max(
				-1,
				Math.min(
					1,
					(rect.top + rect.height / 2 - viewport / 2) / viewport,
				),
			);
			section.style.setProperty(
				"--section-shift",
				`${(progress * 60).toFixed(1)}px`,
			);
		}
	};

	const onSectionScroll = () => {
		if (shiftFrame) {
			return;
		}

		shiftFrame = requestAnimationFrame(() => {
			shiftFrame = 0;
			syncSectionShift();
		});
	};

	syncSectionShift();
	addScrollHandler(onSectionScroll);
	window.addEventListener("resize", onSectionScroll);
}

/* ------------------------------------------------------------------ */
/* 每个分块的鼠标聚光                                                  */
/* ------------------------------------------------------------------ */

if (
	motionSections.length > 0 &&
	finePointer &&
	motionEnabled &&
	!reduceMotion
) {
	for (const section of motionSections) {
		let spotFrame = 0;

		section.addEventListener("pointermove", (event) => {
			if (spotFrame) {
				return;
			}

			spotFrame = requestAnimationFrame(() => {
				spotFrame = 0;
				const rect = section.getBoundingClientRect();
				section.style.setProperty(
					"--spot-x",
					`${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`,
				);
				section.style.setProperty(
					"--spot-y",
					`${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`,
				);
			});
		});

		section.addEventListener("pointerleave", () => {
			section.style.setProperty("--spot-x", "50%");
			section.style.setProperty("--spot-y", "50%");
		});
	}
}

/* ------------------------------------------------------------------ */
/* Canvas 粒子层                                                       */
/* ------------------------------------------------------------------ */

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	r: number;
	ox: number;
	oy: number;
}

function initParticleField(canvas: HTMLCanvasElement) {
	const context = canvas.getContext("2d");

	if (!context) {
		return;
	}

	const parent = canvas.parentElement;
	const count = Math.max(8, Number(canvas.dataset.count) || 28);
	const dpr = Math.min(window.devicePixelRatio || 1, 2);
	const color = getComputedStyle(canvas).color;
	const pointer = { x: -9999, y: -9999 };
	let width = 1;
	let height = 1;
	let particles: Particle[] = [];
	let frame = 0;

	const resize = () => {
		const rect = canvas.getBoundingClientRect();
		width = Math.max(1, rect.width);
		height = Math.max(1, rect.height);
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		context.setTransform(dpr, 0, 0, dpr, 0, 0);

		if (particles.length === 0) {
			particles = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.45,
				vy: (Math.random() - 0.5) * 0.45,
				r: 1.2 + Math.random() * 2.2,
				ox: 0,
				oy: 0,
			}));
		}
	};

	const render = (animate: boolean) => {
		context.clearRect(0, 0, width, height);

		for (const particle of particles) {
			if (animate) {
				particle.x += particle.vx;
				particle.y += particle.vy;

				if (particle.x < 0) {
					particle.x = width;
				}
				if (particle.x > width) {
					particle.x = 0;
				}
				if (particle.y < 0) {
					particle.y = height;
				}
				if (particle.y > height) {
					particle.y = 0;
				}
			}

			const dx = particle.x - pointer.x;
			const dy = particle.y - pointer.y;
			const distance = Math.hypot(dx, dy);

			if (distance > 0.1 && distance < 150) {
				const force = (1 - distance / 150) * 1.2;
				particle.ox = (particle.ox + (dx / distance) * force) * 0.9;
				particle.oy = (particle.oy + (dy / distance) * force) * 0.9;
			} else {
				particle.ox *= 0.92;
				particle.oy *= 0.92;
			}

			context.globalAlpha = 0.45;
			context.fillStyle = color;
			context.beginPath();
			context.arc(
				particle.x + particle.ox,
				particle.y + particle.oy,
				particle.r,
				0,
				Math.PI * 2,
			);
			context.fill();
		}

		context.globalAlpha = 0.12;
		context.strokeStyle = color;
		context.lineWidth = 1;
		context.beginPath();

		const linkSq = 170 * 170;

		for (let i = 0; i < particles.length; i += 1) {
			const a = particles[i];
			for (let j = i + 1; j < particles.length; j += 1) {
				const b = particles[j];
				const dx = a.x - b.x;
				const dy = a.y - b.y;

				// 平方距离比较，省掉每对粒子的开方
				if (dx * dx + dy * dy < linkSq) {
					context.moveTo(a.x + a.ox, a.y + a.oy);
					context.lineTo(b.x + b.ox, b.y + b.oy);
				}
			}
		}

		// 整帧只描边一次，而不是每对粒子一次
		context.stroke();

		context.globalAlpha = 1;
	};

	const start = () => {
		if (frame || reduceMotion) {
			return;
		}

		const loop = () => {
			render(true);
			frame = requestAnimationFrame(loop);
		};

		frame = requestAnimationFrame(loop);
	};

	const stop = () => {
		if (frame) {
			cancelAnimationFrame(frame);
			frame = 0;
		}
	};

	resize();
	render(false);

	if (!reduceMotion) {
		start();

		// 离屏暂停：区块滚出视口后停止绘制，避免整页多个 Canvas 同时跑
		if ("IntersectionObserver" in window) {
			const fieldIO = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							start();
						} else {
							stop();
						}
					}
				},
				{ rootMargin: "150px" },
			);
			fieldIO.observe(canvas);
		}

		window.addEventListener("resize", () => {
			resize();
			render(false);
		});

		parent?.addEventListener("pointermove", (event) => {
			const rect = canvas.getBoundingClientRect();
			pointer.x = event.clientX - rect.left;
			pointer.y = event.clientY - rect.top;
		});

		parent?.addEventListener("pointerleave", () => {
			pointer.x = -9999;
			pointer.y = -9999;
		});

		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				stop();
			} else {
				start();
			}
		});
	}
}

const particleCanvases = Array.from(
	document.querySelectorAll<HTMLCanvasElement>("[data-particles]"),
);

if (
	particleCanvases.length > 0 &&
	motionConfig.decor.particles &&
	motionEnabled
) {
	for (const canvas of particleCanvases) {
		initParticleField(canvas);
	}
}

/* ------------------------------------------------------------------ */
/* 粒子回响：文字 / 图片采样，鼠标搅动与弹簧回位                       */
/* ------------------------------------------------------------------ */

interface EchoParticle {
	x: number;
	y: number;
	tx: number;
	ty: number;
	vx: number;
	vy: number;
	k: number;
	size: number;
	color: string;
	alpha: number;
	/** 自主漂移相位，让粒子在无鼠标时也缓慢游荡 */
	phase: number;
}

function initParticleEcho(canvas: HTMLCanvasElement) {
	const context = canvas.getContext("2d");

	if (!context) {
		return;
	}

	const mode = canvas.dataset.mode === "image" ? "image" : "text";
	const text = canvas.dataset.text || "祁阳一中";
	const imageUrl = canvas.dataset.image || "";
	const count = Math.max(800, Number(canvas.dataset.count) || 3600);
	const stir = Math.max(0, Math.min(100, Number(canvas.dataset.stir) || 40));
	const spring = Math.max(
		0,
		Math.min(100, Number(canvas.dataset.spring) || 10),
	);
	const scale = Math.max(0.2, Number(canvas.dataset.scale) || 1);
	const opacity = Math.max(
		0,
		Math.min(1, Number(canvas.dataset.opacity) || 0.72),
	);
	const figureSize = Math.max(0.1, Number(canvas.dataset.figureSize) || 1);
	const offsetX = Number(canvas.dataset.offsetX) || 0;
	const offsetY = Number(canvas.dataset.offsetY) || 0;
	// 边缘渐隐：默认开启；数据集里是字符串，只有显式 "false" 才关闭
	const edgeFade = canvas.dataset.edgeFade !== "false";
	const edgeFadeWidth = Math.max(
		0.05,
		Math.min(0.6, Number(canvas.dataset.edgeFadeWidth) || 0.24),
	);
	const accent = getComputedStyle(canvas).color;
	// 粒子回响是全屏画布，DPR 2 在 2x 屏上是 500 万+ 像素；
	// 粒子是 1–3px 的小方块，降到 1.5 几乎看不出差别，像素量减少约 44%
	const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
	const pointer = {
		x: -9999,
		y: -9999,
		vx: 0,
		vy: 0,
		lastX: -1,
		lastY: -1,
	};
	// 最近一次交互时间，用于无交互时降频而不是停帧
	let lastInteraction = 0;
	let width = 1;
	let height = 1;
	let particles: EchoParticle[] = [];
	let frame = 0;
	let ready = false;

	const createBuffer = () => {
		const buffer = document.createElement("canvas");
		buffer.width = Math.max(1, Math.round(width));
		buffer.height = Math.max(1, Math.round(height));
		return buffer;
	};

	// 图形采样区域：默认位于视口右侧约 69% 处、垂直约 29% 处。
	// figureSize 围绕中心缩放宽高，offsetX / offsetY 平移中心（占视口比例）。
	const getRegion = () => {
		const baseCenterX = width * 0.69;
		const baseCenterY = height * 0.29;
		const centerX = baseCenterX + width * offsetX;
		const centerY = baseCenterY + height * offsetY;
		const regionWidth = width * 0.52 * figureSize;
		const regionHeight = height * 0.38 * figureSize;

		return {
			width: regionWidth,
			height: regionHeight,
			left: centerX - regionWidth / 2,
			top: centerY - regionHeight / 2,
			centerX,
			centerY,
		};
	};

	const sampleText = () => {
		const buffer = createBuffer();
		const ctx = buffer.getContext("2d", { willReadFrequently: true });

		if (!ctx) {
			return null;
		}

		const region = getRegion();
		const regionWidth = region.width;
		const regionHeight = region.height;
		const centerX = region.centerX;
		const centerY = region.centerY;

		ctx.clearRect(0, 0, buffer.width, buffer.height);
		ctx.fillStyle = "#fff";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		const fontSize = Math.min(
			regionHeight * 0.52,
			regionWidth / Math.max(1, text.length * 0.9),
		);
		ctx.font = `700 ${fontSize}px "Noto Sans SC", "Source Han Sans SC", "Microsoft YaHei", sans-serif`;
		ctx.fillText(text, centerX, centerY);

		return ctx.getImageData(0, 0, buffer.width, buffer.height);
	};

	const sampleImage = async () => {
		if (!imageUrl) {
			return null;
		}

		const image = new Image();
		image.crossOrigin = "anonymous";
		image.src = imageUrl;

		try {
			await image.decode();
		} catch {
			return null;
		}

		const buffer = createBuffer();
		const ctx = buffer.getContext("2d", { willReadFrequently: true });

		if (!ctx) {
			return null;
		}

		const region = getRegion();
		const regionWidth = region.width;
		const regionHeight = region.height;
		const regionLeft = region.left;
		const regionTop = region.top;
		const fit = Math.max(
			regionWidth / image.width,
			regionHeight / image.height,
		);
		const drawWidth = image.width * fit;
		const drawHeight = image.height * fit;

		ctx.clearRect(0, 0, buffer.width, buffer.height);
		ctx.drawImage(
			image,
			regionLeft + (regionWidth - drawWidth) / 2,
			regionTop + (regionHeight - drawHeight) / 2,
			drawWidth,
			drawHeight,
		);

		try {
			return ctx.getImageData(0, 0, buffer.width, buffer.height);
		} catch {
			return null;
		}
	};

	const buildParticles = (data: ImageData | null) => {
		particles = [];
		ready = false;

		if (!data) {
			return;
		}

		const pixels = data.data;
		const step = Math.max(
			1,
			Math.floor(Math.sqrt((width * height) / (count * 2.2))),
		);
		const visible: { x: number; y: number; color: string }[] = [];

		for (let y = 0; y < data.height; y += step) {
			for (let x = 0; x < data.width; x += step) {
				const index = (y * data.width + x) * 4;

				if (pixels[index + 3] < 40) {
					continue;
				}

				visible.push({
					x,
					y,
					color:
						mode === "image"
							? `rgb(${pixels[index]}, ${pixels[index + 1]}, ${pixels[index + 2]})`
							: accent,
				});
			}
		}

		if (visible.length === 0) {
			return;
		}

		let minX = Infinity;
		let maxX = -Infinity;
		let minY = Infinity;
		let maxY = -Infinity;

		for (const point of visible) {
			minX = Math.min(minX, point.x);
			maxX = Math.max(maxX, point.x);
			minY = Math.min(minY, point.y);
			maxY = Math.max(maxY, point.y);
		}

		const centerX = (minX + maxX) / 2;
		const centerY = (minY + maxY) / 2;
		const halfWidth = Math.max(1, (maxX - minX) / 2);
		const halfHeight = Math.max(1, (maxY - minY) / 2);
		const limit = Math.min(count, visible.length);
		const stride = visible.length / limit;

		for (let index = 0; index < limit; index += 1) {
			const point = visible[Math.floor(index * stride)];
			const angle = Math.random() * Math.PI * 2;
			const distance = Math.random() * 5;

			const dx = Math.abs(point.x - centerX) / halfWidth;
			const dy = Math.abs(point.y - centerY) / halfHeight;
			const edgeDistance = Math.max(dx, dy);
			const edgeAngle = Math.atan2(dy, dx);
			const noise =
				Math.sin(edgeAngle * 5 + 1.3) * 0.08 +
				Math.sin(edgeAngle * 9 - 2.1) * 0.045 +
				Math.sin(point.x * 0.018 + point.y * 0.013) * 0.04;
			// 边缘渐隐：越靠近图形外缘 alpha 越低，轮廓更柔和。
			// 关闭时所有粒子走同一套随机亮度，边缘与中心一样实。
			const edgeAlpha = edgeFade
				? 1 -
					(edgeDistance - (0.82 + noise - edgeFadeWidth)) /
						edgeFadeWidth
				: 1;
			const alpha =
				Math.max(0.2, Math.min(1, edgeAlpha)) *
				(0.75 + Math.random() * 0.25);

			particles.push({
				x: point.x + Math.cos(angle) * distance,
				y: point.y + Math.sin(angle) * distance,
				tx: point.x + (Math.random() - 0.5) * 2,
				ty: point.y + (Math.random() - 0.5) * 2,
				vx: 0,
				vy: 0,
				k:
					(0.0008 + (spring / 100) * 0.014) *
					(0.75 + Math.random() * 0.5),
				size: (1.4 + Math.random() * 1.8) * scale,
				color: point.color,
				alpha: alpha * opacity,
				phase: Math.random() * Math.PI * 2,
			});
		}

		ready = true;
	};

	const render = (animate: boolean) => {
		context.clearRect(0, 0, width, height);

		if (!ready) {
			return;
		}

		const stirForce = (stir / 100) * 1.4;
		const radius = 130;
		// 自主漂移：即使没有鼠标，粒子也在目标点附近缓慢游荡，
		// 而不是死贴目标点变成一张静态图
		const driftT = performance.now() * 0.00035;

		if (mode === "text") {
			context.fillStyle = accent;
		}

		for (const particle of particles) {
			if (animate) {
				// 每个粒子绕目标点做小幅圆周漂移（半径约 2px，周期各不相同）
				const wobble = driftT + particle.phase;
				const driftX = Math.cos(wobble) * 2;
				const driftY = Math.sin(wobble * 1.3) * 2;

				let ax = (particle.tx + driftX - particle.x) * particle.k;
				let ay = (particle.ty + driftY - particle.y) * particle.k;

				const dx = particle.x - pointer.x;
				const dy = particle.y - pointer.y;
				const distSq = dx * dx + dy * dy;

				// 先用平方距离筛掉范围外的粒子，只有命中才开方
				if (distSq > 0.01 && distSq < radius * radius) {
					const distance = Math.sqrt(distSq);
					const falloff = 1 - distance / radius;
					ax += (-dy / distance) * stirForce * falloff;
					ay += (dx / distance) * stirForce * falloff;
					ax += pointer.vx * falloff * 0.28;
					ay += pointer.vy * falloff * 0.28;
				}

				particle.vx = (particle.vx + ax) * 0.9;
				particle.vy = (particle.vy + ay) * 0.9;
				particle.x += particle.vx;
				particle.y += particle.vy;
			}

			if (mode !== "text") {
				context.fillStyle = particle.color;
			}

			context.globalAlpha = particle.alpha;
			context.fillRect(
				particle.x,
				particle.y,
				particle.size,
				particle.size,
			);
		}

		context.globalAlpha = 1;
		pointer.vx *= 0.85;
		pointer.vy *= 0.85;
	};

	const start = () => {
		if (frame || reduceMotion || !ready) {
			return;
		}

		// 无交互时降到 20fps 持续漂移，有交互时回到 60fps。
		// 粒子始终在动（保留「游荡」的观感），静止时 GPU 占用约 3%。
		const IDLE_FPS = 20;
		const IDLE_AFTER = 800;
		let lastDraw = 0;

		const loop = (now: number) => {
			const idle = now - lastInteraction > IDLE_AFTER;
			const interval = idle ? 1000 / IDLE_FPS : 0;

			if (now - lastDraw >= interval) {
				lastDraw = now;
				render(true);
			}

			frame = requestAnimationFrame(loop);
		};

		frame = requestAnimationFrame(loop);
	};

	const stop = () => {
		if (frame) {
			cancelAnimationFrame(frame);
			frame = 0;
		}
	};

	const resize = async () => {
		const rect = canvas.getBoundingClientRect();
		width = Math.max(1, rect.width);
		height = Math.max(1, rect.height);
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		context.setTransform(dpr, 0, 0, dpr, 0, 0);

		const data =
			mode === "image"
				? ((await sampleImage()) ?? sampleText())
				: sampleText();

		buildParticles(data);
		render(false);
		start();
	};

	void resize();

	if (reduceMotion) {
		return;
	}

	window.addEventListener("resize", () => {
		void resize();
	});

	window.addEventListener("pointermove", (event) => {
		pointer.x = event.clientX;
		pointer.y = event.clientY;

		if (pointer.lastX >= 0 && pointer.lastY >= 0) {
			pointer.vx = Math.max(-24, Math.min(24, pointer.x - pointer.lastX));
			pointer.vy = Math.max(-24, Math.min(24, pointer.y - pointer.lastY));
		}

		pointer.lastX = pointer.x;
		pointer.lastY = pointer.y;

		// 记录交互时间并唤醒降频后的循环
		lastInteraction = performance.now();
		start();
	});

	document.addEventListener("pointerleave", () => {
		pointer.x = -9999;
		pointer.y = -9999;
		pointer.vx = 0;
		pointer.vy = 0;
		pointer.lastX = -1;
		pointer.lastY = -1;
	});

	window.addEventListener("click", (event) => {
		const x = event.clientX;
		const y = event.clientY;
		lastInteraction = performance.now();
		start();

		const hitSq = 150 * 150;

		for (const particle of particles) {
			const dx = particle.x - x;
			const dy = particle.y - y;
			const distSq = dx * dx + dy * dy;

			if (distSq > 0.01 && distSq < hitSq) {
				const distance = Math.sqrt(distSq);
				const force = (1 - distance / 150) * 2.2;
				particle.vx += (-dy / distance) * force;
				particle.vy += (dx / distance) * force;
			}
		}
	});

	document.addEventListener("visibilitychange", () => {
		if (document.hidden) {
			stop();
		} else {
			start();
		}
	});
}

const echoCanvases = Array.from(
	document.querySelectorAll<HTMLCanvasElement>("[data-particle-echo]"),
);

if (echoCanvases.length > 0 && motionConfig.enabled) {
	for (const canvas of echoCanvases) {
		initParticleEcho(canvas);
	}
}

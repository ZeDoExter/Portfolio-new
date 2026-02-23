<script lang="ts">
    import "./page.css";
    import { onMount, tick } from "svelte";
    import type { Project } from "$utils/data";
    import { afterNavigate } from "$app/navigation";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

    import LayoutA from "./layouts/LayoutA.svelte";
    import LayoutB from "./layouts/LayoutB.svelte";
    import LayoutC from "./layouts/LayoutC.svelte";

    export let data: { project: Project };

    let animationContext: gsap.Context;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Slight delay to ensure DOM is ready and layout is settled
        const initAnimations = async () => {
            await tick();

            animationContext = gsap.context(() => {
                // Animate Layout Containers
                gsap.from(
                    ".layout-a-container, .layout-b-container, .layout-c-container",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                );

                // Animate inner content
                const elements = gsap.utils.toArray([
                    ".sidebar-a > *",
                    ".content-a > *",
                    ".header-b > *",
                    ".top-grid-b > div",
                    ".banner-b",
                    ".bottom-grid-b > div",
                    ".row-c > *",
                    ".article-flow-c",
                ]);

                elements.forEach((el: any) => {
                    gsap.from(el, {
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                        opacity: 0,
                        y: 30,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                });
            });
        };

        initAnimations();

        return () => {
            animationContext?.revert();
        };
    });

    afterNavigate(() => {
        window.scrollTo(0, 0);
        // Re-run animations on navigation if needed, but onMount handles component remount
        ScrollTrigger.refresh();
    });

    function hashCode(str: string) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return Math.abs(hash);
    }

    // Determine layout 0, 1, or 2 based on hash
    let layoutIndex = hashCode(data.project.slug) % 3;
    if (data.project.layout) {
        const layoutMap: Record<string, number> = { A: 0, B: 1, C: 2 };
        const explicitLayout = data.project.layout.toUpperCase();
        if (layoutMap[explicitLayout] !== undefined) {
            layoutIndex = layoutMap[explicitLayout];
        }
    }
    const layouts = [LayoutA, LayoutB, LayoutC];
    const SelectedLayout = layouts[layoutIndex];

    const floatingWords = [
        "INSIGHT",
        "DESIGN",
        "CODE",
        "FUTURE",
        "LEGACY",
        "IMPACT",
        "MOTION",
        "CRAFT",
    ];

    // Date Logic
    const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
    ];
    const dateObjRaw = new Date(data.project.date || new Date());
    const dateObj = {
        day: dateObjRaw.getDate(),
        month: months[dateObjRaw.getMonth()],
        year: dateObjRaw.getFullYear(),
    };
</script>

<div class="page-wrapper">
    <!-- VERTICAL ANIMATION LEFT -->
    <div class="floating-text-container left">
        <div class="floater-track">
            {#each floatingWords as word}<span class="float-word">{word}</span
                >{/each}
            {#each floatingWords as word}<span class="float-word">{word}</span
                >{/each}
        </div>
    </div>

    <!-- MAIN CONTAINER -->
    <main class="main-sheet">
        <header class="unified-header">
            <h1 class="uh-title">{data.project.title}</h1>
            <div class="uh-line"></div>
            <div class="uh-date">
                {dateObj.month}
                {dateObj.day}, {dateObj.year}
            </div>
            <div class="uh-action-row">
                <a href="/" class="uh-back">&larr; BACK TO HOME</a>
            </div>
        </header>

        <svelte:component
            this={SelectedLayout}
            project={data.project}
            {dateObj}
        />
    </main>

    <!-- VERTICAL ANIMATION RIGHT -->
    <div class="floating-text-container right">
        <div class="floater-track reverse">
            {#each floatingWords as word}<span class="float-word">{word}</span
                >{/each}
            {#each floatingWords as word}<span class="float-word">{word}</span
                >{/each}
        </div>
    </div>
</div>

```

<style>
    .unified-header {
        width: 100%;
        margin-bottom: 2rem;
        text-align: center;
    }
    .uh-title {
        font-family: "Playfair Display", serif;
        font-weight: 900;
        font-size: clamp(3rem, 7vw, 5.5rem);
        text-transform: uppercase;
        margin: 0;
        line-height: 1.1;
        letter-spacing: -2px;
        color: #1a1a1a;
    }
    .uh-line {
        height: 4px;
        background: #000;
        margin: 10px 0;
        width: 100%;
    }
    .uh-date {
        font-family: "Oswald", sans-serif;
        font-size: 0.9rem;
        color: #444;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 2rem;
    }
    .uh-action-row {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 2rem;
    }
    .uh-back {
        display: inline-block;
        border: 1px solid #000;
        padding: 0.5rem 1.5rem;
        font-family: monospace;
        font-size: 0.85rem;
        font-weight: bold;
        color: #000;
        text-decoration: none;
        transition: all 0.2s;
        text-transform: uppercase;
    }
    .uh-back:hover {
        background: #000;
        color: #fff;
    }
</style>

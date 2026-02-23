<script lang="ts">
    import "./page.css";
    import { onMount, onDestroy, tick } from "svelte";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
    import Marquee from "$lib/components/Marquee.svelte";
    import type { Project } from "$lib/utils/data";

    export let data: { projects: Project[] };

    let mainTitle: HTMLElement;
    let gridContainer: HTMLElement;

    type GridItem = {
        type: "project";
        id: string;
        data: Project;
        gridClass: string;
    };

    let gridItems: GridItem[] = [];
    let ctx: gsap.Context;

    onMount(async () => {
        // Daily Seed Generator (Mulberry32)
        const today = new Date();
        const seedStr = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
        let seed = parseInt(seedStr, 10);
        function seededRandom() {
            var t = (seed += 0x6d2b79f5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        }

        // Prepare items
        let items: GridItem[] = data.projects.map((p) => {
            // Randomly assign grid class for variety using daily seed
            const randomType = seededRandom();
            let gClass = "card-vertical";
            if (randomType > 0.6) gClass = "card-horizontal";
            else if (randomType > 0.8) gClass = "card-vertical grid-col-2"; // Option for wide vertical

            return {
                type: "project",
                id: p.slug,
                data: p,
                gridClass: gClass,
            };
        });

        // The items are sorted by priority and date from data.ts
        gridItems = items;

        // Wait for the DOM to render the new {#each} block
        await tick();

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
            if (mainTitle) {
                gsap.fromTo(
                    mainTitle,
                    {
                        y: 50,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.5,
                        ease: "power4.out",
                    },
                );
            }

            gsap.utils.toArray(".grid-card").forEach((card: any) => {
                gsap.fromTo(
                    card,
                    {
                        y: 30,
                        opacity: 0,
                    },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                    },
                );
            });
        });
    });

    onDestroy(() => {
        ctx?.revert();
    });
</script>

<div class="newspaper-container">
    <!-- Header -->
    <header class="main-header hero-header">
        <div class="hero-top-bar">
            <div class="hero-side-text">
                <p>special</p>
                <p>EDITION</p>
            </div>
            <div class="hero-title">About Me</div>
            <div class="hero-side-text">
                <p>special</p>
                <p>EDITION</p>
            </div>
        </div>

        <div class="hero-black-bar">HELLO, MY NAME IS</div>

        <h1 class="hero-main-name" bind:this={mainTitle}>ZEDOEXTER</h1>

        <div class="hero-bottom-bar">
            <div class="hero-stat">
                <span class="stat-label">Role:</span>
                <span class="stat-value">Student</span>
            </div>
            <div class="hero-stat">
                <span class="stat-label">Location:</span>
                <span class="stat-value">KMITL</span>
            </div>
            <div class="hero-stat">
                <span class="stat-label">Experience:</span>
                <span class="stat-value">3 Years</span>
            </div>
            <div class="hero-stat">
                <span class="stat-label">Status:</span>
                <span class="stat-value">Ongoing</span>
            </div>
        </div>
    </header>

    <!-- Marquee Top -->
    <Marquee
        text="LATEST BROADCAST - EXPLORING THE INTERSECTION OF DESIGN AND CODE • DIGITAL ARCHIVES UNLOCKED • EXPERIMENTAL WEB INTERFACES • CREATING EXPERIENCES NOT JUST WEBSITES • WELCOME TO THE CREATIVE LAB • "
        speed={25}
    />

    <!-- Main Content Area -->
    <main class="page-content">
        <!-- About Hero Section (Like "Tartas Delivery" ad) -->
        <section class="about-hero">
            <div class="hero-content">
                <h2>About Me</h2>
                <h3>COMPUTER SCIENCE STUDENT | YEAR 3</h3>
                <p>
                    I’m a third-year Computer Science student driven by
                    curiosity and the desire to build something new. My
                    interests are wide, but when something truly captures me, I
                    dive deep — down to the architecture and core logic behind
                    it. Welcome to my space, where imagination meets code.
                </p>
                <div class="hero-decorative-lines"></div>
            </div>

            <div class="hero-image-placeholder-small">
                <!-- Place an image here later -->
                <div class="placeholder-img">IMG</div>
            </div>

            <!-- Moved Career History from Grid -->
            <aside class="hero-widget widget-card">
                <div class="card-inner">
                    <h3 class="widget-title">CAREER HISTORY</h3>
                    <ul class="career-list">
                        <!-- <li>
                            <strong>Indie Developer</strong><br />
                            <span>Self-Employed</span><br />
                            <small>2024 - Present</small>
                        </li> -->
                    </ul>
                </div>
            </aside>
        </section>

        <!-- Divider -->
        <div class="section-divider-thick"></div>

        <h2 class="section-title">FEATURED PROJECTS</h2>

        <!-- Masonry Grid for Projects -->
        <section class="masonry-grid" bind:this={gridContainer}>
            <!-- Render the shuffled items -->
            {#each gridItems as item (item.id)}
                <article class="grid-card {item.gridClass}">
                    <div class="card-inner">
                        <div class="card-header">
                            <span class="card-tag"
                                >{item.data.tags[0] || "PROJECT"}</span
                            >
                            <div
                                style="display: flex; align-items: center; gap: 10px;"
                            >
                                <small>({item.data.date})</small>
                                {#if item.data.githubUrl}
                                    <a
                                        href={item.data.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="github-icon-link"
                                        aria-label="GitHub Repository"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                                            />
                                        </svg>
                                    </a>
                                {/if}
                            </div>
                        </div>
                        <!-- Conditional image rendering based on class -->
                        {#if item.gridClass === "card-horizontal"}
                            <div class="card-h-layout">
                                <div class="card-h-img">
                                    {#if item.data.thumbnail}
                                        <img
                                            src={item.data.thumbnail}
                                            alt="{item.data.title} Thumbnail"
                                            style="width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(100%) contrast(1.2);"
                                        />
                                    {:else}
                                        <div class="placeholder-img">IMG</div>
                                    {/if}
                                </div>
                                <div class="card-h-content">
                                    <h3>
                                        <a href="/projects/{item.data.slug}"
                                            >{item.data.title}</a
                                        >
                                    </h3>
                                    <p>{item.data.description}</p>
                                </div>
                            </div>
                        {:else}
                            <!-- Default / Vertical -->
                            <h3>
                                <a href="/projects/{item.data.slug}"
                                    >{item.data.title}</a
                                >
                            </h3>
                            <p class="card-desc">{item.data.description}</p>
                            <div class="card-v-img">
                                {#if item.data.thumbnail}
                                    <img
                                        src={item.data.thumbnail}
                                        alt="{item.data.title} Thumbnail"
                                        style="width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(100%) contrast(1.2);"
                                    />
                                {:else}
                                    <div class="placeholder-img">IMG</div>
                                {/if}
                            </div>
                        {/if}
                    </div>
                </article>
            {/each}
        </section>
    </main>

    <Marquee
        text="THANKS FOR VISITING • MORE EXPERIMENTS COMING SOON • ALL SYSTEMS ONLINE • ARCHIVING DIGITAL MEMORIES • "
        speed={30}
        direction="right"
    />
</div>

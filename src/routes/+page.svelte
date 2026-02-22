<script lang="ts">
    import "./page.css";
    import { onMount, tick } from "svelte";
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

    onMount(async () => {
        // Prepare items
        let items: GridItem[] = data.projects.map((p) => {
            // Randomly assign grid class for variety
            const randomType = Math.random();
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

        // Shuffle array using Fisher-Yates
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }

        gridItems = items;

        // Wait for the DOM to render the new {#each} block
        await tick();

        gsap.registerPlugin(ScrollTrigger);

        gsap.from(mainTitle, {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
        });

        gsap.utils.toArray(".grid-card").forEach((card: any) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
            });
        });
    });
</script>

<div class="newspaper-container">
    <!-- Header -->
    <header class="main-header hero-header">
        <div class="hero-top-bar">
            <div class="hero-side-text">
                <p>PORTFOLIO</p>
                <p>EDITION</p>
            </div>
            <div class="hero-title">About Me</div>
            <div class="hero-side-text">
                <p>PORTFOLIO</p>
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
                <h3>FULL STACK DEVELOPER</h3>
                <p>
                    Hello! I am a passionate web developer focused on creating
                    immersive and highly optimized digital experiences. I
                    specialize in building complex interactive platforms using
                    SvelteKit, GSAP, and various other modern tools. Welcome to
                    my creative archive where I showcase experiments, career
                    milestones, and selected projects.
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
                        </div>
                        <!-- Conditional image rendering based on class -->
                        {#if item.gridClass === "card-horizontal"}
                            <div class="card-h-layout">
                                <div class="card-h-img">
                                    {#if item.data.thumbnail}
                                        <!-- img placeholder -->
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
                                    <!-- img placeholder -->
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

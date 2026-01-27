<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
    import Marquee from "$lib/components/Marquee.svelte";
    import type { Project } from "$utils/data";

    export let data: { projects: Project[] };

    let mainTitle: HTMLElement;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(mainTitle, {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
        });

        gsap.utils.toArray(".article-card").forEach((card: any) => {
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
    <header class="main-header">
        <div class="date-line">
            VOL. 01 • EST. 2026 • THE PORTFOLIO • BANGKOK EDITION
        </div>
        <h1 bind:this={mainTitle}>The Creative Chronicle</h1>
        <div class="header-border-bottom"></div>
    </header>

    <!-- Marquee Top -->
    <Marquee
        text="BREAKING NEWS: FULL STACK DEVELOPER HIRED FOR TOP PROJECT • LATEST UPDATES • "
        speed={25}
    />

    <!-- Main Grid Layout -->
    <main class="grid-layout">
        <!-- Sidebar Left -->
        <aside class="sidebar-left">
            <div class="weather-box">
                <h3>TODAY</h3>
                <p>Sunny</p>
                <p class="temp">32°C</p>
            </div>
            <div class="divider"></div>
            <div class="about-snippet">
                <h3>CAREER HISTORY</h3>
                <ul class="career-list">
                    <li>
                        <strong>Senior Dev</strong><br />
                        <span>Tech Corp Inc.</span><br />
                        <small>2024 - Present</small>
                    </li>
                    <li>
                        <strong>Frontend Lead</strong><br />
                        <span>Startup X</span><br />
                        <small>2022 - 2024</small>
                    </li>
                    <li>
                        <strong>Freelancer</strong><br />
                        <span>Global Clients</span><br />
                        <small>2020 - 2022</small>
                    </li>
                </ul>
            </div>
        </aside>

        <!-- Center Content (Projects) -->
        <section class="main-content">
            <h2 class="section-title">FEATURED STORIES</h2>
            <div class="articles-list">
                {#each data.projects as project, i}
                    <article class="article-card {i === 0 ? 'lead-story' : ''}">
                        <div class="article-header">
                            <h3>
                                <a href="/projects/{project.slug}"
                                    >{project.title}</a
                                >
                            </h3>
                            <span class="article-date">{project.date}</span>
                        </div>
                        <p class="article-body">{project.description}</p>
                        {#if i === 0}
                            <p class="article-body">
                                <!-- Mock extra content for lead story -->
                                Full coverage of this story is available in our weekend
                                edition. The implications of this project extend
                                far beyond the code, touching on the very essence
                                of how we interact with digital media in the late
                                2020s. Experts agree that this is a turning point.
                            </p>
                        {/if}
                        <div class="article-footer">
                            {#each project.tags as tag}
                                <span class="tag">{tag}</span>
                            {/each}
                            <a href="/projects/{project.slug}" class="read-more"
                                >READ FULL STORY <span>&rarr;</span></a
                            >
                        </div>
                    </article>
                    <div class="article-divider"></div>

                    <!-- Insert Ad after first article -->
                    {#if i === 0}
                        <div class="inline-ad">
                            <p>
                                ⚡ AVAILABLE FOR FREELANCE WORK • CONTACT NOW ⚡
                            </p>
                        </div>
                        <div class="article-divider"></div>
                    {/if}
                {/each}

                <!-- Mock Content for filling space -->
                <article class="article-card">
                    <div class="article-header">
                        <h3>More Projects Coming Soon</h3>
                        <span class="article-date">2026-02-01</span>
                    </div>
                    <p class="article-body">
                        Stay tuned for more updates on upcoming creative coding
                        experiments and open source contributions.
                    </p>
                </article>
            </div>
        </section>

        <!-- Sidebar Right -->
        <aside class="sidebar-right">
            <h3>TOP SKILLS</h3>
            <ul class="skills-list">
                <li>SvelteKit</li>
                <li>TypeScript</li>
                <li>Three.js</li>
                <li>GSAP</li>
                <li>Node.js</li>
            </ul>
            <div class="divider"></div>
            <div class="stats-box">
                <h3>MARKET STATS</h3>
                <div class="stat-row">
                    <span>COFFEE</span>
                    <div class="stat-bar"><div style="width: 80%"></div></div>
                    <span>+12%</span>
                </div>
                <div class="stat-row">
                    <span>BUGS</span>
                    <div class="stat-bar"><div style="width: 10%"></div></div>
                    <span>-5%</span>
                </div>
                <div class="stat-row">
                    <span>UPTIME</span>
                    <div class="stat-bar"><div style="width: 99%"></div></div>
                    <span>99.9%</span>
                </div>
            </div>
            <div class="divider"></div>
            <div class="ad-space">
                <p>HIRE ME</p>
                <p>FOR YOUR NEXT PROJECT</p>
            </div>
        </aside>
    </main>

    <Marquee
        text="THANKS FOR VISITING • SCROLL FOR MORE • CONTACT ME AT HELLO@EXAMPLE.COM • "
        speed={30}
        direction="right"
    />
</div>

<style>
    .newspaper-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
        border-left: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);
        background: var(--bg-color);
        min-height: 100vh;
    }

    /* Header */
    .main-header {
        text-align: center;
        border-bottom: 4px double var(--border-color);
        margin-bottom: 1rem;
        padding-bottom: 1rem;
    }

    .date-line {
        font-family: var(--font-body);
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
        display: inline-block;
        padding: 0 1rem 0.5rem;
    }

    h1 {
        font-family: var(--font-headline);
        font-size: 5rem;
        font-weight: 900;
        line-height: 1;
        text-transform: uppercase;
        letter-spacing: -2px;
        margin: 1rem 0;
    }

    /* Grid Layout */
    .grid-layout {
        display: grid;
        grid-template-columns: 200px 1fr 200px;
        gap: 2rem;
        margin-top: 2rem;
        padding-bottom: 2rem;
    }

    /* Sidebars */
    aside {
        font-family: var(--font-headline);
    }

    aside h3 {
        font-size: 1.2rem;
        text-transform: uppercase;
        border-bottom: 2px solid var(--border-color);
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
        text-align: center;
    }

    /* Stats Box Styles */
    .stat-row {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        margin-bottom: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
    }

    .stat-bar {
        flex-grow: 1;
        height: 4px;
        background: rgba(0, 0, 0, 0.1);
    }

    .stat-bar div {
        height: 100%;
        background: var(--text-color);
    }

    .weather-box {
        text-align: center;
        border: 1px solid var(--border-color);
        padding: 1rem;
        margin-bottom: 2rem;
    }

    .weather-box .temp {
        font-size: 2.5rem;
        font-weight: 700;
    }

    .divider {
        height: 1px;
        background: var(--border-color);
        margin: 2rem 0;
    }

    .skills-list {
        list-style: none;
        padding: 0;
        text-align: center;
    }

    .skills-list li {
        padding: 0.5rem 0;
        border-bottom: 1px dotted var(--border-color);
    }

    .ad-space {
        border: 2px solid var(--border-color);
        padding: 2rem;
        text-align: center;
        font-weight: 700;
        background: var(--text-color);
        color: var(--bg-color);
    }

    /* Main Content */
    .main-content {
        border-left: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);
        padding: 0 2rem;
    }

    .section-title {
        font-family: var(--font-headline);
        font-size: 2rem;
        text-align: center;
        text-decoration: underline;
        text-decoration-thickness: 2px;
        margin-bottom: 2rem;
    }

    .article-card {
        margin-bottom: 2rem;
    }

    .article-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 1rem;
    }

    .article-header h3 {
        font-family: var(--font-headline);
        font-size: 1.8rem;
        margin: 0;
    }

    .article-date {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        opacity: 0.7;
    }

    .article-body {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 1rem;
        text-align: justify;
    }

    .article-footer {
        display: flex;
        gap: 0.5rem;
    }

    .tag {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        text-transform: uppercase;
        border: 1px solid var(--border-color);
        padding: 0.2rem 0.5rem;
    }

    .article-divider {
        height: 1px;
        background: var(--border-color);
        margin-bottom: 2rem;
    }

    /* Lead Story Styling */
    .lead-story h3 {
        font-family: var(--font-headline);
        font-size: 1.8rem;
        margin: 0;
    }

    .lead-story .article-body {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 1rem;
        text-align: justify;
    }

    .lead-story .article-date {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        opacity: 0.7;
    }

    /* Inline Ad */
    .inline-ad {
        border: 1px solid var(--border-color);
        padding: 1rem;
        text-align: center;
        margin: 2rem 0;
        font-family: var(--font-headline);
        font-weight: 900;
        letter-spacing: 1px;
        background: rgba(0, 0, 0, 0.05);
    }

    /* Mobile Responsive */
    @media (max-width: 900px) {
        .grid-layout {
            grid-template-columns: 1fr;
        }

        .main-content {
            border: none;
            padding: 0;
        }

        h1 {
            font-size: 3rem;
        }

        .newspaper-container {
            padding: 1rem;
        }

        /* Reform Sidebars for Mobile */
        .sidebar-left,
        .sidebar-right {
            border-top: 1px solid var(--border-color);
            padding-top: 2rem;
            margin-top: 2rem;
        }

        .article-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.2rem;
        }
    }
    /* Links */
    .article-header h3 a {
        text-decoration: none;
        color: inherit;
        transition: color 0.2s;
    }

    .article-header h3 a:hover {
        color: var(--accent-color);
        text-decoration: underline;
    }

    .read-more {
        margin-left: auto;
        font-family: var(--font-mono);
        color: var(--accent-color);
        text-decoration: none;
        font-weight: 700;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }

    .read-more:hover span {
        transform: translateX(3px);
        transition: transform 0.2s;
    }

    /* Career List */
    .career-list {
        list-style: none;
        padding: 0;
        text-align: left;
    }

    .career-list li {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px dotted var(--border-color);
    }

    .career-list li:last-child {
        border-bottom: none;
    }

    .career-list strong {
        font-family: var(--font-headline);
        font-size: 1rem;
        display: block;
    }

    .career-list span {
        font-family: var(--font-body);
        font-size: 0.9rem;
    }

    .career-list small {
        font-family: var(--font-mono);
        color: #666;
        font-size: 0.7rem;
    }
</style>

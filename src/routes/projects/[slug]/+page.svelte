<script lang="ts">
    import { onMount, tick } from "svelte";
    import type { Project } from "$utils/data";
    import { afterNavigate } from "$app/navigation";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

    export let data: { project: Project };

    let animationContext: gsap.Context;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Slight delay to ensure DOM is ready and layout is settled
        const initAnimations = async () => {
            await tick();

            animationContext = gsap.context(() => {
                // Animate Layout Containers
                gsap.from(".layout-a-container, .layout-b-container", {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: "power2.out",
                });

                // Animate inner content
                const elements = gsap.utils.toArray([
                    ".sidebar-a > *",
                    ".content-a > *",
                    ".header-b > *",
                    ".top-grid-b > div",
                    ".banner-b",
                    ".bottom-grid-b > div",
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

    // 0 = Layout A (Retro Grid), 1 = Layout B (Complex Magazine)
    const layoutType = hashCode(data.project.slug) % 2 === 0 ? "A" : "B";

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

    // Date Logic for Layout B
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
    const dateObj = new Date(data.project.date || new Date());
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
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
    <main class="main-sheet layout-{layoutType}">
        <!-- =========================================================================
             LAYOUT A: RETRO GRID (Sidebar + Main)
             ========================================================================= -->
        {#if layoutType === "A"}
            <div class="layout-a-container">
                <!-- HEADER A -->
                <header class="header-a">
                    <h1 class="title-a">{data.project.title}</h1>
                    <p class="subtitle-a">
                        OFFICIAL DOCUMENTATION • VOL. {year}
                    </p>
                    <div class="double-line"></div>
                </header>

                <div class="grid-a">
                    <!-- SIDEBAR A -->
                    <aside class="sidebar-a">
                        <a href="/" class="back-link">&larr; BACK TO HOME</a>

                        <div class="sidebar-box-dark">
                            <h3>IMPORTANT<br />INFO</h3>
                            <p>
                                High-performance project executed with maximum
                                optimization.
                            </p>
                        </div>

                        <div class="sidebar-stamp-date">
                            <span class="d-day">{day}</span>
                            <span class="d-month">{month} {year}</span>
                        </div>

                        <div class="sidebar-stamp-retro">
                            <h4>OLD PAPER</h4>
                            <p>★ Authentic ★</p>
                        </div>

                        <div class="sidebar-text-widget">
                            <h5>PROJECT SPECS</h5>
                            <p>{data.project.tags.join(" • ")}</p>
                        </div>
                    </aside>

                    <!-- CONTENT A -->
                    <section class="content-a">
                        {#if data.project.thumbnail}
                            <div class="hero-frame-a">
                                <div class="x-mark"></div>
                                <div class="img-box-a">
                                    IMAGE: {data.project.thumbnail}
                                </div>
                                <figcaption class="fig-caption">
                                    FIG 1.0: VISUAL REPRESENTATION OF {data
                                        .project.title}
                                </figcaption>
                            </div>
                        {/if}

                        <h2 class="headline-a">OFFICIAL TOWN HALL REPORT</h2>

                        <div class="article-text-a">
                            <p class="lead-a">
                                <strong>SUMMARY:</strong> A comprehensive look
                                into the development cycle of {data.project
                                    .title}. This project pushes the boundaries
                                of modern web standards.
                            </p>
                            {@html data.project.content}
                        </div>
                    </section>
                </div>

                <footer class="footer-common">
                    THE CHRONICLE ARCHIVE • TYPE A • EST 2024
                </footer>
            </div>

            <!-- =========================================================================
             LAYOUT B: COMPLEX MAGAZINE (3-Col Top + Flow Bottom)
             ========================================================================= -->
        {:else}
            <div class="layout-b-container">
                <!-- HEADER B -->
                <header class="header-b">
                    <h1 class="title-b">{data.project.title}</h1>
                    <h2 class="subtitle-b">ARCHITECTURAL DEEP DIVE</h2>
                    <div class="line-thick"></div>
                    <div class="header-note">
                        Short note: An exclusive look into the process.
                    </div>
                    <div class="line-thin"></div>
                </header>

                <!-- TOP GRID B -->
                <div class="top-grid-b">
                    <!-- B1: LEFT -->
                    <div class="col-b-left">
                        <a href="/" class="back-link">&larr; BACK TO HOME</a>

                        <div class="box-dark-b">
                            <h3>IMPORTANT INFORMATION</h3>
                            <p>OFFICIAL RECORD</p>
                        </div>
                        <p class="filler-b">
                            This document serves as the primary artifact for "{data
                                .project.title}". Classified public knowledge.
                        </p>
                        <div class="stamp-box-b">
                            <h3>QUALITY</h3>
                            <div class="stars">★ Verified ★</div>
                            <p>Premium Grade</p>
                        </div>
                    </div>

                    <!-- B2: MID -->
                    <div class="col-b-mid">
                        <h3 class="extra-head">EXTRA! EXTRA!</h3>
                        <h4 class="extra-sub">READ ALL ABOUT IT</h4>
                        <div class="mid-text">
                            <p>
                                <strong
                                    >{data.project.tags[0] || "Tech"} Update:</strong
                                >
                                Breaking news from the dev team. Establishing benchmarks
                                in
                                {data.project.tags.slice(0, 3).join(", ")}.
                            </p>
                        </div>
                        <p class="quote-mid">
                            "We created something timeless."
                        </p>
                    </div>

                    <!-- B3: IMAGE -->
                    <div class="col-b-right">
                        {#if data.project.thumbnail}
                            <div class="img-frame-b">
                                <div class="img-place-b">
                                    IMAGE: {data.project.thumbnail}
                                </div>
                                <figcaption class="fig-caption">
                                    FIG 1.1: ARCHITECTURAL DIAGRAM OF {data
                                        .project.title}
                                </figcaption>
                            </div>
                        {/if}
                    </div>
                </div>

                <!-- BANNER B -->
                <div class="banner-b">
                    <h2>TECHNICAL ANALYSIS REPORT</h2>
                    <p>FULL DETAILS BELOW</p>
                </div>

                <!-- BOTTOM GRID B -->
                <div class="bottom-grid-b">
                    <!-- Date Widget -->
                    <div class="widget-date-b">
                        <div class="wd-month">{month}</div>
                        <div class="wd-day">{day}</div>
                        <div class="wd-year">{year}</div>
                    </div>

                    <!-- Main Article -->
                    <div class="article-flow-b">
                        {@html data.project.content}
                    </div>
                </div>

                <footer class="footer-common">
                    THE CHRONICLE ARCHIVE • TYPE B • EST 2024
                </footer>
            </div>
        {/if}
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
    /* 
       GLOBAL & SHARED STYLES 
       Theme: Black & White / Grayscale 
    */
    @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cinzel:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Oswald:wght@500;700&display=swap");

    :global(body) {
        background-color: var(--bg-color); /* Use global beige */
        color: #1a1a1a;
    }

    .page-wrapper {
        position: relative;
        max-width: 1440px; /* Requested 1440px */
        margin: 0 auto;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        background: var(--bg-color);
        border-left: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);
        overflow: hidden;
    }

    .main-sheet {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 1280px; /* Constraint content inside 1440 wrapper */
        margin: 0 4rem; /* Space for floaters */
        padding: 3rem 0;
        background: var(--bg-color);
    }

    /* --- FLOATING ANIMATION --- */
    .floating-text-container {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40px;
        z-index: 10;
        overflow: hidden;
        pointer-events: none;
        opacity: 0.8; /* Increased opacity */
    }
    .left {
        left: 10px;
    }
    .right {
        right: 10px;
    }

    .floater-track {
        display: flex;
        flex-direction: column;
        gap: 4rem;
        animation: floatUp 30s linear infinite;
    }
    .floater-track.reverse {
        animation-direction: reverse;
    }

    .float-word {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        font-family: "Oswald", sans-serif;
        font-weight: 700;
        font-size: 1.5rem;
        letter-spacing: 0.2rem;
        color: #000; /* Black */
    }

    @keyframes floatUp {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-50%);
        }
    }

    /* FOOTER COMMON */
    .footer-common {
        margin-top: 4rem;
        text-align: center;
        font-family: "Courier New", monospace;
        font-size: 0.75rem;
        border-top: 1px solid #000;
        padding-top: 1rem;
        letter-spacing: 1px;
    }

    /* =========================================
       LAYOUT A STYLES (Retro Grid)
       ========================================= */
    .layout-a-container {
        border: 2px solid #000;
        padding: 2rem;
    }

    .header-a {
        text-align: center;
        margin-bottom: 3rem;
    }
    .title-a {
        font-family: "Playfair Display", serif;
        font-size: 4.5rem;
        text-transform: uppercase;
        margin: 0;
        line-height: 0.9;
    }
    .subtitle-a {
        font-family: "Old Standard TT", serif;
        letter-spacing: 2px;
        margin-top: 0.5rem;
    }
    .double-line {
        border-top: 4px solid #000;
        border-bottom: 1px solid #000;
        height: 6px;
        margin-top: 1.5rem;
    }

    .grid-a {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 3rem;
    }

    .sidebar-a {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        border-right: 1px solid #000;
        padding-right: 2rem;
    } /* Added border-right as requested for 'lines' perception if needed, or just relying on widgets */

    .back-link {
        font-family: monospace;
        text-decoration: none;
        color: #000;
        font-weight: bold;
        border: 1px solid #000;
        padding: 0.5rem;
        text-align: center;
        display: block;
        transition: all 0.2s;
        margin-bottom: 1rem;
    }
    .back-link:hover {
        background: #000;
        color: #fff;
    }

    .sidebar-box-dark {
        background: #1a1a1a;
        color: #fff;
        padding: 1.25rem;
        transform: rotate(-1deg);
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
    .sidebar-box-dark h3 {
        font-family: "Oswald", sans-serif;
        font-size: 1.8rem;
        line-height: 1;
        margin: 0 0 1rem 0;
        border-bottom: 2px solid #fff;
        padding-bottom: 0.5rem;
    }
    .sidebar-box-dark p {
        margin: 0;
        line-height: 1.5;
        font-size: 0.95rem;
    }

    .sidebar-stamp-date {
        border: 4px solid #000;
        width: 120px;
        height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-self: center;
    }
    .d-day {
        font-size: 3.5rem;
        font-weight: 900;
        line-height: 1;
        font-family: "Playfair Display", serif;
    }
    .d-month {
        font-family: monospace;
        text-transform: uppercase;
    }

    .sidebar-stamp-retro {
        border: 4px local;
        border-style: double;
        padding: 1rem;
        text-align: center;
        background: #f4f4f4;
    }
    .sidebar-stamp-retro h4 {
        font-family: "Oswald", sans-serif;
        font-size: 1.5rem;
        margin: 0;
    }

    /* PROJECT SPECS WIDGET STYLE */
    .sidebar-text-widget h5 {
        font-family: "Playfair Display", serif;
        font-style: italic;
        font-weight: 700;
        font-size: 1.2rem;
        margin: 0;
        border-bottom: 1px solid #000; /* Full width line */
        padding-bottom: 2px;
        text-transform: uppercase;
    }

    .hero-frame-a {
        border: 1px solid #000;
        padding: 5px;
        position: relative;
        margin-bottom: 2rem;
    }
    .img-box-a {
        background: #e5e5e5;
        height: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: monospace;
    }
    .x-mark {
        position: absolute;
        inset: 0;
        background: linear-gradient(
                to top right,
                transparent 49%,
                rgba(0, 0, 0, 0.1) 50%,
                transparent 51%
            ),
            linear-gradient(
                to top left,
                transparent 49%,
                rgba(0, 0, 0, 0.1) 50%,
                transparent 51%
            );
        pointer-events: none;
    }

    .headline-a {
        font-family: "Oswald", sans-serif;
        font-size: 2.5rem;
        text-transform: uppercase;
        border-bottom: 3px solid #000;
        padding-bottom: 0.5rem;
        margin-bottom: 1.5rem;
    }
    .article-text-a {
        font-family: "Old Standard TT", serif;
        font-size: 1.15rem;
        line-height: 1.6;
        column-count: 2;
        column-gap: 2rem;
        text-align: justify;
    }
    .lead-a {
        font-size: 1.25rem;
        font-style: italic;
        margin-bottom: 1.5rem;
    }

    /* =========================================
       LAYOUT B STYLES (Complex Magazine)
       ========================================= */
    .layout-b-container {
        /* No border wrapper, cleaner look */
    }

    .header-b {
        text-align: center;
        margin-bottom: 3rem;
    }
    .title-b {
        font-family: "Playfair Display", serif;
        font-weight: 900;
        font-size: 5rem;
        text-transform: uppercase;
        margin: 0;
        line-height: 0.9;
        letter-spacing: -2px;
    }
    .subtitle-b {
        font-family: "Cinzel", serif;
        font-size: 1.5rem;
        margin: 0.5rem 0 1rem;
        letter-spacing: 5px;
        color: #444;
    }
    .line-thick {
        height: 4px;
        background: #000;
        margin: 10px 0;
    }
    .line-thin {
        height: 1px;
        background: #000;
        margin: 10px 0;
    }
    .header-note {
        font-family: "Old Standard TT", serif;
        font-style: italic;
        font-size: 1.2rem;
    }

    .top-grid-b {
        display: grid;
        grid-template-columns: 200px 1fr 1.5fr;
        gap: 2rem;
        margin-bottom: 3rem;
    }

    /* B1 */
    .col-b-left {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .box-dark-b {
        background: #000;
        color: #fff;
        padding: 1.25rem 1rem;
        transform: rotate(-1deg);
        text-align: left;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
    .box-dark-b h3 {
        font-family: "Cinzel", serif;
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
        border-bottom: 1px solid #fff;
        padding-bottom: 4px;
    }
    .box-dark-b p {
        margin: 0;
        line-height: 1.5;
        font-size: 0.95rem;
    }
    .filler-b {
        font-size: 0.9rem;
        line-height: 1.4;
        text-align: justify;
        font-family: "Old Standard TT", serif;
    }
    .stamp-box-b {
        border: 4px double #000;
        padding: 1rem;
        text-align: center;
    }
    .stamp-box-b h3 {
        font-family: "Abril Fatface", cursive;
        font-size: 1.5rem;
        margin: 0;
    }
    .stars {
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        margin: 5px 0;
        font-size: 0.8rem;
    }

    /* B2 */
    .col-b-mid {
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        padding: 0 1rem;
    }
    .extra-head {
        font-family: "Abril Fatface", cursive;
        font-size: 2rem;
        margin: 0;
        line-height: 1;
    }
    .extra-sub {
        font-family: "Cinzel", serif;
        border-bottom: 1px solid #000;
        display: inline-block;
        margin: 0 0 1rem 0;
    }
    .mid-text {
        font-family: "Old Standard TT", serif;
        font-size: 1rem;
        line-height: 1.5;
        text-align: justify;
    }
    .quote-mid {
        font-family: "Playfair Display", serif;
        font-style: italic;
        font-size: 1.5rem;
        margin-top: 2rem;
        text-align: center;
    }

    /* B3 */
    .img-frame-b {
        border: 4px solid #000;
        padding: 3px;
        height: 100%;
        min-height: 350px;
    }
    .img-place-b {
        width: 100%;
        height: 100%;
        background: #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Cinzel", serif;
        font-weight: bold;
    }

    .banner-b {
        border-top: 4px solid #000;
        border-bottom: 4px solid #000;
        padding: 1rem;
        text-align: center;
        margin: 2rem 0;
        background: #fdfdfd;
    }
    .banner-b h2 {
        font-family: "Abril Fatface", cursive;
        font-size: 2.5rem;
        margin: 0;
    }

    .bottom-grid-b {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
    }

    .widget-date-b {
        background: #000;
        color: #fff;
        width: 120px;
        height: 140px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: "Cinzel", serif;
        border: 4px solid #fff;
        box-shadow: 0 0 0 2px #000;
    }
    .wd-month {
        font-size: 0.9rem;
        border-bottom: 1px solid #fff;
        width: 80%;
        text-align: center;
        margin-bottom: 5px;
    }
    .wd-day {
        font-size: 4rem;
        font-weight: bold;
        line-height: 1;
    }
    .article-flow-b {
        font-family: "Old Standard TT", serif;
        font-size: 1.15rem;
        line-height: 1.8;
        column-count: 2;
        column-gap: 3rem;
        text-align: justify;
        width: 100%;
    }

    .nav-b-bottom {
        margin-top: 3rem;
        text-align: center;
    } /* Legacy class not used if moved */

    /* Markdown Helpers */
    .article-text-a,
    .article-flow-b {
        word-wrap: break-word;
        overflow-wrap: break-word;
        word-break: break-word;
    }
    .article-text-a :global(*),
    .article-flow-b :global(*) {
        max-width: 100%;
        box-sizing: border-box;
    }
    .article-text-a :global(p),
    .article-flow-b :global(p) {
        margin-bottom: 1rem;
    }
    .article-text-a :global(h1),
    .article-flow-b :global(h1) {
        font-family: "Playfair Display", serif;
        font-size: 2.5rem;
        font-weight: 900;
        line-height: 1.1;
        margin-top: 2rem;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }
    .article-text-a :global(h2),
    .article-flow-b :global(h2) {
        font-family: "Oswald", sans-serif;
        font-size: 1.8rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
        border-bottom: 2px solid #000;
        display: inline-block;
        text-transform: uppercase;
    }
    .article-text-a :global(h3),
    .article-flow-b :global(h3) {
        font-family: "Oswald", sans-serif;
        font-size: 1.3rem;
        margin-top: 1.5rem;
        margin-bottom: 0.8rem;
        text-transform: uppercase;
    }
    .article-text-a :global(img),
    .article-flow-b :global(img) {
        max-width: 100%;
        height: auto;
        border: 1px solid #000;
        margin: 1.5rem 0;
    }
    .article-text-a :global(pre),
    .article-flow-b :global(pre) {
        max-width: 100%;
        overflow-x: auto;
        background: #111;
        color: #eee;
        padding: 1rem;
        word-wrap: normal;
        word-break: normal;
    }
    .article-text-a :global(code),
    .article-flow-b :global(code) {
        font-family: monospace;
        font-size: 0.9em;
        background: rgba(0, 0, 0, 0.05);
        padding: 0.1rem 0.3rem;
    }
    .article-text-a :global(pre) :global(code),
    .article-flow-b :global(pre) :global(code) {
        background: transparent;
        padding: 0;
    }
    .article-text-a :global(ul),
    .article-flow-b :global(ul),
    .article-text-a :global(ol),
    .article-flow-b :global(ol) {
        padding-left: 2rem;
        margin-bottom: 1.5rem;
    }
    .article-text-a :global(li),
    .article-flow-b :global(li) {
        margin-bottom: 0.5rem;
    }

    /* RESPONSIVE */
    @media (max-width: 900px) {
        .page-wrapper {
            padding: 0 0.5rem;
        }
        .main-sheet {
            margin: 1rem;
            width: auto;
            padding: 1rem;
        }

        /* A */
        .title-a {
            font-size: 3rem;
        }
        .grid-a {
            grid-template-columns: 1fr;
        }
        .sidebar-a {
            order: 2;
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-right: none;
            border-top: 1px solid #000;
            padding-top: 2rem;
            padding-right: 0;
        } /* Reset border for mobile */
        .back-link {
            grid-column: span 2;
        }
        .article-text-a {
            column-count: 1;
        }

        /* B */
        .title-b {
            font-size: 3rem;
        }
        .top-grid-b {
            grid-template-columns: 1fr;
        }
        .col-b-left {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        .box-dark-b {
            grid-column: span 2;
        }
        .col-b-mid {
            border: none;
            padding: 0;
            border-top: 1px solid #ddd;
            padding-top: 1rem;
        }
        .bottom-grid-b {
            flex-direction: column;
        }
        .widget-date-b {
            margin: 0 auto;
        }
        .article-flow-b {
            column-count: 1;
        }
        .floating-text-container {
            display: none;
        }
    }
    .fig-caption {
        font-family: "Old Standard TT", serif;
        font-size: 0.8rem;
        text-align: center;
        margin-top: 0.5rem;
        font-style: italic;
        text-transform: uppercase;
        color: #444;
    }
</style>

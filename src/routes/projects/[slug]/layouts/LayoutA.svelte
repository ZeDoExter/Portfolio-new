<script lang="ts">
    import type { Project } from "$utils/data";
    import JavaSandbox from "./JavaSandbox.svelte";

    export let project: Project;
    export let dateObj: { day: number; month: string; year: number };
</script>

<div class="layout-a-container">
    <div class="grid-a">
        <!-- SIDEBAR A -->
        <aside class="sidebar-a">
            <div class="sidebar-box-dark">
                <h3>IMPORTANT<br />INFO</h3>
                <p>
                    High-performance project executed with maximum optimization.
                </p>
            </div>

            <div class="sidebar-stamp-date">
                <span class="d-day">{dateObj.day}</span>
                <span class="d-month">{dateObj.month} {dateObj.year}</span>
            </div>

            <div class="sidebar-stamp-retro">
                <h4>OLD PAPER</h4>
                <p>★ Authentic ★</p>
            </div>

            <div class="sidebar-text-widget">
                <h5>PROJECT SPECS</h5>
                <p>{project.tags.join(" • ")}</p>
            </div>
        </aside>

        <!-- CONTENT A -->
        <section class="content-a">
            <h2 class="headline-a">{project.title}</h2>

            <div class="article-text-a">
                <p class="lead-a">
                    <strong>SUMMARY:</strong>
                    {project.description}
                </p>
                {@html project.content}
            </div>
        </section>
    </div>

    {#if project.slug === "GraphWithGui"}
        <JavaSandbox />
    {/if}

    <footer class="footer-common">
        {project.title} • TYPE A • {dateObj.day}
        {dateObj.month}
        {dateObj.year}
    </footer>
</div>

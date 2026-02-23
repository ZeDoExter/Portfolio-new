<script lang="ts">
    import type { Project } from "$utils/data";
    import JavaSandbox from "./JavaSandbox.svelte";

    export let project: Project;
    export let dateObj: { day: number; month: string; year: number };
</script>

<div class="layout-c-container">
    <div class="row-c top-row">
        <div class="c-half c-text">
            <div class="intro-c">
                <strong style="display:block;margin-bottom:1rem;"
                    >SUMMARY: A comprehensive look into the development cycle of {project.title}.</strong
                >
                {project.description ||
                    "The primary focus of this project is to implement robust and beautiful interfaces that scale. Authentic and creative elements are deployed across the architecture."}
            </div>
        </div>
        <div class="c-half">
            <div
                class="img-box-c"
                style="display: flex; justify-content: center; align-items: center; background: #e8e8e8; overflow: hidden;"
            >
                {#if project.thumbnail}
                    <img
                        src={project.thumbnail}
                        alt="{project.title} Thumbnail"
                        style="width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(100%) contrast(1.2);"
                    />
                {:else}
                    IMG BOX
                {/if}
            </div>
        </div>
    </div>

    <div class="divider-c"></div>

    <div class="row-c mid-row">
        <div class="c-half">
            <div
                class="img-box-c"
                style="aspect-ratio: 4/3; background:#e8e8e8;"
            >
                SECONDARY IMG
            </div>
        </div>
        <div class="c-half c-text">
            <h2 class="title-c sub">ARCHITECTURAL DEEP DIVE</h2>
            <div class="date-c">
                {dateObj.day}
                {dateObj.month}
                {dateObj.year}
            </div>
            <div class="intro-c">
                This project focuses on {project.tags[0] || "engineering"} to drive
                optimal user experiences. Built with modern tools such as {project.tags.join(
                    ", ",
                )}.
            </div>
        </div>
    </div>

    <div class="divider-c"></div>

    <div class="article-flow-c">
        {@html project.content}
    </div>

    {#if project.slug === "GraphWithGui"}
        <JavaSandbox />
    {/if}

    <footer class="footer-common">
        THE CHRONICLE ARCHIVE • TYPE C • EST 2024
    </footer>
</div>

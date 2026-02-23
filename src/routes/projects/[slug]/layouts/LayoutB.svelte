<script lang="ts">
    import type { Project } from "$utils/data";
    import JavaSandbox from "./JavaSandbox.svelte";

    export let project: Project;
</script>

<div class="layout-b-container">
    <!-- SIMPLIFIED LAYOUT B -->

    <div
        class="content-sandbox-wrapper"
        style="display: flex; flex-direction: column; gap: 2rem; align-items: center; width: 100%;"
    >
        <div class="article-flow-b" style="width: 100%; max-width: 1000px;">
            {@html project.content}
        </div>

        {#if project.jarUrl}
            <div
                class="sandbox-column"
                style="width: 100%; display: flex; justify-content: center;"
            >
                <JavaSandbox
                    jarPath={project.jarUrl}
                    width={project.jarWidth || 900}
                    height={project.jarHeight || 700}
                    scale={project.jarScale || 1}
                />
            </div>
        {/if}
    </div>

    <footer class="footer-common">
        THE CHRONICLE ARCHIVE • TYPE B • EST 2024
    </footer>
</div>

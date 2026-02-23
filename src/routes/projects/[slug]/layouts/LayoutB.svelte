<script lang="ts">
    import type { Project } from "$utils/data";
    import JavaSandbox from "./JavaSandbox.svelte";

    export let project: Project;
</script>

<div class="layout-b-container">
    <!-- SIMPLIFIED LAYOUT B -->

    <div class="article-flow-b" style="max-width: none;">
        {@html project.content}
    </div>

    {#if project.slug === "GraphWithGui"}
        <JavaSandbox />
    {/if}

    <footer class="footer-common">
        THE CHRONICLE ARCHIVE • TYPE B • EST 2024
    </footer>
</div>

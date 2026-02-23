<script lang="ts">
    import { onMount } from "svelte";

    export let jarPath: string = "/app/projects/graphwithgui/GraphWithGui.jar";
    export let width: number = 900;
    export let height: number = 700;
    export let scale: number = 1;

    let isCheerpJLoaded = false;
    let isCheerpJRunning = false;

    // Computed height for the wrapper so it doesn't leave huge empty space when scaled down
    $: wrapperHeight = height * scale;
    $: wrapperWidth = width * scale;

    onMount(() => {
        // Appending the loader.js
        const script = document.createElement("script");
        script.src = "https://cjrtnc.leaningtech.com/4.2/loader.js";
        document.head.appendChild(script);

        return () => {
            const addedScript = document.querySelector(
                'script[src="https://cjrtnc.leaningtech.com/4.2/loader.js"]',
            );
            if (addedScript) document.head.removeChild(addedScript);
        };
    });

    async function startJavaApp() {
        if (isCheerpJRunning) return;
        isCheerpJRunning = true;
        try {
            // @ts-ignore
            await window.cheerpjInit({ version: 17 });
        } catch (e) {
            // CheerpJ v4.0+ Throws an error if already initialized. We can safely ignore it.
            if (!String(e).includes("Already initialized")) {
                console.error("Failed to initialize CheerpJ:", e);
                isCheerpJRunning = false;
                return;
            }
        }

        try {
            // Create a display container for the Swing GUI — required for AWT/Swing apps
            const displayContainer = document.getElementById("cheerpj-display");
            if (displayContainer) {
                // @ts-ignore
                window.cheerpjCreateDisplay(width, height, displayContainer);
            }

            // Mark as loaded immediately — Swing apps run indefinitely so the
            // promise from cheerpjRunJar never resolves.
            isCheerpJLoaded = true;

            const finalJarPath = jarPath.startsWith("/app")
                ? jarPath
                : `/app${jarPath.startsWith("/") ? "" : "/"}${jarPath}`;

            // @ts-ignore
            window.cheerpjRunJar(finalJarPath);
        } catch (e) {
            console.error("Failed to run Java JAR:", e);
            isCheerpJLoaded = false;
            isCheerpJRunning = false;
        }
    }
</script>

<div
    class="cheerpj-section"
    style="width: {wrapperWidth}px; min-width: {wrapperWidth}px; height: {isCheerpJLoaded
        ? wrapperHeight + 'px'
        : 'auto'}; min-height: {isCheerpJLoaded
        ? wrapperHeight + 'px'
        : '100px'}; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 2rem auto; border: 2px dashed #000; padding: {isCheerpJLoaded
        ? '0'
        : '2rem'}; text-align: center; font-family: monospace; background: #fdfdfd; box-sizing: content-box; overflow: hidden; position: relative;"
>
    {#if !isCheerpJLoaded}
        <h3
            style="margin-bottom: 1rem; font-family: 'Oswald', sans-serif; font-size: 1.5rem;"
        >
            Interactive Java Sandbox
        </h3>
        <p
            style="margin-bottom: 1.5rem; max-width: 400px; font-family: 'Old Standard TT', serif; font-size: 1.1rem;"
        >
            This uses WebAssembly so it may take ~10 seconds to compile.
        </p>
        <button
            on:click={startJavaApp}
            disabled={isCheerpJRunning}
            style="padding: 10px 20px; font-family: monospace; font-size: 1.1rem; font-weight: bold; background: #000; color: #fff; border: 2px solid #000; cursor: pointer; transition: all 0.2s; position: relative; z-index: 10;"
        >
            {isCheerpJRunning
                ? "LOADING VIRTUAL MACHINE..."
                : "▶ LAUNCH JAVA APPLICATION"}
        </button>
    {/if}

    <div
        id="cheerpj-display"
        style="width: {width}px; height: {height}px; transform: scale({scale}); transform-origin: top left; position: absolute; top: 0; left: 0; opacity: {isCheerpJLoaded
            ? 1
            : 0}; pointer-events: {isCheerpJLoaded ? 'auto' : 'none'};"
    ></div>
</div>

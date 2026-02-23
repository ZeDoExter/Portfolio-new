<script lang="ts">
    import { onMount } from "svelte";

    let isCheerpJLoaded = false;
    let isCheerpJRunning = false;

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
                window.cheerpjCreateDisplay(900, 700, displayContainer);
            }

            // Mark as loaded immediately — Swing apps run indefinitely so the
            // promise from cheerpjRunJar never resolves.
            isCheerpJLoaded = true;

            // @ts-ignore
            window.cheerpjRunJar("/app/projects/graphwithgui/GraphWithGui.jar");
        } catch (e) {
            console.error("Failed to run Java JAR:", e);
            isCheerpJLoaded = false;
            isCheerpJRunning = false;
        }
    }
</script>

<div
    class="cheerpj-section"
    style="width: 100%; display: flex; flex-direction: column; align-items: center; margin-top: 2rem; margin-bottom: 2rem; border: 2px dashed #000; padding: 2rem; text-align: center; font-family: monospace; background: #fdfdfd;"
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
            style="padding: 10px 20px; font-family: monospace; font-size: 1.1rem; font-weight: bold; background: #000; color: #fff; border: 2px solid #000; cursor: pointer; transition: all 0.2s;"
        >
            {isCheerpJRunning
                ? "LOADING VIRTUAL MACHINE..."
                : "▶ LAUNCH JAVA APPLICATION"}
        </button>
    {:else}
        <h3
            style="margin-bottom: 0.5rem; font-family: 'Oswald', sans-serif; font-size: 1.5rem; color: green;"
        >
            Application Running
        </h3>
    {/if}
    <div
        id="cheerpj-display"
        style="width: 100%; max-width: 920px; overflow-x: auto; margin-top: 1rem;"
    ></div>
</div>

<script lang="ts">
    import { T, useTask } from "@threlte/core";
    import { ContactShadows, Float, Grid } from "@threlte/extras";
    import { onMount } from "svelte";
    import { spring } from "svelte/motion";

    let rotation = 0;

    useTask((delta) => {
        rotation += delta * 0.5;
    });

    const scale = spring(0);

    onMount(() => {
        scale.set(1);
    });
</script>

<T.PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50}>
    <T.OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
    />
</T.PerspectiveCamera>

<T.DirectionalLight position={[10, 10, 5]} intensity={1.5} />
<T.AmbientLight intensity={0.5} />

<Float floatIntensity={2} rotationIntensity={1}>
    <T.Mesh rotation.y={rotation} scale={$scale}>
        <T.IcosahedronGeometry args={[1.5, 0]} />
        <T.MeshStandardMaterial color="#ff3e00" wireframe />
    </T.Mesh>
</Float>

<Grid
    position.y={-2}
    infiniteGrid
    sectionColor="#4a4a4a"
    cellColor="#2a2a2a"
    fadeDistance={20}
/>

<!-- <ContactShadows position.y={-2} opacity={0.4} blur={2} /> -->

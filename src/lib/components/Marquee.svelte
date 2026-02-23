<script lang="ts">
    import "./Marquee.css";
    export let text: string = "BREAKING NEWS • WELCOME TO THE PORTFOLIO • ";
    export let speed: number = 20;
    export let direction: "left" | "right" = "left";
</script>

<div
    class="marquee-container"
    style="--speed: {speed}s; --direction: {direction === 'left'
        ? 'normal'
        : 'reverse'}"
>
    <div class="track">
        <div class="content">{text}</div>
        <div class="content">{text}</div>
        <div class="content">{text}</div>
        <div class="content">{text}</div>
    </div>
</div>

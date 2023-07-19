<svelte:options namespace="svg" />

<script lang="ts">
  import { curveLinear, line } from 'd3-shape';
  import { tweened } from 'svelte/motion';
  import { interpolate } from 'd3-interpolate';
  import { tick } from 'svelte';

  export let stroke = '#ab00d6';
  export let data: [number, number][];
  export let start: false | [number, number][];
  export let curve = curveLinear;

  const interpolateY = (a, b) => t => interpolate(a, b)(t).map((d, i) => [b[i][0], d[1]]);
  const tweenedData = tweened(start || data, { interpolate: interpolateY });

  if (start) {
    tick().then(() => {
      tweenedData.set(data);
    });
  }

  $: path = line().curve(curve);
  $: tweenedData.set(data);
</script>

<path class="path-line" d={path($tweenedData)} {stroke} />

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 3;
  }
</style>

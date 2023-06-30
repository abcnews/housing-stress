<script>
  import { curveLinear, line } from 'd3-shape';
  import { tweened } from 'svelte/motion';
  import { interpolate } from 'd3-interpolate';

  export let stroke = '#ab00d6';
  export let data;
  export let curve = curveLinear;
  const tweenedData = tweened(data, { interpolate });

  $: path = line().curve(curve);
  $: tweenedData.set(data);
</script>

<path class="path-line" d={path($tweenedData)} {stroke} />

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2;
  }
</style>

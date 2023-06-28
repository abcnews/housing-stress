<script>
  import { getContext } from 'svelte';
  import { group } from 'd3-array';
  import { line, curveLinear } from 'd3-shape';

  const { data, xGet, yGet, zGet } = getContext('LayerCake');

  $: grouped = group($data, d => d[0]);
  export let curve = curveLinear;
  $: path = line().x($xGet).y($yGet).curve(curve);

  const palette = ['#C0D8DB', '#92C1CC', '#69A8C1', '#4C8FBB', '#000'];
</script>

<g class="line-group">
  {#each [...grouped] as [quartile, data], i}
    <path class="path-line" d={path(data)} stroke={palette[i]} />
  {/each}
</g>

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 3px;
  }
</style>

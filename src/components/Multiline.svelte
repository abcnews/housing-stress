<script>
  import { getContext } from 'svelte';
  import { group } from 'd3-array';
  import Line from './Line.svelte';
  const { data, xGet, yGet, custom } = getContext('LayerCake');

  $: grouped = group($data, d => d[1]);

  const palette = ['#C0D8DB', '#92C1CC', '#69A8C1', '#4C8FBB', '#000'];
</script>

<g class="line-group">
  {#each [...grouped] as [quintile, data], i (quintile)}
    {#if $custom.selectedQuintiles.includes(quintile)}
      <Line stroke={palette[i]} data={data.map(d => [$xGet(d), $yGet(d)])} />
    {/if}
  {/each}
</g>

<style>
</style>

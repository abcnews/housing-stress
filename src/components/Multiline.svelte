<svelte:options namespace="svg" />

<script lang="ts">
  import { getContext } from 'svelte';
  import { group } from 'd3-array';
  import Line from './Line.svelte';
  import { fade } from 'svelte/transition';
  import { LayerCakeContext, Settings } from '../schemas';
  import { createPreviousStore } from '../stores';
  import { getOrdinalCategoricalPalette, getNominalCategoricalPalette } from '@abcnews/palette/palettes';
  const { data, xGet, yGet, xDomain, custom } = getContext<LayerCakeContext>('LayerCake');
  const palette = getNominalCategoricalPalette(7);

  $: grouped = group(
    $data,
    d => d[0],
    d => d[1]
  );

  const previousSettings = createPreviousStore<Settings>(custom);

  const getValues = (data, getX, getY) => data.map(d => [getX(d), getY(d)]);
  const getSeries = (tenure: string, series: string) => $data.filter(d => d[0] === tenure && d[1] === series);
  const getStartingValues = (tenure: string, series: string, from: Settings, getX, getY) => {
    if (tenure === 'overall' && series === 'all') return false;
    if (tenure !== 'overall' && series === 'all' && from.selectedTenureTypes.includes('overall'))
      return getValues(getSeries('overall', series), getX, getY);
    if (series !== 'all' && from.selectedSeries.includes('all')) return getValues(getSeries(tenure, 'all'), getX, getY);
    return false;
  };

  let selectedTenureTypes: string[];
  let selectedSeries: string[];

  $: selectedTenureTypes = $custom.selectedTenureTypes;
  $: selectedSeries = $custom.selectedSeries;
</script>

<g class="line-group">
  {#each [...grouped] as [tenureType, tenureTypeData] (tenureType)}
    {#each [...tenureTypeData] as [series, data], i (series)}
      {#if selectedTenureTypes?.includes(tenureType) && selectedSeries?.includes(series)}
        <g transition:fade>
          <Line
            stroke={palette[i]}
            start={getStartingValues(tenureType, series, $previousSettings, $xGet, $yGet)}
            data={data.map(d => [$xGet(d), $yGet(d)])}
          />
        </g>
      {/if}
    {/each}
  {/each}
</g>

<style>
</style>

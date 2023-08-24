<svelte:options namespace="svg" />

<script lang="ts">
  import { getContext } from 'svelte';
  import { group } from 'd3-array';
  import Line from './Line.svelte';
  import { fade } from 'svelte/transition';
  import { LayerCakeContext, Settings } from '../schemas';
  import { createPreviousStore } from '../stores';
  import { getColourFor } from './colours';
  const { data, xGet, yGet, xDomain, xScale, yScale, custom } = getContext<LayerCakeContext>('LayerCake');

  $: grouped = group(
    $data,
    d => d.tenure,
    d => d.breakdown
  );

  const previousSettings = createPreviousStore<Settings>(custom);

  const getValues = (data, getX, getY) => data.map(d => [getX(d), getY(d)]);
  const getSeries = (tenure: string, series: string) => $data.filter(d => d[0] === tenure && d[1] === series);
  const getStartingValues = (tenure: string, series: string, from: Settings, getX, getY) => {
    if (tenure === 'everyone' && series === 'overall') return false;
    if (tenure !== 'everyone' && series === 'overall' && from.selectedTenureTypes.includes('everyone'))
      return getValues(getSeries('everyone', series), getX, getY);
    if (series !== 'overall' && from.selectedSeries.includes('overall'))
      return getValues(getSeries(tenure, 'overall'), getX, getY);
    return false;
  };

  let selectedTenureTypes: string[];
  let selectedSeries: string[];

  $: selectedTenureTypes = $custom.selectedTenureTypes;
  $: selectedSeries = $custom.selectedSeries;
  $: showLineLabels = $custom.showLineLabels;
</script>

<g class="line-group">
  {#each [...grouped] as [tenureType, tenureTypeData] (tenureType)}
    {#each [...tenureTypeData] as [series, data], i (series)}
      {#if selectedTenureTypes?.includes(tenureType) && selectedSeries?.includes(series)}
        <g transition:fade>
          <Line
            stroke={getColourFor(series, tenureType)}
            start={getStartingValues(tenureType, series, $previousSettings, $xGet, $yGet)}
            data={data.map(d => [$xGet(d), $yGet(d)])}
          />
          {#if showLineLabels}
            <text
              style:fill={getColourFor(series, tenureType)}
              class="line-label"
              x={$xGet(data[data.length - 1]) + 7}
              y={$yGet(data[data.length - 1])}>{series}</text
            >
          {/if}
        </g>
      {/if}
    {/each}
  {/each}
</g>

<style>
  .line-label {
    font-family: var(--dls-font-stack-sans);
    font-size: 0.875em;
    font-weight: bold;
    text-anchor: start;
    dominant-baseline: central;
  }
</style>

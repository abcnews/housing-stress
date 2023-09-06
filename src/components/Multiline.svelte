<svelte:options namespace="svg" />

<script lang="ts">
  import { getContext } from 'svelte';
  import { group } from 'd3-array';
  import Line from './Line.svelte';
  import { fade } from 'svelte/transition';
  import { Breakdown, LayerCakeContext, Settings, Tenure } from '../schemas';
  import { createPreviousStore } from '../stores';
  import { getColourFor } from '../colours';
  import { getLabelColour } from '@abcnews/palette';
  const { data, xGet, yGet, custom } = getContext<LayerCakeContext>('LayerCake');

  $: grouped = group(
    $data,
    d => d.tenure,
    d => d.breakdown
  );

  const previousSettings = createPreviousStore<Settings>(custom);

  const getValues = (data, getX, getY) => data.map(d => [getX(d), getY(d)]);
  const getSeries = (tenure: string, series: string) =>
    $data.filter(d => d.tenure === tenure && d.breakdown === series);
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

  type LabelData = { tenure: Tenure; breakdown: Breakdown; y: number; x: number }[];

  const LABEL_HEIGHT = 16;

  const positionLineLabels = (lineLabels: LabelData) => {
    const minDistance = LABEL_HEIGHT;
    let resolved = false;
    let attempts = 0;
    lineLabels.sort((a, b) => a.y - b.y);
    while (!resolved && attempts < 100) {
      resolved = true;
      attempts++;
      for (let i = 1; i < lineLabels.length; i++) {
        const a = lineLabels[i - 1];
        const b = lineLabels[i];
        const dist = Math.abs(a.y - b.y);
        if (dist < minDistance) {
          resolved = false;
          const delta = (minDistance - dist) / 2;
          a.y -= delta;
          b.y += delta;
        }
      }
    }
    return lineLabels;
  };

  $: selectedTenureTypes = $custom.selectedTenureTypes;
  $: selectedSeries = $custom.selectedSeries;
  $: lineLabels = !$custom.showLineLabels
    ? []
    : positionLineLabels(
        [...grouped].reduce<LabelData>((acc, [tenureType, tenureData]) => {
          const labels = [...tenureData].reduce<LabelData>((acc, [series, data]) => {
            if (selectedTenureTypes?.includes(tenureType) && selectedSeries?.includes(series)) {
              acc.push({
                tenure: tenureType,
                breakdown: series,
                y: $yGet(data[data.length - 1]),
                x: $xGet(data[data.length - 1])
              });
            }
            return acc;
          }, []);
          return [...acc, ...labels];
        }, [])
      );
</script>

<g class="line-group">
  {#each [...grouped] as [tenureType, tenureTypeData] (tenureType)}
    {#each [...tenureTypeData] as [series, data] (series)}
      {#if selectedTenureTypes?.includes(tenureType) && selectedSeries?.includes(series)}
        <g transition:fade>
          <Line
            stroke={getColourFor(series, tenureType)}
            start={getStartingValues(tenureType, series, $previousSettings, $xGet, $yGet)}
            data={data.map(d => [$xGet(d), $yGet(d)])}
          />
        </g>
      {/if}
    {/each}
  {/each}

  {#each lineLabels as { tenure, breakdown, x, y } (tenure + breakdown)}
    <text transition:fade style:fill={getLabelColour(getColourFor(breakdown, tenure))} class="line-label" x={x + 7} {y}
      >{breakdown}</text
    >
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

<script lang="ts">
  import { LayerCake, Svg } from 'layercake';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import Multiline from './Multiline.svelte';
  import { tweened } from 'svelte/motion';
  import { Age, DataSchema, Extent } from '../schemas';
  import Annotation from './Annotation.svelte';
  import { annotations as annotationDefs } from '../constants';
  import { getColourFor } from '../colours';

  export let data: DataSchema;
  export let selectedTenureTypes: string[] = [];
  export let selectedSeries: string[] = [];
  export let showLineLabels: boolean = false;
  export let title: string;
  export let subtitle: { id: string; text: string } | undefined;
  export let minYear: number = 1984;
  export let maxYear: number = 2023;
  export let maxY: number = 0.65;
  export let annotations: string[] = [];
  export let height: string = '100vh';
  export let padding: string = '10vh 0 12vh';

  const getAnnotationConfig = (name: string) => annotationDefs.find(d => d.name === name);

  let extents: { x?: Extent; y?: Extent };

  $: extents = { x: [minYear, maxYear], y: [0, maxY] };

  const xDomain = tweened<Extent>();
  const yDomain = tweened<Extent>();

  $: xDomain.set(extents.x);
  $: yDomain.set(extents.y);
  $: includesAge = [...Age.options].some(d => selectedSeries.includes(d));
</script>

<div class="chart-container" style="--container-height: {height}; --padding: {padding};">
  <div class="title-block">
    <h2 class="chart-title">{title}</h2>
    <h3
      style="--text-colour:{getColourFor('overall', subtitle?.id === 'r' ? 'renter' : 'mortgagor')}"
      class="chart-subtitle chart-title-{subtitle?.id}"
    >
      {subtitle?.text || ''}&nbsp;
    </h3>
  </div>
  <div>
    <LayerCake
      {data}
      x={d => d.year}
      y={d => d.pct}
      z={d => d.breakdown}
      padding={{ top: 0, right: includesAge ? 65 : 30, bottom: 50, left: 30 }}
      xDomain={$xDomain}
      yDomain={$yDomain}
      custom={{ selectedTenureTypes, selectedSeries, showLineLabels }}
    >
      <Svg>
        <AxisX gridlines={false} baseline={true} ticks={5} />
        <AxisY formatTick={d => `${d * 100} %`} />
        <Multiline />
      </Svg>
      {#each annotations as annotationName (annotationName)}
        {@const annotation = getAnnotationConfig(annotationName)}
        {#if annotation}
          <Annotation {annotation} />
        {/if}
      {/each}
    </LayerCake>
  </div>
</div>

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: var(--container-height, 100vh);
    overflow: hidden;
    padding: var(--padding, 10vh 0 12vh);
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .chart-title,
  .chart-subtitle {
    font-family: var(--dls-font-stack-sans);
    font-weight: 700;
    font-size: 18px;
    text-align: center;
  }

  .chart-subtitle {
    font-size: 16px;
    color: var(--text-colour);
    margin-top: 1em;
  }
</style>

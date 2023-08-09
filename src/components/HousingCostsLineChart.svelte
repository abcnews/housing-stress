<script lang="ts">
  import { Html, LayerCake, Svg } from 'layercake';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import Multiline from './Multiline.svelte';
  import { tweened } from 'svelte/motion';
  import { DataSchema, Extent } from '../schemas';
  import Annotation from './Annotation.svelte';
  import Arrow from './Arrow.svelte';
  import { annotations as annotationDefs } from '../constants';
  import { getColourFor } from './colours';

  export let data: DataSchema;
  export let selectedTenureTypes: string[] = [];
  export let selectedSeries: string[] = [];
  export let showLineLabels: boolean = false;
  export let title: string;
  export let subtitle: { id: string; text: string } | undefined;
  export let minYear: number = 1984;
  export let maxYear: number = 2023;
  export let annotations: string[] = [];

  const getAnnotationConfig = (name: string) => annotationDefs.find(d => d.name === name);

  let extents: { x?: Extent; y?: Extent };

  $: extents = { x: [minYear, maxYear], y: [0, 0.65] };

  const xDomain = tweened<Extent>();
  const yDomain = tweened<Extent>();

  $: xDomain.set(extents.x);
  $: yDomain.set(extents.y);
</script>

<div class="chart-container">
  <div class="title-block">
    <h2 class="chart-title">{title}</h2>
    <h3
      style="--text-colour:{getColourFor('all', subtitle?.id === 'r' ? 'rent' : 'mortgage')}"
      class="chart-subtitle chart-title-{subtitle?.id}"
    >
      {subtitle?.text || ''}&nbsp;
    </h3>
  </div>
  <div>
    <LayerCake
      {data}
      x={2}
      y={3}
      z={1}
      padding={{ top: 0, right: 30, bottom: 50, left: 25 }}
      xDomain={$xDomain}
      yDomain={$yDomain}
      custom={{ selectedTenureTypes, selectedSeries, showLineLabels }}
    >
      <Svg>
        <AxisX gridlines={false} baseline={true} ticks={5} />
        <AxisY formatTick={d => `${d * 100} %`} />
        <Multiline />
      </Svg>
      <Svg>
        {#each annotations as annotationName}
          {@const annotation = getAnnotationConfig(annotationName)}
          {#if annotation && annotation.arrows}
            {#each annotation.arrows as arrow}
              <Arrow source={{ ...annotation, ...arrow.source }} target={{ ...arrow.target, arrowSize: 0 }} curve={0} />
            {/each}
          {/if}
        {/each}
      </Svg>
      <Html>
        {#each annotations as annotationName}
          {@const annotation = getAnnotationConfig(annotationName)}
          {#if annotation}
            <Annotation
              --text-colour={getColourFor(annotation.series || '', annotation.tenureType || '')}
              {...annotation}
            >
              {@html annotation.text}
            </Annotation>
          {/if}
        {/each}
      </Html>
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
    height: 100%;
    overflow: hidden;
    padding: 10dvh 0;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .chart-title,
  .chart-subtitle {
    font-family: var(--dls-font-stack-sans);
    font-weight: 700;
    font-size: 1.125rem;
    text-align: center;
  }

  .chart-subtitle {
    font-size: 1rem;
    color: var(--text-colour);
    margin-top: 1em;
  }
</style>

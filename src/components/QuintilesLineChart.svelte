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

  export let data: DataSchema;
  export let selectedTenureTypes: string[] = [];
  export let selectedSeries: string[] = [];
  export let minYear: number = 1984;
  export let maxYear: number = 2023;
  export let annotations: string[] = [];

  const getAnnotationConfig = (name: string) => annotationDefs.find(d => d.name === name);

  let extents: { x?: Extent; y?: Extent };

  $: extents = { x: [minYear, maxYear], y: [0, 0.7] };

  const xDomain = tweened<Extent>();
  const yDomain = tweened<Extent>();

  $: xDomain.set(extents.x);
  $: yDomain.set(extents.y);
</script>

<div class="chart-container">
  <LayerCake
    {data}
    x={2}
    y={3}
    z={1}
    padding={{ top: 8, right: 20, bottom: 50, left: 25 }}
    xDomain={$xDomain}
    yDomain={$yDomain}
    custom={{ selectedTenureTypes, selectedSeries }}
  >
    <Svg>
      <Multiline />
      <AxisX gridlines={false} tickMarks={true} ticks={5} />
      <AxisY formatTick={d => `${d * 100}%`} />
    </Svg>
    <Svg>
      {#each annotations as annotationName}
        {@const annotation = getAnnotationConfig(annotationName)}
        {#if annotation && annotation.arrows}
          {#each annotation.arrows as arrow}
            <Arrow source={{ ...annotation }} target={{ ...arrow.target, arrow: 13 }} curve={-0.5} />
          {/each}
        {/if}
      {/each}
    </Svg>
    <Html>
      {#each annotations as annotationName}
        {@const annotation = getAnnotationConfig(annotationName)}
        {#if annotation}
          <Annotation {...annotation}>
            {annotation.text}
          </Annotation>
        {/if}
      {/each}
    </Html>
  </LayerCake>
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
  }
</style>

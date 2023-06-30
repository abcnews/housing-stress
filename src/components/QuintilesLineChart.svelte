<script lang="ts">
  import { LayerCake, Svg, calcExtents } from 'layercake';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import Multiline from './Multiline.svelte';
  import { quintileDataSchema } from '../schemas';
  import { z } from 'zod';
  import { tweened } from 'svelte/motion';
  export let data: z.infer<typeof quintileDataSchema>;

  export let selectedTenureType: string = 'overall';
  export let selectedQuintiles: string[] = [];
  let filteredData: z.infer<typeof quintileDataSchema>;
  $: filteredData = data.filter(d => d[0] === selectedTenureType);

  type Extent = [number, number] | [string, string] | undefined;

  let extents: {
    x?: Extent;
    y?: Extent;
  } = {
    x: [0, 0],
    y: [0, 0]
  };

  $: if (filteredData.length)
    extents = calcExtents(filteredData, {
      x: d => d[2],
      y: d => d[3]
    });

  const xDomain = tweened<Extent>(extents.x);
  const yDomain = tweened<Extent>([0, 0.7]);

  $: xDomain.set(extents.x);
  $: yDomain.set([0, 0.7]);
</script>

<div class="chart-container">
  <LayerCake
    data={filteredData}
    x={2}
    y={3}
    z={1}
    padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
    xDomain={$xDomain}
    yDomain={$yDomain}
    custom={{ selectedTenureType, selectedQuintiles }}
  >
    <Svg>
      <Multiline />
      <AxisX />
      <AxisY formatTick={d => `${d * 100}%`} />
    </Svg>
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
    height: 300px;
  }
</style>

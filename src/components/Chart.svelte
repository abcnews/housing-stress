<script lang="ts">
  import { LayerCake, Svg } from 'layercake';
  import Line from './Line.svelte';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';

  import data from '../../data/housing-data-clean/quintiles.json';
  import Multiline from './Multiline.svelte';
</script>

<div class="chart-container">
  <LayerCake flatData={data} {data} x={1} y={2} z={0} padding={{ top: 8, right: 10, bottom: 20, left: 25 }} yNice={10}>
    <Svg>
      <Multiline />
      <AxisX />
      <AxisY />
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

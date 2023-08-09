<script lang="ts">
  import { getContext } from 'svelte';
  import { LayerCakeContext } from '../schemas';
  import { nanoid } from 'nanoid';

  export let source: { x: number; y: number; offset?: number; arrowSize?: number };
  export let target: { x: number; y: number; offset?: number; arrowSize?: number };
  export let curve: number = 0;
  export let offset: number = 10;

  const { xScale, yScale } = getContext<LayerCakeContext>('LayerCake');
  const id = nanoid();

  let x1: number;
  let y1: number;
  let x2: number;
  let y2: number;
  let path: string;

  const interpolate = (from: number, to: number, t: number) => to + (from - to) * t;

  $: {
    let anchors = {
      source: {
        x: $xScale(source.x),
        y: $yScale(source.y)
      },
      target: {
        x: $xScale(target.x),
        y: $yScale(target.y)
      }
    };

    let length = Math.sqrt(
      Math.pow(anchors.target.x - anchors.source.x, 2) + Math.pow(anchors.target.y - anchors.source.y, 2)
    );

    x1 = interpolate(anchors.target.x, anchors.source.x, (source.offset || offset) / length);
    y1 = interpolate(anchors.target.y, anchors.source.y, (source.offset || offset) / length);
    x2 = interpolate(anchors.source.x, anchors.target.x, (target.offset || offset) / length);
    y2 = interpolate(anchors.source.y, anchors.target.y, (target.offset || offset) / length);

    if (curve) {
      let r = length / Math.abs(curve);
      path = `M ${x1},${y1} A ${r},${r} 0 0,${curve < 0 ? 0 : 1} ${x2},${y2}`;
    } else {
      path = `M ${x1},${y1} L ${x2},${y2}`;
    }
  }
</script>

<defs>
  {#each [source, target] as end, i}
    {#if end.arrowSize}
      <marker
        id={`arrow-${i === 0 ? 'start' : 'end'}-${id}`}
        viewBox="0 0 {end.arrowSize} {end.arrowSize}"
        refX={end.arrowSize / 2}
        refY={end.arrowSize / 2}
        markerWidth={end.arrowSize * 0.6}
        markerHeight={end.arrowSize * 0.6}
        orient="auto-start-reverse"
      >
        <path class="arrow" d={`M 0 0 L ${end.arrowSize} ${end.arrowSize / 2} L 0 ${end.arrowSize} z`} />
      </marker>
    {/if}
  {/each}
</defs>

<path
  d={path}
  marker-end={target.arrowSize ? `url(#arrow-end-${id})` : ''}
  marker-start={source.arrowSize ? `url(#arrow-start-${id})` : ''}
/>

<style>
  path {
    stroke: black;
    fill: none;
  }

  .arrow {
    stroke: none;
    fill: #000;
  }
</style>

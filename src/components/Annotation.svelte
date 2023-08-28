<script lang="ts">
  import { getContext } from 'svelte';
  import { AnnotationConfig, LayerCakeContext } from '../schemas';
  import { fade } from 'svelte/transition';
  import { Html, Svg } from 'layercake';
  import { getColourFor } from '../colours';
  import Arrow from './Arrow.svelte';

  const { xScale, yScale } = getContext<LayerCakeContext>('LayerCake');

  export let annotation: AnnotationConfig;

  let labelWidth: number;
  let labelHeight: number;

  const getOffset = (x1: number, y1: number, x2: number, y2: number, width: number, height: number) => {
    const slope = Math.abs(y1 - y2) / Math.abs(x1 - x2);
    const diagonal = height / width;
    const run = slope > diagonal ? height / 2 : width / 2;
    const ratio = slope > diagonal ? 1 / slope : slope;
    const rise = run * ratio;
    const dist = Math.sqrt(run ** 2 + rise ** 2);
    return dist;
  };
</script>

<Html --text-colour={getColourFor(annotation.series, annotation.tenureType)}>
  <div
    transition:fade
    class="annotation"
    style:left={`${$xScale(annotation.x)}px`}
    style:top={`${$yScale(annotation.y)}px`}
    bind:clientWidth={labelWidth}
    bind:clientHeight={labelHeight}
  >
    {@html annotation.text}
  </div>
</Html>

<Svg>
  {#if annotation.arrows && labelWidth && labelHeight}
    {#each annotation.arrows as arrow (arrow)}
      {@const offset =
        getOffset(
          $xScale(annotation.x),
          $yScale(annotation.y),
          $xScale(arrow.target.x),
          $yScale(arrow.target.y),
          labelWidth,
          labelHeight
        ) + (arrow.source?.offset || 0)}
      <Arrow
        source={{ ...annotation, ...arrow.source, offset: offset }}
        target={{ ...arrow.target, arrowSize: 1 }}
        curve={0}
      />
    {/each}
  {/if}
</Svg>

<style>
  .annotation {
    position: absolute;
    transform: translate(-50%, -50%);
    font-family: var(--dls-font-stack-sans);
    font-size: 0.875rem;
    text-align: center;
    color: #404040;
    font-weight: 500;
    /* inline-size: clamp(5em, fit-content, 50%); */
    inline-size: clamp(8em, 17vw, 35%);
    line-height: 1.25;
  }

  .annotation :global(em) {
    color: var(--text-colour);
    font-style: normal;
  }

  .annotation :global(strong) {
    font-weight: bold;
  }
</style>

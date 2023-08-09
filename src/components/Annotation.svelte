<script lang="ts">
  import { getContext } from 'svelte';
  import { LayerCakeContext } from '../schemas';
  import { fade } from 'svelte/transition';

  const { xScale, yScale, xRange } = getContext<LayerCakeContext>('LayerCake');

  export let x: number;
  export let y: number;
</script>

<div
  transition:fade
  class="annotation"
  style:left={`${$xScale(x)}px`}
  style:text-align={$xScale(x) > $xRange[1] * 0.25 ? 'right' : 'left'}
  style:top={`${$yScale(y)}px`}
>
  <slot />
</div>

<style>
  .annotation {
    position: absolute;
    transform: translate(-50%, -50%);
    font-family: var(--dls-font-stack-sans);
    font-size: 0.875rem;
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

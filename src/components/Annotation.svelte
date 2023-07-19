<script lang="ts">
  import { getContext } from 'svelte';
  import { LayerCakeContext } from '../schemas';

  const { xScale, yScale } = getContext<LayerCakeContext>('LayerCake');

  export let x: number;
  export let y: number;
</script>

<div class="annotation" style:left={`${$xScale(x)}px`} style:top={`${$yScale(y)}px`}><slot /></div>

<style>
  .annotation {
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 12px;
    font-family: var(--dls-font-stack-sans);
  }
</style>

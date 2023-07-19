<script lang="ts">
  import { encode } from '@abcnews/base-36-props';
  import Snapshots from '../Snapshots/Snapshots.svelte';
  export let onLoad;
  export let configuration;
  export let calculateMarker = (json: JSON) => `#MARK${encode(json)}`;

  let controlsWidth: number = 400;

  let resizing = false;

  const startResize = () => (resizing = true);
  const endResize = () => (resizing = false);
  const handleResize = (e: PointerEvent) => {
    if (resizing) {
      controlsWidth -= e.movementX;
    }
  };
</script>

<svelte:window on:pointerup={endResize} />

<div class="container" style={`--controls-width: ${controlsWidth}px`} on:pointermove={handleResize}>
  <div class="visualisation">
    <div class="stage">
      <slot name="visualisation">Put your visualisation in the "visualisation" slot.</slot>
    </div>
  </div>
  <div class="controls">
    <div class="handle" on:pointerdown={startResize} />
    <div class="controls-content">
      <slot name="controls" />
      <Snapshots {configuration} {onLoad} {calculateMarker} />
    </div>
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr var(--controls-width);
    height: 100vh;
    width: 100vw;
    background-color: #fcfcfc;
  }
  .visualisation,
  .controls {
    position: relative;
    overflow: hidden;
  }

  .controls {
    padding-left: 11px;
  }

  .visualisation {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .controls-content {
    overflow: auto;
    height: 100%;
    width: 100%;
    padding: 15px;
  }

  .stage {
    height: 80%;
    width: 80%;
    background-color: #fff;
    resize: both;
    overflow: hidden;
    border: 1px solid #e1e1e1;
    box-shadow: #e1e1e1 0 0 12px;
  }

  .handle {
    position: absolute;
    top: 0;
    left: 4px;
    width: 3px;
    height: 100%;
    background: #ccc;
    cursor: ew-resize;
  }

  .handle::after {
    position: absolute;
    content: '';
    width: 1px;
    height: 50px;
    top: 50%;
    left: 4px;
    background-color: #ccc;
    transform: translateY(-50%);
  }

  .handle::before {
    position: absolute;
    content: '';
    width: 1px;
    height: 50px;
    top: 50%;
    left: -2px;
    background-color: #ccc;
    transform: translateY(-50%);
  }
</style>

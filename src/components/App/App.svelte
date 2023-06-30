<script lang="ts">
  import 'carbon-components-svelte/css/white.css';
  import { Button, Checkbox, FormGroup, Select, SelectItem } from 'carbon-components-svelte';
  import QuintilesLineChart from '../QuintilesLineChart.svelte';
  import quintiles from '../../../data/housing-data-clean/quintiles.json';
  import { quintileDataSchema } from '../../schemas';
  import { encode } from '@abcnews/base-36-props';

  const data = quintileDataSchema.parse(quintiles);
  let selectedQuintiles: string[] = [];
  let selectedTenureType: string;
  let configuration = {};

  $: configuration = {
    selectedQuintiles,
    selectedTenureType
  };

  $: stringifiedConfiguration = JSON.stringify(configuration, undefined, 2);
</script>

<div class="container">
  <div class="visuals">
    {#if selectedTenureType && selectedQuintiles}
      <QuintilesLineChart {data} {selectedQuintiles} {selectedTenureType} />
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
  <div class="controls">
    <FormGroup>
      <Select labelText="Dataset" bind:selected={selectedTenureType}>
        <SelectItem value="overall" text="Quintiles - overall" />
        <SelectItem value="mortgage" text="Quintiles - mortgage" />
        <SelectItem value="rent" text="Quintiles - rent" />
      </Select>
    </FormGroup>
    <FormGroup legendText="Quintiles">
      {#each Array(5) as _, i}
        <Checkbox name="quartiles" bind:group={selectedQuintiles} labelText={`Q${i + 1}`} value={`Q${i + 1}`} />
      {/each}
    </FormGroup>
    <textarea bind:value={stringifiedConfiguration} />
    <code>
      <pre>{encode(configuration)}</pre>
    </code>
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 300px;
  }
  .visuals,
  .controls {
    padding: 10px;
  }
</style>

<script lang="ts">
  import 'carbon-components-svelte/css/white.css';
  import { Checkbox, FormGroup, Slider } from 'carbon-components-svelte';
  import QuintilesLineChart from '../QuintilesLineChart.svelte';
  import quintiles from '../../../data/housing-data-clean/quintiles.json';

  import { DataSchema, VisualisationConfiguration } from '../../schemas';

  import Builder from '../Builder/Builder.svelte';
  import { annotations } from '../../constants';
  import { encode } from '@abcnews/base-36-props';

  const data = DataSchema.parse(quintiles);
  let configuration = VisualisationConfiguration.parse(undefined);

  let onLoad = c => {
    configuration = VisualisationConfiguration.parse(c);
  };

  const series = [
    ['Q1', 'Quintile 1'],
    ['Q2', 'Quintile 2'],
    ['Q3', 'Quintile 3'],
    ['Q4', 'Quintile 4'],
    ['Q5', 'Quintile 5'],
    ['all', 'Overall']
  ];
  const tenureTypes = [
    ['overall', 'Everyone'],
    ['rent', 'Renters'],
    ['mortgage', 'Mortgagees']
  ];
</script>

<Builder {configuration} {onLoad} calculateMarker={config => `#markCONFIG${encode(config)}`}>
  <QuintilesLineChart slot="visualisation" {data} {...configuration} />
  <svelte:fragment slot="controls">
    <FormGroup legendText="Tenure types">
      {#each tenureTypes as tenure}
        <Checkbox
          name="series"
          bind:group={configuration.selectedTenureTypes}
          labelText={tenure[1]}
          value={tenure[0]}
        />
      {/each}
    </FormGroup>
    <FormGroup legendText="Series">
      {#each series as s}
        <Checkbox name="series" bind:group={configuration.selectedSeries} labelText={s[1]} value={s[0]} />
      {/each}
    </FormGroup>
    <FormGroup>
      <Slider labelText="Minimum year" name="minYear" min={1984} max={2023} bind:value={configuration.minYear} />
      <Slider labelText="Maximum year" name="maxYear" min={1984} max={2023} bind:value={configuration.maxYear} />
    </FormGroup>
    <FormGroup legendText="Annotations">
      {#each annotations as annotation}
        <Checkbox
          name="annotations"
          bind:group={configuration.annotations}
          labelText={annotation.name}
          value={annotation.name}
        />
      {/each}
    </FormGroup>
  </svelte:fragment>
</Builder>

<style>
</style>

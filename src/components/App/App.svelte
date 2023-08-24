<script lang="ts">
  import 'carbon-components-svelte/css/white.css';
  import { Checkbox, FormGroup, Slider, RadioButton, RadioButtonGroup } from 'carbon-components-svelte';
  import HousingCostsLineChart from '../HousingCostsLineChart.svelte';
  import dataRaw from '../../../data/housing-data-clean/data.json';

  import { DataSchema, VisualisationConfiguration } from '../../schemas';

  import Builder from '../Builder/Builder.svelte';
  import { annotations, subtitles } from '../../constants';
  import { encode } from '@abcnews/base-36-props';

  const data = DataSchema.parse(dataRaw);
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
    ['<35', '<35'],
    ['35 to 49', '35 to 49'],
    ['50 to 64', '50 to 64'],
    ['65+', '65+'],
    ['overall', 'Overall']
  ];
  const tenureTypes = [
    ['everyone', 'Everyone'],
    ['renter', 'Renters'],
    ['mortgagee', 'Mortgagees'],
    ['owner', 'Owners']
  ];
</script>

<Builder {configuration} {onLoad} calculateMarker={config => `#markCONFIG${encode(config)}`}>
  <HousingCostsLineChart
    slot="visualisation"
    {data}
    {...configuration}
    title="Housing costs as a portion of disposable income"
    subtitle={subtitles.find(d => d.id === configuration.subtitle)}
  />
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
      <RadioButtonGroup legendText="Subtitle" bind:selected={configuration.subtitle}>
        <RadioButton labelText="None" value="" />
        {#each subtitles as subtitle}
          <RadioButton labelText={subtitle.text} value={subtitle.id} />
        {/each}
      </RadioButtonGroup>
    </FormGroup>
    <FormGroup legendText="Labels">
      <Checkbox labelText={'Show line labels'} name="showLineLabels" bind:checked={configuration.showLineLabels} />
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

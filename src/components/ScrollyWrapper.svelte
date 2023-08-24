<script lang="ts">
  import HousingCostsLineChart from './HousingCostsLineChart.svelte';
  import dataRaw from '../../data/housing-data-clean/data.json';
  import { decode } from '@abcnews/base-36-props';
  import { DataSchema, VisualisationConfiguration } from '../schemas';
  import Scrollyteller from '@abcnews/svelte-scrollyteller';
  import { subtitles } from '../constants';
  import { updateConfig } from '../utils';

  export let panels;
  const data = DataSchema.parse(dataRaw);

  let configuration = VisualisationConfiguration.parse(undefined);

  const setConfig = d => {
    configuration = updateConfig(VisualisationConfiguration.parse(decode(d.config)));
  };
</script>

<Scrollyteller {panels} onMarker={setConfig}>
  <div class="container">
    <HousingCostsLineChart
      {data}
      {...configuration}
      title="Housing costs as a portion of disposable income"
      subtitle={subtitles.find(d => d.id === configuration.subtitle)}
    />
  </div>
</Scrollyteller>

<style>
  .container {
    margin: auto;
    /* padding-left: calc(30% - 24.75rem + 49.5rem);
    padding-right: calc(30% - 24.75rem); */
    /* width: calc(100% - 49.5rem); */
    /* padding: 20% 0; */
    height: 100%;
    margin-left: calc(30% + 24.75rem - 3rem);
    width: calc(70% - 24.75rem);
    max-width: 39rem;
  }

  @media (max-width: 1022px) {
    .container {
      margin: 0;
      padding: 0 8%;
      width: auto;
      max-width: none;
    }
  }
</style>

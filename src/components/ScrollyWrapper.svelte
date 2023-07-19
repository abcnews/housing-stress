<script lang="ts">
  import QuintilesLineChart from './QuintilesLineChart.svelte';
  import quintiles from '../../data/housing-data-clean/quintiles.json';
  import { decode } from '@abcnews/base-36-props';
  import { DataSchema, VisualisationConfiguration } from '../schemas';
  import Scrollyteller from '@abcnews/svelte-scrollyteller';

  export let panels;
  const data = DataSchema.parse(quintiles);

  let configuration = VisualisationConfiguration.parse(undefined);

  const setConfig = d => {
    configuration = VisualisationConfiguration.parse(decode(d.config));
  };
</script>

<Scrollyteller {panels} onMarker={setConfig}>
  <div class="container">
    <QuintilesLineChart {data} {...configuration} />
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
      padding: 15%;
      width: auto;
      max-width: none;
    }
  }
</style>

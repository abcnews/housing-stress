<script lang="ts">
  import HousingCostsLineChart from './HousingCostsLineChart.svelte';
  import dataRaw from '../../data/housing-data-clean/data.json';
  import { decode } from '@abcnews/base-36-props';
  import { DataSchema, VisualisationConfiguration } from '../schemas';
  import Scrollyteller from '@abcnews/svelte-scrollyteller';
  import { subtitles } from '../constants';
  import { updateConfig } from '../utils';

  export let panels;
  export let name: string;
  const data = DataSchema.parse(dataRaw);

  let configuration = VisualisationConfiguration.parse(undefined);

  const setConfig = d => {
    configuration = VisualisationConfiguration.parse(updateConfig(decode(d.config)));
  };
</script>

<div class="scrolly-wrapper {name}">
  <Scrollyteller
    {panels}
    --color-panel-background="rgba(255,255,255,0.85)"
    --color-panel-text="#000"
    onMarker={setConfig}
  >
    <div class="container">
      <HousingCostsLineChart
        {data}
        {...configuration}
        title={configuration.title}
        subtitle={subtitles.find(d => d.id === configuration.subtitle)}
      />
    </div>
  </Scrollyteller>
</div>

<style>
  .container {
    margin: auto;
    height: 100%;
    margin-right: calc(30% + 24.75rem - 3rem);
    width: calc(70% - 24.75rem);
    max-width: 39rem;
  }

  .scrolly-wrapper :global(.st-panel.first) {
    margin-top: 10vh;
  }

  .scrolly-wrapper :global(.st-panel.last) {
    margin-bottom: 40vh;
  }

  .scrolly-wrapper.income :global(.st-panel.first) {
    margin-top: 40vh;
  }

  /* Narrow screen view */
  @media (max-width: 1022px) {
    .container {
      margin: 0;
      padding: 0 8%;
      width: auto;
      max-width: none;
    }

    .scrolly-wrapper :global(.st-panel.first) {
      margin-top: 40vh;
    }
    .scrolly-wrapper :global(.st-panel.last) {
      margin-bottom: 100vh;
    }
  }
</style>

import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { loadScrollyteller } from '@abcnews/svelte-scrollyteller';
import ScrollyWrapper from './components/ScrollyWrapper.svelte';
import { proxy } from '@abcnews/dev-proxy';
import dataRaw from '../data/housing-data-clean/data.json';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import { DataSchema, VisualisationConfiguration } from './schemas';
import acto from '@abcnews/alternating-case-to-object';
import { decode } from '@abcnews/base-36-props';
import HousingCostsLineChart from './components/HousingCostsLineChart.svelte';
import { subtitles } from './constants';
import { updateConfig } from './utils';

const init = async () => {
  await whenOdysseyLoaded;

  ['income', 'age', 'a', 'b', 'c'].forEach(name => {
    try {
      const scrollyConfig = loadScrollyteller(name, 'u-full', 'mark');

      // Enforce a default alignment
      scrollyConfig.panels = scrollyConfig.panels.map(d => {
        return { ...d, align: d.align || 'right' };
      });

      new ScrollyWrapper({
        target: scrollyConfig.mountNode,
        props: {
          panels: scrollyConfig.panels,
          name
        }
      });
    } catch (e) {
      console.warn(e);
    }
  });

  selectMounts('chart').map(mount => {
    const mountValue = getMountValue(mount);
    const mountData = acto(mountValue);
    const data = DataSchema.parse(dataRaw);

    if (typeof mountData.config === 'string') {
      const config = VisualisationConfiguration.parse(updateConfig(decode(mountData.config)));

      new HousingCostsLineChart({
        target: mount,
        props: {
          height: '390px',
          padding: '20px 0',
          data,
          ...config,
          title: config.title,
          subtitle: subtitles.find(d => d.id === config.subtitle)
        }
      });
    }
  });
};

proxy('housing-stress').then(init);

if (process.env.NODE_ENV === 'development') {
  console.debug(`[housing-stress] public path: ${__webpack_public_path__}`);
}

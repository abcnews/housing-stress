import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { loadScrollyteller } from '@abcnews/svelte-scrollyteller';
import ScrollyWrapper from './components/ScrollyWrapper.svelte';
import { proxy } from '@abcnews/dev-proxy';

const init = async () => {
  await whenOdysseyLoaded;

  const scrollyConfig = loadScrollyteller('', 'u-full', 'mark');

  scrollyConfig.panels = scrollyConfig.panels.map(d => ({ ...d, align: d.align || 'left' }));

  new ScrollyWrapper({
    target: scrollyConfig.mountNode,
    props: {
      panels: scrollyConfig.panels
    }
  });
  // }
};

proxy('housing-stress').then(init);

if (process.env.NODE_ENV === 'development') {
  console.debug(`[housing-stress] public path: ${__webpack_public_path__}`);
}

import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { loadScrollyteller } from '@abcnews/svelte-scrollyteller';
import ScrollyWrapper from './components/ScrollyWrapper.svelte';
import { proxy } from '@abcnews/dev-proxy';

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
};

proxy('housing-stress').then(init);

if (process.env.NODE_ENV === 'development') {
  console.debug(`[housing-stress] public path: ${__webpack_public_path__}`);
}

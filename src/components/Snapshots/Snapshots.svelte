<script lang="ts">
  import { Accordion, AccordionItem, Button, CodeSnippet } from 'carbon-components-svelte';
  import Save from 'carbon-icons-svelte/lib/Save.svelte';
  import Trash from 'carbon-icons-svelte/lib/TrashCan.svelte';
  import { encode } from '@abcnews/base-36-props';
  import { onMount } from 'svelte';

  export let onLoad;
  export let configuration;
  export let calculateMarker = (json: JSON) => `#MARK${encode(json)}`;

  $: stringifiedConfiguration = JSON.stringify(configuration, undefined, 2);

  let snapshots: Record<string, unknown> = {};

  onMount(() => {
    snapshots = JSON.parse(localStorage.getItem('snapshots') || '{}');
  });

  const saveSnapshot = () => {
    let name = prompt('Name your snapshot?', `Snapshot ${Object.values(snapshots).length + 1}`);

    while (name && snapshots[name]) {
      name = prompt('A snapshot with this name already exists, delete it first or choose another name', name);
    }

    if (!name) return;

    snapshots[name] = JSON.parse(JSON.stringify(configuration));
    localStorage.setItem('snapshots', JSON.stringify(snapshots));
  };

  const deleteSnapshot = (name: string) => {
    delete snapshots[name];
    snapshots = snapshots;
    localStorage.setItem('snapshots', JSON.stringify(snapshots));
  };
</script>

<hr />
<h1>Marker code for CoreMedia</h1>
<CodeSnippet type="multi" wrapText code={calculateMarker(configuration)} />

<hr />
<h1>Saved configurations</h1>
<Button icon={Save} on:click={saveSnapshot}>Save current configuration</Button>
<h2>Load configuration</h2>
<div>
  <ul>
    {#each Object.entries(snapshots) as [name, c] (name)}
      <li class="snapshot-item">
        <Button
          kind="ghost"
          icon={Trash}
          iconDescription="Delete this snapshot"
          on:click={() => deleteSnapshot(name)}
        />
        <Button kind="ghost" size="small" on:click={() => onLoad && onLoad(c)}>Restore {name}</Button>
      </li>
    {/each}
  </ul>
</div>

<style>
  h1,
  h2 {
    margin: 0.8em 0 0.5em;
    font-weight: bold;
  }
  h1 {
    font-size: 1.3em;
  }
  h2 {
    font-size: 1.1em;
  }
  .snapshot-item {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  hr {
    margin: 2em 0;
    opacity: 0.1;
  }
</style>

<script lang="ts">
  export let data: string;

  import Dropdown from '../Dropdown.svelte';
  import { blockLookupStore } from '../../../stores';

  const blockNames = $blockLookupStore.map(block => block.name).sort();
  let blockName: string = blockNames[0];

  $: {
    data = blockName;
  }
</script>

<Dropdown 
  options={blockNames} 
  hue={35} 
  bind:value={blockName} />
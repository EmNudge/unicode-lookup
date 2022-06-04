<script lang="ts">
  export let data: string;

  import Dropdown from '../Dropdown.svelte';
  import { BidiClassMap } from '$src/worker/retrieval';


  const displayToBidiMap = new Map([...BidiClassMap.entries()].map(([className, displayName]) => {
    return [`${className} (${displayName})`, className];
  }));
  const names = [...displayToBidiMap.keys()];

  let displayName: string = names[0];

  $: {
    data = displayToBidiMap.get(displayName)!;
  }
</script>

<Dropdown 
  options={names} 
  hue={35} 
  bind:value={displayName} />
<script lang="ts">
  export let data: number = 0;

  import Dropdown from '../Dropdown.svelte';
  import { planeMap } from '../../../utils/unicode';

  const nameToNumMap = new Map<string, number>(Array
    .from({ length: 17 })
    .map((_, i) => {
      const name = planeMap.get(i) || 'Unassigned';
      return [`(${i}) ${name}`, i];
    })
  );
  const names = [...nameToNumMap.keys()];
  let activeName = names[0];

  $: {
    data = nameToNumMap.get(activeName)!;
  }
</script>

<Dropdown 
  options={names} 
  hue={35} 
  bind:value={activeName} />
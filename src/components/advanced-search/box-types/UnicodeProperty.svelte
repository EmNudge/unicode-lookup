<script>
  export let data;

  import Dropdown from '../Dropdown.svelte';
  import { properties, scripts } from '../../../utils/unicode';

  let activePropety = properties[0];
  let activeScript = scripts[0];

  $: if (activePropety === 'Script') {
    data = `Script=${activeScript}`;
  } else {
    data = activePropety;
  }
</script>

<Dropdown 
  options={properties} 
  hue={35} 
  bind:value={activePropety} />
  
{#if activePropety === 'Script'}
  <Dropdown 
    options={scripts} 
    hue={35} 
    bind:value={activeScript} />
{/if}
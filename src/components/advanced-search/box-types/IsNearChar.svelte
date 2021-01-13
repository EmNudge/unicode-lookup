<script lang="ts">
  import Input from '../Input.svelte';

  let char: string = '✅';
  let distance: number = 50;

  type Data = { char: string, distance: number };
	export let data: Data = { char, distance };
  
  $: {
    data = { char, distance };
  }

  function handleValidChar(text: string) {
    if ([...text].length === 1) return true;

    return 'only a single character allowed';
  }
  
  function handleValidDistance(_text: string, num: number) {
    if (Number.isNaN(num)) return 'Invalid number';
    if (num <= 0) return 'Number must be greater than 0';
    
    return true;
  }
</script>

<span>Character</span>
<Input 
  placeholder="some character" 
  validator={handleValidChar}
  bind:value={char} />
  
<span>Distance</span>
<Input 
  placeholder="some number > 0" 
  mutator={Number}
  validator={handleValidDistance}
  bind:value={distance} />
<script lang="ts">
  import NumberInput from '../NumberInput.svelte';
  import Input from '../Input.svelte';

  let char: string = '✅';
  let distance: number = 50;

  type Data = { char: string, distance: number };
	export let data: Data = { char, distance };
  
  $: {
    data = { char, distance };
  }

  function possiblyConvert(text: string) {
    const numTextRes = text.match(/0x([A-Fa-f0-9]+)/);
    if (!numTextRes) return text;

    const num = parseInt(numTextRes[1]);
    return String.fromCodePoint(num);    
  }
  function handleValidChar(text: string) {
    if ([...text].length === 1) return true;

    return 'only a single character allowed';
  }
  
  function handleValidDistance(_text: string, num: number) {
    if (Number.isNaN(num)) return 'Invalid number';
    if (num < 0) return 'Number must be 0 or greater';
    
    return true;
  }

  let insertCodepoint = false;
  let codepoint = 9989;
  $: char = String.fromCodePoint(codepoint); 
</script>

{#if !insertCodepoint}
<span>Character</span>
<Input 
  placeholder="some character"
  validator={handleValidChar}
  bind:value={char} />
{:else}
  <span>Codepoint</span>
  <NumberInput bind:value={codepoint} />
{/if}
<label>
  <span>Insert Codepoint</span>
  <input type="checkbox" bind:checked={insertCodepoint} />
</label>
<br>

<span>Distance</span>
<Input 
  placeholder="some number > 0" 
  mutator={Number}
  validator={handleValidDistance}
  bind:value={distance} />
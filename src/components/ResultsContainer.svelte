<script>
  import { loop } from '../utils/iterable'; 
  import { tick } from 'svelte';
  import Clipboard from '../icons/clipboard.svelte';

  export let results;

  
	const numLoop = loop(['dec', 'hex', 'oct']);
	let numType = numLoop.next().value;
	function getNum(num) {
		if (numType === 'hex') return `0x${num.toString(16).toLowerCase().padStart(4, '0')}`;
		if (numType === 'oct') return `0${num.toString(8).padStart(4, '0')}`;
		return num;
  }
  
	function changeCodePoint() {
 		numType = numLoop.next().value;
  }

  async function copyChar(num) {
    const char = String.fromCodePoint(num);
    navigator.clipboard.writeText(char);
  }
</script>

<div class="results">
  <!-- headers -->
  <span class="header">Character</span>
  <button class="header" on:click={changeCodePoint}>Code Point</button>
  <span class="header">Description</span>
  
  <!-- content -->
  {#each results as [num, name]}
    <span class="symbol">
      <span>{String.fromCodePoint(num)}</span>
      <Clipboard on:click={() => copyChar(num)} />
    </span>
    <span class="number">{numType && getNum(num)}</span>
    <span>{name}</span>
  {/each}
</div>

<style>
  .results {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-gap: 5px 20px;

    width: max-content;
    margin: 0 auto;
    text-align: left;
  }
  .header {
    font-weight: bold;
  }
  span {
    padding: 2px 10px;
    align-self: baseline;
  }
  .number {
    font-family: 'Courier New', Courier, monospace;
  }

  .symbol {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  .symbol span::before, .symbol span::after {
    content: '"';
  }
  .symbol :global(svg) {
    display: none;
    cursor: pointer;
  }
  .symbol :global(svg:active) {
    transform: scale(.9);
  }
  .symbol:hover :global(svg) {
    display: block;
  }
</style>
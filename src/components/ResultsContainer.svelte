<script>
  import { loop } from '../utils/iterable'; 

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
</script>

<div class="results">
  <!-- headers -->
  <span class="header">Character</span>
  <button class="header" on:click={changeCodePoint}>Code Point</button>
  <span class="header">Description</span>
  
  <!-- content -->
  {#each results as [num, name]}
    <span class="symbol">{String.fromCodePoint(num)}</span>
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
  }
  .number {
    font-family: 'Courier New', Courier, monospace;
  }
  .symbol::before, .symbol::after {
    content: '"';
  }
</style>
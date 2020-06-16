<script>
  import Clipboard from '../icons/clipboard.svelte';
  
  export let num;
  export let name;
  export let special = false;

  export let numType = 'dec';
  function getNum(num) {
		if (numType === 'hex') return `0x${num.toString(16).toLowerCase().padStart(4, '0')}`;
		if (numType === 'oct') return `0${num.toString(8).padStart(4, '0')}`;
		return num;
  }

  async function copyChar(num) {
    const char = String.fromCodePoint(num);
    navigator.clipboard.writeText(char);
  }
</script>


<span class="symbol" class:special>
  <span>{String.fromCodePoint(num)}</span>
  <Clipboard on:click={() => copyChar(num)} />
</span>

<span class="number">{numType && getNum(num)}</span>

<span>{name}</span>

<style>
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
  .symbol.special {
    border-left: 4px solid #92bdff;
  }
</style>
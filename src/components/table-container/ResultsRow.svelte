<script lang="ts">
  import Clipboard from '../../icons/clipboard.svelte';
  import { codepointTypeStore } from '../../stores';
  import { getNum } from '../../utils/char';
  export let num: number;
  export let name: string;
  export let special: boolean = false;

  $: numStr = getNum(num, $codepointTypeStore);

  async function copyChar(num: number) {
    const char = String.fromCodePoint(num);
    navigator.clipboard.writeText(char);
  }
</script>


<span class="symbol" class:special>
  <span>{String.fromCodePoint(num)}</span>
  <Clipboard on:click={() => copyChar(num)} />
  <div class="placeholder"></div>
</span>

<span class="number">{numStr}</span>

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
  .placeholder {
    height: 24px;
    width: 24px;
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
  .symbol:hover .placeholder {
    display: none;
  }
  .symbol.special {
    border-left: 4px solid #92bdff;
  }
</style>
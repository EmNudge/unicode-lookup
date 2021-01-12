<script lang="ts">
  import Clipboard from '../../icons/clipboard.svelte';
  import { codepointTypeStore, nameCasingStore, CasingType } from '../../stores';
  import { getNum } from '../../utils/char';

  export let num: number;
  export let name: string;
  export let special: boolean = false;

  $: numStr = getNum(num, $codepointTypeStore);

  function copyChar() {
    const char = String.fromCodePoint(num);
    navigator.clipboard.writeText(char);
  }

  function getName(name: string, casingType: CasingType) {
    if (casingType === CasingType.TitleCase) {
      return name
        .toLowerCase()
        .replace(/(?<=^| )./g, c => c.toUpperCase());
    }
    if (casingType === CasingType.UPPERCASE) {
      return name.toUpperCase();
    }
    
    return name.toLowerCase();
  }
</script>


<span class="symbol" class:special>
  <span>{String.fromCodePoint(num)}</span>
  <Clipboard on:click={copyChar} />
  <div class="placeholder"></div>
</span>

<span class="number styled" style="--hue: 35">{numStr}</span>

<span>{getName(name, $nameCasingStore)}</span>

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
<script lang="ts">
  import { codepointTypeStore, nameCasingStore, CasingType, activeIndex } from '../../stores';
  import { getNum } from '../../utils/char';
  import InfoContainer from './InfoContainer.svelte';

  export let codepoint: number;
  export let name: string;
  export let index: number;

  $: nameStr = getName(name, $nameCasingStore);
  $: numStr = getNum(codepoint, $codepointTypeStore);
  $: char = String.fromCodePoint(codepoint);

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

  import { quartInOut } from 'svelte/easing';
	const expand = (_node: HTMLElement, { duration, height }: { duration: number, height: number }) => ({	
    duration,
    css: (t: number) => `height: ${Math.floor(quartInOut(t) * height)}px`
	});
</script>

<tr class:highlight={index % 2 === 0}>
  <td 
    class="symbol" 
    data-index={index}
  >{char}</td>
  <td class="number styled" style="--hue: 35">{numStr}</td>
  <td>{nameStr}</td>
</tr>

{#if $activeIndex == index}
  <tr>
    <td colspan="3">
      <div transition:expand={{ duration: 500, height: 300 }} class="info-cell">
        <InfoContainer {codepoint} name={nameStr} />
      </div>
    </td>
  </tr>
{/if}

<style>
  td {
    padding: 2px 10px;
    align-self: baseline;
  }
  .info-cell {
    height: 300px;
    overflow: auto;
  }
  .number {
    font-family: 'Courier New', Courier, monospace;
  }
  .highlight {
    background: #ffffffad;
  }
  .symbol {
    padding: 5px;
    border-radius: 4px;
    text-align: center;
  }
  .symbol:hover {
    background: #47474714;
    cursor: pointer;
  }
  .symbol::after, .symbol::before {
    content: "\"";
  }
</style>
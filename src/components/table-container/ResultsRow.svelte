<script lang="ts">
  import { codepointTypeStore, nameCasingStore, CasingType, activeIndex } from '../../stores';
  import { getNum } from '../../utils/char';
  import InfoContainer from './InfoContainer.svelte';
  import type { UnicodeCharInfo } from '../../worker/retrieval'

  export let codepoint: number;
  export let info: UnicodeCharInfo;
  export let index: number;

  $: nameStr = getName(info.name, $nameCasingStore);
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

<tr style="--hue: 200">
  <td 
    class="symbol colorize" 
    data-index={index}
    class:active={$activeIndex == index}
  >{char}</td>
  <td class="number styled" style="--hue: 35">{numStr}</td>
  <td class="styled">{nameStr}</td>
</tr>

{#if $activeIndex == index}
  <tr>
    <td colspan="3">
      <div transition:expand={{ duration: 500, height: 300 }} class="info-cell">
        <InfoContainer {codepoint} name={nameStr} {info} />
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
    text-align: right;
  }
  .symbol {
    padding: 5px;
    border-radius: 4px;
    text-align: center;
    
    color: var(--hsl);
    border: 1px solid transparent;
  }
  .symbol:hover {
    cursor: pointer;
    border: 1px solid var(--hsl);
    background: var(--hsl-bg);
    transition: .15s;
  }
  .symbol::after, .symbol::before {
    content: "\"";
  }
  .active {
    box-shadow: 2px 2px 0px 0px var(--hsl);
    border: 1px solid var(--hsl);
    background: var(--hsl-bg);
  }
</style>
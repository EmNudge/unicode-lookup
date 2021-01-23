<script lang="ts">
  import { activeIndex } from '../../stores';
  import { getNum } from '../../utils/char';
  import InfoContainer from './InfoContainer.svelte';
  import type { UnicodeCharInfo } from '../../worker/retrieval'

  export let codepoint: number;
  export let info: UnicodeCharInfo;
  export let index: number;

  import { quartInOut } from 'svelte/easing';
  const cssProp = (_node: HTMLElement, { duration, goal, prop } = { duration: 500, goal: 10, prop: 'padding'}) => ({
    duration,
    css: (t: number) => `${prop}: ${Math.floor(quartInOut(t) * goal)}px`
  });
</script>

<table-row>
  <table-cell 
    class="symbol colorize" 
    data-index={index}
    class:active={$activeIndex == index}
  >
    {String.fromCodePoint(codepoint)}
  </table-cell>

  <table-cell class="number styled">
      {getNum(codepoint, 'hex')}
  </table-cell>

  <table-cell class="styled">{info.name}</table-cell>
</table-row>

{#if $activeIndex == index}
  <info-row transition:cssProp={{ duration: 500, prop: 'padding', goal: 10 }}>
    <div transition:cssProp={{ duration: 500, prop: 'height', goal: 300 }} class="info-cell">
      <InfoContainer {codepoint} name={info.name} {info} />
    </div>
  </info-row>
{/if}

<style>
  table-row {
    --hue: 200;
    padding-bottom: 3px;
  }
  table-cell {
    padding: 7px 10px;
    align-self: baseline;
    box-sizing: border-box;
    line-height: 1em;
  }
  info-row {
    padding: 10px;
  }
  .info-cell {
    height: 300px;
    overflow: auto;
    width: 100%;
  }
  .number {
    font-family: 'Courier New', Courier, monospace;
    text-align: right;
    --hue: 35;
    position: relative;
    top: -2px;
  }
  .symbol {
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
  @media screen and (max-width: 600px) {
    .symbol {
      user-select: none;
    }
  }
  .active {
    box-shadow: 2px 2px 0px 0px var(--hsl);
    border: 1px solid var(--hsl);
    background: var(--hsl-bg);
  }
</style>
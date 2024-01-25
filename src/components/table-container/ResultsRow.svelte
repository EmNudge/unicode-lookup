<script lang="ts">
  import { activeIndex, copiedCodepoint } from '$stores';
  import { getCodepoint } from '$utils/char';
  import InfoContainer from './InfoContainer.svelte';
  import type { UnicodeCharInfo } from '../../worker/retrieval'

  export let codepoint: number;
  export let info: UnicodeCharInfo;
  export let index: number;

  import { fade } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';
  const pad = (_node: Element, { duration, goal } = { duration: 500, goal: 10}) => ({
    duration,
    css: (t: number) => `
      padding: ${Math.floor(quartInOut(t) * goal)}px;
      padding-right: 0;
    `
  });
  const expand = (node: HTMLElement, { duration } = { duration: 500 }) => {
    const {height} = node.getBoundingClientRect();
    return {
      duration,
      css: (t: number) => `height: ${Math.floor(quartInOut(t) * height)}px`
    };
  };

  $: isCopied = $copiedCodepoint === codepoint;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="row-container" tabindex="0">
  <div class="row">
    <div 
      class="cell symbol" 
      class:active={$activeIndex === index}
      class:copy={isCopied}
    >
      {#if isCopied}
        <span in:fade>copied</span>
      {:else}
        <span>{String.fromCodePoint(codepoint)}</span>
      {/if}
    </div>
  
    <div class="cell number">
      <span> {getCodepoint(codepoint)} </span>
    </div>
  
    <div class="cell name">
      <span> {info.name} </span>
    </div>
  
    <div class="cell info-icon">
      <img src="/assets/info.svg" alt="info" data-index={index} />
    </div>
  </div>
  {#key $activeIndex}
    {#if $activeIndex == index}
      <div class="info-row" transition:pad={{ duration: 500, goal: 10 }}>
        <div transition:expand={{ duration: 500 }} class="info-cell">
          <InfoContainer {codepoint} name={info.name} {info} />
        </div>
      </div>
    {/if}
  {/key}
</div>


<style>
  .row-container:nth-child(even) {
    background-color: var(--bg-offset);
  }
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: .8em;
    justify-content: flex-start;
  }
  .info-icon img {
    height: 24px;
    opacity: .5;
    transition: 0.15s;
  }
  .info-icon:hover img {
    opacity: 1;
    cursor: pointer;
  }
  :global(:root[data-theme=dark]) .info-icon {
    filter: invert(1);
  }
  .info-row {
    display: flex;
    padding: 10px;
    padding-right: 0;
  }
  .row-container:nth-child(even) .info-row{
    --bg-offset: var(--bg-col);
  }
  .info-cell {
    overflow: hidden;
    width: 100%;
  }
  .number {
    font-family: monospace;
    text-align: center;
    position: relative;
    opacity: .5;
  }
  .symbol::after, .symbol::before {
    content: "\"";
  }
  @media screen and (max-width: 600px) {
    .symbol {
      user-select: none;
    }
  }
  .copy::before {
    content: '';
  }
  .copy::after {
    content: '';
  }
</style>
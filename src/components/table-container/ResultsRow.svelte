<script lang="ts">
  import { activeIndex, copiedCodepoint } from '$stores';
  import { getCodepoint } from '$utils/char';
	import type { UnicodeCharInfo } from '$utils/types';

  export let codepoint: number;
  export let info: UnicodeCharInfo;
  export let index: number;

  import { fade } from 'svelte/transition';

  $: isCopied = $copiedCodepoint === codepoint;

  let rowEl: HTMLDivElement | undefined;
  $: if ($activeIndex === index) {
    rowEl?.focus();
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="row" class:active={$activeIndex === index} tabindex="0" bind:this={rowEl}>
  <div 
    class="cell symbol" 
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


<style>
  .row {
    border: 1px solid transparent;
  }
  .row:nth-child(even) {
    background-color: var(--bg-offset);
  }
  .row.active {
    border: 1px solid blue;
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
<script lang="ts">
  import ResultsRow from './ResultsRow.svelte';

  import { resultsStore, activeIndex, clipboardNotifs } from '../../stores';

  const isSymbolEl = (el: EventTarget) => el instanceof HTMLElement && el.classList.contains('symbol');
  function handleClick(e: MouseEvent) {
    if (!isSymbolEl(e.target)) return;

    const index = Number((e.target as HTMLElement).dataset.index);
    activeIndex.update(i => i === index ? -1 : index);
  }
  function handleRightClick(e: MouseEvent) {
    if (!isSymbolEl(e.target)) return;

    const index = Number((e.target as HTMLElement).dataset.index);
    const [codepoint] = $resultsStore[index];
    const char = String.fromCodePoint(codepoint);
    navigator.clipboard.writeText(char);

    $clipboardNotifs = [...$clipboardNotifs, Symbol()];
    e.preventDefault();
  }

  import { lastIntersect } from '../../actions/lastIntersect';
  let resultsNum = 50;
  $: shownResults = $resultsStore.slice(0, resultsNum);
  resultsStore.subscribe(() => {
    resultsNum = 50;
  });
</script>

<p>
  {$resultsStore.length} result{$resultsStore.length > 1 ? 's' : ''}
</p>

<div class="table"
  on:click={handleClick} 
  on:contextmenu={handleRightClick} 
  use:lastIntersect 
  on:intersect={() => resultsNum += 50}
>
  <table-row class="table-head">
    <table-cell>Character</table-cell>
    <table-cell>Codepoint</table-cell>
    <table-cell>Description</table-cell>
  </table-row>

  {#each shownResults as [codepoint, info], i}
    <ResultsRow index={i} {codepoint} {info} />
  {/each}
</div>

<style>
  .table {
    display: grid;
    text-align: left;
  }
  .table :global(table-row) {
    display: grid;
    grid-template-columns: 90px 90px 1fr;
    grid-gap: 10px;
  }  
  .table-head {
    font-weight: bold;
    font-size: .8em;
    color: #4B558C;
    padding: 10px 0;
  }
  p {
    text-align: left;
    margin: 0;
    opacity: .7;
    font-size: .8rem;
  }
</style>
<script lang="ts">
  import ResultsRow from './ResultsRow.svelte';

  import { resultsStore, activeIndex } from '../../stores';

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

    e.preventDefault();
  }
</script>

<table class="results">
  <thead>
    <tr>
      <th>Character</th>
      <th>Code point</th>
      <th>Description</th>
    </tr>
  </thead>

  <tbody on:click={handleClick} on:contextmenu={handleRightClick}>
    {#each $resultsStore as [codepoint, info], i}
      <ResultsRow index={i} {codepoint} {info} />
    {/each}
  </tbody>
</table>

<style>
  table {
    padding: 20px;

    border-spacing: 5px;

    width: 100%;
    margin: 0 auto;
    text-align: left;
  }
  tr {
    width: 100%;
  }
  th {
    font-weight: bold;
    font-size: .8em;
    color: #4B558C;
  }
</style>
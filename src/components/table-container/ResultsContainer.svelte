<script lang="ts">
  import ResultsRow from './ResultsRow.svelte';

  import { resultsStore, activeIndex, copiedCodepoint } from '$stores';

  const getInfoIcon = (el: EventTarget) => {
    if (!(el instanceof HTMLElement)) return null;
    for (const element of [el, el.parentElement]) {
      if (element instanceof HTMLImageElement && element.alt === 'info') return element;
      if (element?.classList.contains('info-icon'))return element;
    }
    return null;
  };

  function handleClick(e: MouseEvent) {
    const el = getInfoIcon(e.target as EventTarget);
    if (!el) return;

    const index = Number(el.dataset.index);
    activeIndex.update(i => i === index ? -1 : index);
  }

  let copyTextTimeoutId: ReturnType<typeof setTimeout>;
  function handleRightClick(e: MouseEvent) {
    const el = getInfoIcon(e.target as EventTarget);
    if (!el) return;

    const index = Number(el.dataset.index);
    const [codepoint] = $resultsStore[index];
    const char = String.fromCodePoint(codepoint);
    navigator.clipboard.writeText(char);

    clearTimeout(copyTextTimeoutId);
    $copiedCodepoint = codepoint;
    copyTextTimeoutId = setTimeout(() => {
      $copiedCodepoint = -1;
    }, 1000);

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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="table"
  on:click={handleClick} 
  on:contextmenu={handleRightClick} 
  use:lastIntersect 
  on:intersect={() => resultsNum += 50}
>
  <div class="table-head row">
    <div>Character</div>
    <div>Codepoint</div>
    <div>Description</div>
  </div>

  {#each shownResults as [codepoint, info], i}
    <ResultsRow index={i} {codepoint} {info} />
  {/each}
</div>

<style>
  .table {
    text-align: left;
  }
  .table :global(.row) {
    display: grid;
    grid-template-columns: 90px 90px 1fr 50px;
    grid-gap: 10px;
    padding: 10px
  }
  .table-head {
    font-weight: bold;
    font-size: .8em;
    color: var(--label-col);
    padding: 10px 0;
  }
  p {
    text-align: left;
    margin: 0;
    opacity: .7;
    font-size: .8rem;
  }
</style>
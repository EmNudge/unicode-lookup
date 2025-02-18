<script lang="ts">
  import ResultsRow from './ResultsRow.svelte';
  import { activeIndex, resultsStore } from '$stores';

  function handleFocus(e: FocusEvent) {
    const index = (e.target as Element).querySelector('img')?.dataset.index;
    if (!index) return;
    $activeIndex = Number(index);
  }
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' && $activeIndex < $resultsStore.length - 1) {
      $activeIndex++;
    } else if  (e.key === 'ArrowUp' && $activeIndex >= 0) {
      $activeIndex--;
    }
  }

  let resultsNum = 50;
  let shownResults = $derived($resultsStore.slice(0, resultsNum));
  resultsStore.subscribe(() => {
    resultsNum = 50;
  });

  function lastIntersect(node: HTMLElement, onIntersect: () => void) {
    const getNth = () => [...node.children].slice(-2)[0];

    let lastObservedEl = getNth();

    const intObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;

        intObserver.unobserve(entry.target);

        onIntersect();
      },
      {
        rootMargin: '0px',
        threshold: 0.8,
      },
    );
    intObserver.observe(lastObservedEl);

    const mutObserver = new MutationObserver((mutations) => {
      if (lastObservedEl) intObserver.unobserve(lastObservedEl);

      lastObservedEl = getNth();
      intObserver.observe(lastObservedEl);
    });

    mutObserver.observe(node, { childList: true });
  }

  let table: HTMLDivElement | undefined;
  $effect(() => {
    if (!table) return;

    lastIntersect(table, () => resultsNum += 50);
  });
</script>

<p>
  {$resultsStore.length} result{$resultsStore.length > 1 ? 's' : ''}
</p>

<div class="table"
  bind:this={table}
  role="table"
  onfocusin={handleFocus}
  onkeydown={handleKeydown}
>
  {#each shownResults as [codepoint, info], i}
    <ResultsRow index={i} {codepoint} {info} />
  {/each}
</div>

<style>
  .table {
    text-align: left;
  }
  p {
    text-align: left;
    margin: 0;
    opacity: .7;
    font-size: .8rem;
  }
</style>
<script lang="ts">
  import { loop } from '../utils/iterable'; 
  import ResultsRow from './ResultsRow.svelte';
  import { getNum } from '../utils/char';
  import { exactMatchStore, resultsStore, codepointTypeStore } from '../stores';

  
  $: newResults = $resultsStore.map(([num, name]) => {
    const numStr = getNum(num, $codepointTypeStore);
    return { num, name, numStr };
  })
</script>

<div class="results">
  {#each newResults as { num, name, numStr }}
    <div class="item">
      <span class="num">{numStr}</span>
      <span>{String.fromCodePoint(num)}</span>
      <span class="name">{name}</span>
    </div>
  {/each}
</div>

<style>
  .results {
    display: grid;
    grid-template-columns: repeat(auto-fit, 120px);
    grid-gap: 20px;

    max-width: 700px;
    margin: 0 auto;
    text-align: left;
  }
  
  .item {
    display: grid;
    grid-gap: 10px;
    width: 90px;
    padding: 10px;
    text-align: center;
    box-shadow: -2px 2px 11px #0003;
    font-size: .9em;
  }
  .num {
    text-align: right;
    opacity: .7;
    z-index: -1;
  }
  .name {
    font-size: .7em;
  }
</style>
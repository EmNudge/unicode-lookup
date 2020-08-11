<script lang="ts">
  import { loop } from '../utils/iterable'; 
  import ResultsRow from './ResultsRow.svelte';

  import { exactMatchStore, resultsStore } from '../stores'
</script>

<div class="results">
  <!-- headers -->
  <span class="header">Character</span>
  <span class="header">Code Point</span>
  <span class="header">Description</span>
  
  <!-- exact match, if found -->
  {#if $exactMatchStore}
    <ResultsRow 
      num={$exactMatchStore[0]} 
      name={$exactMatchStore[1]}
      special={true} 
    />
  {/if}

  <!-- content -->
  {#each $resultsStore as [num, name]}
    <ResultsRow {num} {name} />
  {/each}
</div>

<style>
  .results {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-gap: 5px 20px;

    width: max-content;
    margin: 0 auto;
    text-align: left;
  }
  .header {
    font-weight: bold;
  }
  span {
    padding: 2px 10px;
    align-self: baseline;
  }
</style>
<script lang="ts">
  import ResultsRow from './ResultsRow.svelte';

  import { resultsStore } from '../../stores';
</script>

<div class="results">
  <!-- headers -->
  <span class="header">Character</span>
  <span class="header">Code Point</span>
  <span class="header">Description</span>

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
    font-size: .8em;
    color: #4B558C;
  }
  span {
    padding: 2px 10px;
    align-self: baseline;
  }
</style>
<script lang="ts">
  import { resultsStore } from '../../stores';
  import GridItem from './GridItem.svelte'
</script>

<div class="results">
  {#each $resultsStore as [num, name]}
    <GridItem {name} {num} />
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
</style>
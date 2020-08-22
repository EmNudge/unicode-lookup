<script lang="ts">
  import { loop, map, pipe, filter, collect } from '../../utils/iterable'; 
  import ResultsRow from './ResultsRow.svelte';
  import { getPayload } from '../../utils/query';

  import { easySearchStore, resultsStore } from '../../stores';
  
  let exactMatch: any = null;
  $: exactMatch = ((text) => {
    const { type, value } = getPayload(text);
    const results = $resultsStore;
    if (type === "string") {
      const str = (value as string).toUpperCase();
      const res = pipe(
        filter(([,name]) => name === str),
        collect  
      )($resultsStore);

      return res[0];
    }
    
    if (type === "number") {
      const num = value as number;
      const res = pipe(
        filter(([n]) => n === num),
        collect  
      )($resultsStore);

      return res[0]
    }
  })($easySearchStore)
</script>

<div class="results">
  <!-- headers -->
  <span class="header">Character</span>
  <span class="header">Code Point</span>
  <span class="header">Description</span>
  
  <!-- exact match, if found -->
  {#if exactMatch}
    <ResultsRow 
      num={exactMatch[0]}
      name={exactMatch[1]}
      special={true} 
    />
  {/if}

  <!-- content -->
  {#each $resultsStore as [num, name]}
    {#if !exactMatch || num !== exactMatch[0]}
      <ResultsRow {num} {name} />
    {/if}
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
  }
  span {
    padding: 2px 10px;
    align-self: baseline;
  }
</style>
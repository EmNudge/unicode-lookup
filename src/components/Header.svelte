<script lang="ts">
  import { SearchMode, searchMode } from '../stores';

  import { fly } from 'svelte/transition';
  import FilterIcon from '../icons/filter.svelte';
  
  function toggleSearchMode() {
    const currentSearchMode = $searchMode;

    if (currentSearchMode === SearchMode.AdvancedSearch) {
      $searchMode = SearchMode.SimpleSearch;
    } else {
      $searchMode = SearchMode.AdvancedSearch;
    }
  }
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    margin: 20px auto;
    display: flex;
    align-items: center;
  }
  h1 {
		font-size: 1.7em;
  }

  button {
    cursor: pointer;
    z-index: 2;
    margin: 0;
    padding: 10px 20px;
  }
  .active {
    color: var(--hsl-bg);
    background: var(--hsl);
    transition: .25s;
  }
  button:focus {
    border: 1px solid var(--hsl);
  }
</style>

<header>
  <div class="text">
    <h1>Unicode Lookup</h1>
    {#if $searchMode === SearchMode.SimpleSearch}
      <h3 in:fly={{ x: -20 }}>Simple Search</h3>
    {:else}
      <h3 in:fly={{ x: -20 }}>Advanced Search</h3>
    {/if}
  </div>
  
  <button 
    class="styled" 
    class:active={$searchMode === SearchMode.AdvancedSearch} 
    on:click={toggleSearchMode}
  >
    <FilterIcon active={$searchMode === SearchMode.AdvancedSearch} />
  </button>
</header>
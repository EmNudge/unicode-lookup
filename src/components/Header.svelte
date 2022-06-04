<script lang="ts">
  import { SearchMode, searchMode } from '$stores';
  import themeStore from "svelte-themes"

  import { fly } from 'svelte/transition';
  import FilterIcon from '$icons/filter.svelte';
  import SunIcon from '$icons/sun.svelte';
  
  function toggleSearchMode() {
    const currentSearchMode = $searchMode;

    if (currentSearchMode === SearchMode.AdvancedSearch) {
      $searchMode = SearchMode.SimpleSearch;
    } else {
      $searchMode = SearchMode.AdvancedSearch;
    }
  }

  function toggleTheme() {
	  $themeStore.theme = $themeStore.theme === 'dark' ? 'light' : 'dark'
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

  .buttons {
    display: flex;
  }
  button {
    cursor: pointer;
    margin: 0;
  }
  button.styled {
    z-index: 2;
    padding: 10px 20px;
  }
  .active {
    color: var(--hsl-bg);
    background: var(--hsl);
    transition: .25s;
  }
  button.styled:focus {
    border: 1px solid var(--hsl);
  }
  button.theme {
    background: none;
    border: none;
    padding: 0 10px;
    opacity: .6;
  }
  button.theme:active {
    transform: scale(.9);
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
  
  <div class="buttons">
    <button class="theme" on:click={toggleTheme}>
      <SunIcon />
    </button>
    <button 
      class="styled" 
      class:active={$searchMode === SearchMode.AdvancedSearch} 
      on:click={toggleSearchMode}
    >
      <FilterIcon active={$searchMode === SearchMode.AdvancedSearch} />
    </button>
  </div>
</header>

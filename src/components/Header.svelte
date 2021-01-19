<script lang="ts">
  import { SearchMode } from '../stores';
  export let searchMode: SearchMode;

  import { fly } from 'svelte/transition';
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
</style>

<header>
  <div class="text">
    <h1>Unicode Lookup</h1>
    {#if searchMode === SearchMode.SimpleSearch}
      <h3 in:fly={{ x: -20 }}>Simple Search</h3>
    {:else}
      <h3 in:fly={{ x: -20 }}>Advanced Search</h3>
    {/if}
  </div>
</header>
<script lang="ts">
  import { modalOpenStore } from "../stores";
  import SettingsIcon from '../icons/settings.svelte'
  import Settings from './Settings.svelte';

  import { SearchMode } from '../stores';
  export let searchMode: SearchMode;

  import { fly } from 'svelte/transition';
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    max-width: 400px;
    margin: 20px auto;
    display: flex;
    align-items: center;
  }
  h1 {
		font-size: 1.7em;
  }
</style>


{#if $modalOpenStore}
	<Settings />
{/if}

<header>
  <div class="text">
    <h1>Unicode Lookup</h1>
    {#if searchMode === SearchMode.SimpleSearch}
      <h3 in:fly={{ x: -20 }}>Simple Search</h3>
    {:else}
      <h3 in:fly={{ x: -20 }}>Advanced Search</h3>
    {/if}
  </div>

  <SettingsIcon on:click={() => $modalOpenStore = !$modalOpenStore} active={$modalOpenStore} />
</header>
<script>
  import { modalOpenStore } from "../stores";
  import SettingsIcon from '../icons/settings.svelte'
  import Settings from './Settings.svelte';
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
  <h1>Unicode Lookup</h1>
  
  <SettingsIcon on:click={() => $modalOpenStore = !$modalOpenStore} active={$modalOpenStore} />
</header>
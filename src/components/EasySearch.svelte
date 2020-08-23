<script lang="ts">  
	import { onMount } from 'svelte';
  import { onStoreTrue } from '../utils/store';
  import { workerIsReadyStore, easySearchStore } from '../stores';
  
  export let search: (text: string) => void;
  
  let error = '';

  async function searchFromUrl() {
    const { origin, href } = new URL(String(window.location)); 
    const path = href.slice(origin.length + 1);
  
    $easySearchStore = decodeURI(path);
    if (!$easySearchStore.length) return;
    console.log('hello from url search')
  
    // we custom encode regex due to the '/' messing with relative URLs
    const regMatch = $easySearchStore.match(/REGEX-(.+?)-(.+)/);
    if (regMatch) {
      const { 1: flags, 2: source } = regMatch;
      $easySearchStore = `/${source}/${flags}`;
    }
  
    await onStoreTrue(workerIsReadyStore);
    search($easySearchStore);
  }

  onMount(() => {
    // if we already have some data stored, ignore the URL
    if ($easySearchStore.length) return;
    console.log('hello from onMount')
    searchFromUrl();
	});

  function hasRegexError(text: string) {
    // if not regex, no errors
    const regexRes = text.match(/\/(.+?)\/([a-z]+)?/);
    if (!regexRes) return false;

    const { 1: regStr, 2: _flags } = regexRes;

    try {
      const _regex = new RegExp(regStr, "u");
      return false;
    } catch(e) {
      return true;
    }
  }
  
  async function trySearch() {
    const text = $easySearchStore;
    
    if (hasRegexError(text)) {
      error = 'Regex Error. Please verify search text.';
      return;
    }
    error = '';

    search(text);
	}
</script>

<style>
  input {
    width: 90%;
    margin: 0 auto;
  }
</style>

<form on:submit|preventDefault={trySearch}>
  <input type="text" bind:value={$easySearchStore} on:input={trySearch}>
  <!-- <button type="submit">Submit</button> -->
  {#if error}
    <br>
    <span style="color: red">{error}</span>
  {/if}
</form>
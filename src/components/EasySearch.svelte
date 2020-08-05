<script lang="ts">  
	import { onMount } from 'svelte';
  import { onStoreTrue } from '../utils/store';
  import { workerIsReadyStore } from '../stores';
  
  export let search: (text: string) => void;
  
  let text = '';
  let error = '';

  onMount(async () => {
		const { origin, href } = new URL(String(window.location)); 
    const path = href.slice(origin.length + 1);

		text = decodeURI(path);
		if (!text.length) return;

		// we custom encode regex due to the '/' messing with relative URLs
		if (/REGEX-(.+?)-(.+)/.test(text)) {
      const { 1: flags, 2: source } = text.match(/REGEX-(.+?)-(.+)/);
			text = `/${source}/${flags}`;
		}

    await onStoreTrue(workerIsReadyStore);
    search(text);
	});

  function hasRegexError() {
    // if not regex, no errors
    const regexRes = text.match(/\/(.+?)\/([a-z]+)?/);
    if (!regexRes) return false;

    const { 1: regStr, 2: flags } = regexRes;

    try {
      const _regex = new RegExp(regStr, flags);
      return false;
    } catch(e) {
      return true;
    }
  }
  
  async function trySearch() {
    if (hasRegexError()) {
      error = 'Regex Error. Please verify search text.';
      return;
    }
    error = '';

    search(text);
	}
</script>

<form on:submit|preventDefault={trySearch}>
  <input type="text" bind:value={text}>
  <button type="submit">Submit</button>
  {#if error}
    <br>
    <span style="color: red">{error}</span>
  {/if}
</form>
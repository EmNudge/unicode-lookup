<script lang="ts">
  import { query } from '../utils/worker';
  
  export let search: (text: string) => void;
  
  let text = '';
  let error = '';

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
  <br>
  {#if error}
  <span style="color: red">{error}</span>
  {/if}
  <br>
</form>
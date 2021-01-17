<script lang="ts">  
  import { easySearchStore } from '../stores';
  import { debounce } from '../utils/debounce';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const search = debounce(() => dispatch('search'), 100);
  
  let error = '';

  function hasRegexError(text: string) {
    // if not regex, no errors
    const regexRes = text.match(/\/(.+?)\/([a-z]+)?/);
    if (!regexRes) return false;

    const { 1: regStr, 2: flags } = regexRes;

    try {
      new RegExp(regStr, flags);
      return false;
    } catch(e) {
      return true;
    }
  }
  
  async function trySearch() {
    if (hasRegexError($easySearchStore)) {
      error = 'Regex Error. Please verify search text.';
      return;
    }
    error = '';

    search();
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
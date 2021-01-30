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
  
  let inputEl: HTMLInputElement;
  function handleKeyDown(e: KeyboardEvent) {
    const inputIsFocused = document.activeElement === inputEl;
    if (inputIsFocused) return;

    // for control codes or keys with large names, exit early
    if (e.key.length > 1 || /\p{C}/.test(e.key)) return;

    // for modifier keys (other than shift), exit early
    if (e.ctrlKey || e.altKey) return;
    
    inputEl.focus();
  }
</script>

<style>
  input {
    width: 90%;
    margin: 0 auto;
  }
</style>

<svelte:window on:keydown={handleKeyDown} />

<form on:submit|preventDefault={trySearch}>
  <input 
    type="text"
    placeholder="Search..."
    class="styled" 
    bind:value={$easySearchStore} 
    on:input={trySearch}
    bind:this={inputEl} />
  
  {#if error}
    <br>
    <span style="color: red">{error}</span>
  {/if}
</form>
<script lang="ts">  
  import { easySearchStore } from '$stores';
  import { debounce } from '$utils/debounce';
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
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key === ' ') {
      e.preventDefault();
      return;
    }
    
    inputEl.focus();
  }
</script>

<style>
  input {
    width: 90%;
    margin: 0 auto;
    border: 1px solid transparent;
    box-shadow: -3px 4px 2px #0000000f;
  }
  :global(:root[data-theme=dark]) input {
    background-color: #151515;
    color: white;
    border: 1px solid #6b6b6b;
    box-shadow: 1px 1px 1px 2px #0000006e;
  }
  input::-webkit-input-placeholder {
    opacity: .5;
  }
  input:focus {
    outline: 1px solid #a5b5ff;
    box-shadow: -3px 4px 2px #894aff0f;
  }
</style>

<svelte:window on:keydown={handleKeyDown} />

<form on:submit|preventDefault={trySearch}>
  <input 
    type="text"
    placeholder="Search..."
    bind:value={$easySearchStore} 
    on:input={trySearch}
    bind:this={inputEl} />
  
  {#if error}
    <br>
    <span style="color: red">{error}</span>
  {/if}
</form>
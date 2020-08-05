<script lang="ts">  
  export let search: (text: string) => void;
  import { Categories } from '../utils/regexBuilder';

  let error = '';

  // this throws away all indexes and just gets an array of categories
  const categories = Object.keys(Categories).filter(key => isNaN(Number(key)));

  let excludeOrInclude = "include";
  let currCategory: Categories;

  type Pattern = { exclude: boolean, category: Categories }
  let patterns: Pattern[] = [];

  function getRegex() {
    const str = patterns.map(({ exclude, category }) => {
      const symbol = !exclude ? '=' : '!';
      return `(?${symbol}\\p{${category}})`;
    }).join('');

    return `/${str}/u`;
  }

  async function trySearch() {
    if (!patterns.length) {
      error = 'cannot create search with no categories';
      return;
    }
    error = '';

    search(getRegex());
  }
  
  function addCat() {
    const pattern: Pattern = {
      exclude: excludeOrInclude === "exclude",
      category: currCategory,
    }
    
    const repeatedCategory = patterns.find(p => p.category === pattern.category);
  
    if (repeatedCategory) {
      const status = repeatedCategory.exclude ? 'excluded' : 'included';
      error = `Category is already ${status}. Delete it or change category.`;
      return;
    }
    error = '';

    patterns = [...patterns, pattern];
  }
</script>

<style>
  .categories {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
    text-align: left;
  }

  .add-category {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 20px;
  }
</style>

<h3>Category Regex Builder</h3>
<form on:submit|preventDefault={trySearch}>
  <div class="categories">
    {#each patterns as { exclude, category }}
      <span>{exclude ? 'exclude' : 'include'}</span>
      <span>{category}</span>
    {/each}
  </div>

  <br>

  <div class="add-category">
    <select bind:value={excludeOrInclude}>
      <option>include</option>
      <option>exclude</option>
    </select>
    
    <select bind:value={currCategory}>
      {#each categories as category}
        <option>{category}</option>
      {/each}
    </select>

    <button on:click={addCat} type="button">Add</button>
  </div>

  <button type="submit">Submit</button>
  
  {#if error}
    <br>
    <span style="color: red">{error}</span>
  {/if}
</form>
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

  const remove = (index: number) => () => {
    patterns = [...patterns.slice(0, index), ...patterns.slice(index + 1)];
  }
</script>

<style>
  .categories {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-gap: 10px;
    text-align: left;
  }

  .add-category {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-gap: 10px;
  }
</style>

<h3>Category Regex Builder</h3>
<form on:submit|preventDefault={trySearch}>
  <div class="categories">
    {#each patterns as { exclude, category }, i}
      <button on:click={remove(i)} type="button">Remove</button>
      <span>{exclude ? 'exclude' : 'include'}</span>
      <span>{category}</span>
    {/each}
  </div>

  <br>

  <div class="add-category">
    <button on:click={addCat} type="button">Add</button>

    <select bind:value={excludeOrInclude}>
      <option>include</option>
      <option>exclude</option>
    </select>
    
    <select bind:value={currCategory}>
      {#each categories as category}
        <option>{category}</option>
      {/each}
    </select>
  </div>

  <button type="submit">Submit</button>
  
  {#if error}
    <br>
    <span style="color: red">{error}</span>
  {/if}
</form>
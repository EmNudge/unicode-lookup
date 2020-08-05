<script lang="ts">  
  import { Categories } from '../utils/regexBuilder';
  import { categorySearchStore } from '../stores';
  
  export let search: (text: string) => void;

  let error = '';

  // this throws away all indexes and just gets an array of categories
  const categories = Object.keys(Categories).filter(key => isNaN(Number(key)));

  let excludeOrInclude = "include";
  let currCategory: Categories;

  $: patterns = $categorySearchStore;

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
    const pattern = {
      exclude: excludeOrInclude === "exclude",
      category: currCategory,
    };
    
    const repeatedCategory = patterns.find(p => p.category === pattern.category);
  
    if (repeatedCategory) {
      const status = repeatedCategory.exclude ? 'excluded' : 'included';
      error = `Category is already ${status}. Delete it or change category.`;
      return;
    }
    error = '';

    $categorySearchStore = [...patterns, pattern];
  }

  const remove = (index: number) => () => {
    $categorySearchStore = [...patterns.slice(0, index), ...patterns.slice(index + 1)];
  }
</script>

<style>
  h3 {
    font-weight: 100;
    text-align: left;
    margin: 0;
  }
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
    {#each $categorySearchStore as { exclude, category }, i}
      <button on:click={remove(i)} type="button">X</button>
      <span>{exclude ? 'exclude' : 'include'}</span>
      <span>{category}</span>
    {/each}
  </div>

  <br>

  <div class="add-category">
    <button on:click={addCat} type="button">+</button>

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
<script>
  import Modal from './Modal.svelte';
  import { codepointTypeStore, resultsNumStore, CasingType, nameCasingStore } from '../stores';
  
  function arrayFrom(thing) {
    const arr = [];
    let i = 0;
    while(true) {
      if (!(i in thing)) break;
      arr.push(thing[i]);

      i++
    }

    return arr;
  }
</script>

<style>
  .items {
    display: grid;
    grid-gap: 8px;
  }
  .input {
    display: grid;
    grid-gap: 5px;
  }
</style>

<Modal title="Settings">
  <div class="items">
    <div class="input">
      <label>Codepoint Format</label>
      <select bind:value={$codepointTypeStore}>
        <option value="hex">Hexidecimal</option>
        <option value="oct">Octal</option>
        <option value="dec">Decimal</option>
      </select>
    </div>

    <div class="input">
      <label>Title Casing</label>
      <select bind:value={$nameCasingStore}>
        {#each arrayFrom(CasingType) as type}
          <option value={CasingType[type]}>{type}</option>
        {/each}
      </select>
    </div>

    <div class="input">
      <label>Results Amount</label>
      <input type="number" bind:value={$resultsNumStore} />
    </div>
  </div>
</Modal>
<script>
  import Modal from './Modal.svelte';
  import { codepointTypeStore, resultsTypeStore, resultsNumStore } from '../stores';
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
      <label>Results Container</label>
      <select bind:value={$resultsTypeStore}>
        <option value={0}>Table</option>
        <option value={1}>Grid</option>
      </select>
    </div>

    <div class="input">
      <label>Results Amount</label>
      <input type="number" bind:value={$resultsNumStore} />
    </div>
  </div>
</Modal>
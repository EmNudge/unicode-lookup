<script>
  import Modal from './Modal.svelte';
  import { codepointTypeStore } from '../stores';
</script>

<style>
  h1 {
    margin-top: 0;
    min-width: 400px;
    text-align: center;
  }
</style>

<Modal>
  <h1>Settings</h1>

  <label>Codepoint Format</label>
  <br>
  <select bind:value={$codepointTypeStore}>
    <option value="hex">Hexidecimal</option>
    <option value="oct">Octal</option>
    <option value="dec">Decimal</option>
  </select>
</Modal>
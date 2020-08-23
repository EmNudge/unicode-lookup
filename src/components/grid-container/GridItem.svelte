<script lang="ts">
  import { codepointTypeStore } from '../../stores';
  import { getNum } from '../../utils/char';

  export let num: number;
  export let name: string;

  $: numStr = getNum(num, $codepointTypeStore);

  async function copyChar() {
    const char = String.fromCodePoint(num);
    navigator.clipboard.writeText(char);
  }
</script>

<style>
  div {
    display: grid;
    grid-gap: 10px;
    width: 90px;
    padding: 10px;
    text-align: center;
    box-shadow: -2px 2px 6px #0003;
    font-size: .9em;
    border-radius: 4px;
    background: #fff7;
  }
  .num {
    text-align: right;
    opacity: .7;
    z-index: -1;
  }
  .name {
    font-size: .7em;
  }
  .char-container {
    display: flex;
    justify-content: center;
  }
  button.char {
    font-size: 1.5em;
    min-width: 20px;
    text-align: center;
    background: none;
    border: none;
    padding: 0;
    margin: 0;

    transition: .15s;
    cursor: pointer;
    user-select: none;
  }
  button.char:active {
    transform: scale(.8);
    background: #ccc;
  }
</style>

<div class="item">
  <span class="num">{numStr}</span>
  <span class="char-container">
    <button class="char" on:click={copyChar}>{String.fromCodePoint(num)}</button>
  </span>
  <span class="name">{name}</span>
</div>
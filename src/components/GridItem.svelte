<script lang="ts">
  import { codepointTypeStore } from '../stores';
  import { getNum } from '../utils/char';

  export let num: number;
  export let name: string;

  $: numStr = getNum(num, $codepointTypeStore);
</script>

<style>
  div {
    display: grid;
    grid-gap: 10px;
    width: 90px;
    padding: 10px;
    text-align: center;
    box-shadow: -2px 2px 11px #0003;
    font-size: .9em;
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
  .char {
    font-size: 1.5em;
    background: #f1f1f1;
    min-width: 20px;
    text-align: center;

    transition: .15s;
    cursor: pointer;
    user-select: none;
  }
  .char:active {
    transform: scale(.8);
    background: #ccc;
  }
</style>

<div class="item">
  <span class="num">{numStr}</span>
  <span class="char-container">
    <span class="char">{String.fromCodePoint(num)}</span>
  </span>
  <span class="name">{name}</span>
</div>
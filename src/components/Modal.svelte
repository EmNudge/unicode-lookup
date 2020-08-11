<script>
  import { modalOpenStore } from "../stores";

  let innerEl;
  function maybeClose(e) {
    if (e.target === innerEl || innerEl.contains(e.target)) return;
    $modalOpenStore = false;
  }
</script>

<style>
  div.outer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: grid;
    justify-content: center;
    align-content: center;

    background: #3336;
  }

  div.inner {
    padding: 25px;
    border-radius: 3px;
    background: #333;
    color: white;
  }
</style>

<div class="outer" on:click={maybeClose}>
  <div class="inner" bind:this={innerEl}>
    <slot />
  </div>
</div>
<script>
  import { popoverStore } from '../stores';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let offset = { x: 0, y: 0 };
  $: x = $popoverStore.x + offset.x;
  $: y = $popoverStore.y + offset.y;
  let el;
  onMount(() => {
    const { width, height } = el.getBoundingClientRect();
    offset = { x: 20, y: parseInt(height) / -2 };
  });
  
</script>

<div 
  bind:this={el}
  transition:fade={{ duration: 250 }} 
  style="left: {x}px; top: {y}px"
>
  {$popoverStore.content}
</div>

<style>
  div {
    position: absolute;
    top: 0; left: 0;

    user-select: none;
    padding: 5px;
    box-shadow: 1px 1px 5px 0px #0004;
    border-radius: 2px;
    background: white;
  }
</style>
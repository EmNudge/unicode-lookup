<script>
  import { fly, crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { clipboardNotifs } from '../stores';

  $: notifs = [...$clipboardNotifs].reverse();
  const [send, receive] = crossfade({
    fallback: fly,
  });
</script>

<section>
  {#each notifs as notif (notif)}
    <div
      class="styled" 
      in:receive={{key: notif}}
      out:send={{key: notif}}
      animate:flip={{duration: 200}}
    >copied</div>
  {/each}
</section>

<style>
  section, div {
    padding: 10px 20px;
  }

  section {
    position: fixed;
    top: 0;
    left: 0;
   
    display: grid;
    grid-gap: 5px;
  }
</style>

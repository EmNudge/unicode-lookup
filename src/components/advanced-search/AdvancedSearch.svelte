<script lang="ts">
	import BoxSet from './BoxSet.svelte';
	import Button from './Button.svelte';
	import { boxSetsStore, getNewBoxSet } from '../../stores';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
	
	const onClose = (index: number) => () => {
		$boxSetsStore = [
			...$boxSetsStore.slice(0, index),
			...$boxSetsStore.slice(index + 1),
		];
	}
</script>

{#each $boxSetsStore as { type, boxes }, i}
	<BoxSet bind:type bind:boxes on:close={onClose(i)} />
{/each}

<div>
	<Button on:click={() => $boxSetsStore = [...$boxSetsStore, getNewBoxSet()]}>
		Add Rule
	</Button>	
</div>

<button 
	style="width: 100%; margin: 20px 0px;"
	on:click={() => dispatch('search')}	
>Search</button>
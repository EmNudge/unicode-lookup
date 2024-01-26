<script lang="ts">
	import BoxSet from './BoxSet.svelte';
	import Button from './Button.svelte';
	import { boxSetsStore, getNewBoxSet } from '$stores';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	const onClose = (index: number) => () => {
		$boxSetsStore = [...$boxSetsStore.slice(0, index), ...$boxSetsStore.slice(index + 1)];
	};

	onMount(() => {
		// If the user has previously deleted all boxSets, restore the default upon mounting again.
		if ($boxSetsStore.length === 0) {
			$boxSetsStore = [getNewBoxSet()];
		}
	});
</script>

<form on:submit|preventDefault>
	{#each $boxSetsStore as { type, boxes }, i}
		<BoxSet bind:type bind:boxes on:close={onClose(i)} />
	{/each}
</form>

<div class="buttons">
	<Button on:click={() => ($boxSetsStore = [...$boxSetsStore, getNewBoxSet()])}>Add Rule</Button>
	<Button on:click={() => dispatch('search')} hue={200}>Search</Button>
</div>

<style>
	.buttons {
		display: flex;
		justify-content: flex-end;
	}
	.buttons :global(*) {
		margin: 5px;
	}
</style>

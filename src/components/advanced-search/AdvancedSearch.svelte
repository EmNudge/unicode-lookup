<script lang="ts">
	import BoxSet from './BoxSet.svelte';
	import Button from './Button.svelte';
	import { boxesStore, getNewBox } from '$stores';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	const onClose = (index: number) => () => {
		$boxesStore = [...$boxesStore.slice(0, index), ...$boxesStore.slice(index + 1)];
	};

	onMount(() => {
		// If the user has previously deleted all boxSets, restore the default upon mounting again.
		if ($boxesStore.length === 0) {
			$boxesStore = [getNewBox()];
		}
	});
</script>

<form on:submit|preventDefault>
	{#each $boxesStore as box, i}
		<BoxSet bind:box on:close={onClose(i)} />
	{/each}
</form>

<div class="buttons">
	<Button on:click={() => ($boxesStore = [...$boxesStore, getNewBox()])}>Add Rule</Button>
	{#if false} <!-- TODO: Add setting for toggle -->
		<Button on:click={() => dispatch('search')} hue={200}>Search</Button>
	{/if}
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

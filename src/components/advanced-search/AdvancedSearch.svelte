<script lang="ts">
	import BoxSet from './BoxSet.svelte';
	import Button from './Button.svelte';
	import { boxSetsStore, getNewBoxSet } from '$stores';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	const onClose = (index: number) => () => {
		$boxSetsStore = [...$boxSetsStore.slice(0, index), ...$boxSetsStore.slice(index + 1)];
	};

	// instead of bubbling up an event, we're going to create a central event listener.
	// this will capture all child events
	function handlePossibleFormSubmit(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;

		const el = e.target as HTMLElement;
		if (el.tagName !== 'INPUT') return;

		// it is possible for this to ACTUALLY trigger a submit event and we need to cancel that.
		e.preventDefault();
		dispatch('search');
	}

	onMount(() => {
		// If the user has previously deleted all boxSets, restore the default upon mounting again.
		if ($boxSetsStore.length === 0) {
			$boxSetsStore = [getNewBoxSet()];
		}
	});
</script>

<form on:keydown={handlePossibleFormSubmit} on:submit|preventDefault>
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

<script lang="ts">
	import { Button } from '$lib/components';
	import BoxContent from './BoxContent.svelte';

	import type { Box } from '$stores';
	export let box: Box;

	$: dropdownColor = box.matchType === 'Require' ? 111 : 0;
	const flipType = () => {
		box.matchType = box.matchType === 'Require' ? 'Exclude' : 'Require';
	};

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const closeBox = () => {
		dispatch('close');
	};
</script>

<div class="box">
	<div class="dropdown-container">
		<Button onclick={flipType} hue={dropdownColor}>
			{box.matchType}
		</Button>
	</div>

	<BoxContent
		on:close={closeBox}
		bind:name={box.name}
		bind:data={box.data}
		hue={dropdownColor}
	/>
</div>

<style>
	.box {
		display: grid;
		padding: 20px 0;
		margin-bottom: 20px;
	}
	.dropdown-container {
		display: flex;
		justify-content: center;

		margin: -25px;
		z-index: 2;
	}
</style>

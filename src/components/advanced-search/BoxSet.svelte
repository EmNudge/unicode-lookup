<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import Button from './Button.svelte';
	import BoxContent from './BoxContent.svelte';

	import { getNewBox, BoxSetType } from '../../stores';
	import type { Box } from '../../stores';
	export let type: BoxSetType;
	export let boxes: Box[];

	$: dropdownColor = type === BoxSetType.Require ? 111 : 0;
	
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const closeBox = (index: number) => () => {
		if (boxes.length === 1) {
			dispatch('close');
			return;
		}

		boxes = [
			...boxes.slice(0, index), 
			...boxes.slice(index+1)
		];
	}
</script>

<style>
	.box {		 
		display: grid;
		padding: 20px 0;
		margin-bottom: 20px;
	}
	.dropdown-container, .or-container {
		display: flex;
		justify-content: center;
		
		margin: -25px;
		z-index: 2;
	}
</style>

<div class="box">
	<div class="dropdown-container">
		<Dropdown 
			options={['Require', 'Exclude']} 
			hue={dropdownColor}
			bind:value={type}
			disabled={boxes.length > 1} />
	</div>

	{#each boxes as { name, data }, i}
		<BoxContent 
			on:close={closeBox(i)}
			bind:name bind:data />
			
		{#if boxes.length !== 1 && i < boxes.length}
			<div class="or-container">
				<Button hue={210} disabled={true}>OR</Button>
			</div>
		{/if}
	{/each}
	
	{#if type === BoxSetType.Require}
		<div class="or-container">
			<Button 
				hue={210} 
				on:click={() => boxes = [...boxes, getNewBox()]}
			>OR</Button>
		</div>
	{/if}
</div>
<script lang="ts">
	import CloseButton from '../../icons/close.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	import Dropdown from './Dropdown.svelte';
	
	export let name: string;
	export let data: any;
	export let hue = 200;

	import { boxTypeMap } from './box-types';
	
	$: componentNames = [...boxTypeMap.keys()];
	$: component = boxTypeMap.get(name);
</script>

<style>
	.content {
		padding: 40px;
		display: grid;
		justify-content: center;
		margin-top: -1px;
		position: relative;
	}
	button {
		position: absolute;
		top: 5px;
		right: 10px;
		background: none;
		border: none;
		font-size: 2em;
		padding: 3px;
		line-height: .8em;
		margin: 0;
		z-index: 2;
		cursor: pointer;
	}
	hr {
		margin: 10px -40px;
    opacity: .4;
	}
</style>

<div class="content styled" style="--hue: {hue}">
	<button on:click={() => dispatch('close')}>
		<CloseButton />
	</button>
	
	<Dropdown 
		options={componentNames} 
		bind:value={name} 
		hue={35} />
	
	<hr>

	<svelte:component this={component} bind:data={data} />
</div>
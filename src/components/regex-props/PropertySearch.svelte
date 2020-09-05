<script lang="ts">
	import { Types, props } from '../../utils/regexBuilder.js';
  import PropertyButton from './PropertyButton.svelte';
	
	export let search = (text: string): void => {};

  let properties = new Map<string, any>();

  $: regex = [...properties].map(([p, { value, type }]) => {
		const symbol = type === Types.EXCLUDED ? '!' : '=';
		if (value) return `(?${symbol}\\p{${p}=${value}})`;
		return `(?${symbol}\\p{${p}})`;
	}).join('');
	
	$: search(`/${regex}/u`);
	
	function clearProps() {
		properties.clear();
		properties = properties;
	}

	let searchTerm: string = '';
	$: filteredProps = props.filter(p => {
		const txt = p.toUpperCase();
		const term = searchTerm.toUpperCase();
		return txt.includes(term);
	})
</script>

<style>
	div.container {
		display: grid;
		grid-gap: 10px;
		padding: 15px;
    padding-top: 0;

		--grn: hsl(125, 70%, 80%);
		--red: hsl(0, 70%, 80%);
		--gry: hsl(0, 0%, 95%);

		height: 200px;
		overflow-y: scroll;
	}
</style>

<button class="underline-btn" on:click={clearProps}>clear selection</button>

<input type="text" bind:value={searchTerm} />

<div class="container">
	{#if "SCRIPT".includes(searchTerm.toUpperCase())}
		<PropertyButton 
			bind:properties
			name="Script" />
	{/if}
	{#each filteredProps as value}
		<PropertyButton 
			bind:properties
			name={value} />
	{/each}
</div>

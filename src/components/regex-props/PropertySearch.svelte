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
</script>

<style>
	div.container {
		display: grid;
		grid-gap: 10px;
		padding: 15px;

		--grn: hsl(125, 70%, 80%);
		--red: hsl(0, 70%, 80%);
		--gry: hsl(0, 0%, 95%);

		height: 200px;
		overflow-y: scroll;
	}
</style>

<div class="container">
	<PropertyButton 
			bind:properties
			name="Script" />
	{#each props as value}
		<PropertyButton 
			bind:properties
			name={value} />
	{/each}
</div>

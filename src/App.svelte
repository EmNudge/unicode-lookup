<script>
	import { resultsStore, exactMatchStore, workerStore, workerIsReadyStore } from './stores';
	import ResultsContainer from './components/ResultsContainer.svelte';
	import { onMount } from 'svelte';
	import { onStoreTrue } from './utils/store'
	import { query } from './utils/worker'

	let text = '';

	onMount(async () => {
		const url = new URL(window.location);
		const path = url.pathname.slice(1);
		text = decodeURI(path);
		if (!text.length) return;
		await onStoreTrue(workerIsReadyStore)
		await query(text);
	})

	let hasSearched = false;
</script>

<main>
	<h1>Unicode Lookup</h1>
	<p>A static unicode lookup web app using web workers.</p>
	<br>

	<form on:submit|preventDefault={() => query(text)}>
		<input type="text" bind:value={text}>
		<button type="submit">Submit</button>
		<br>
		<br>
	</form>

	{#if $resultsStore.length || $exactMatchStore}
		<ResultsContainer />
	{:else}
		<br>
		{#if hasSearched}
			<div>No results fit that query :/</div>
		{:else}
			<div>Type and search :)</div>
		{/if}
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #004eff;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
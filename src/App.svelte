<script>
	import { 
		resultsStore, exactMatchStore, workerIsReadyStore,
	} from './stores';
	import ResultsContainer from './components/ResultsContainer.svelte';
	import { onMount } from 'svelte';
	import { onStoreTrue } from './utils/store'
	import { query } from './utils/worker'

	let text = '';
	let isLoading = false;
	let hasSearched = false;

	function getRegURI(re) {
		const { source, flags } = re;
		return `REGEX-${flags}-${source}`;
	}
	async function search() {
		hasSearched = true;
		const { request } = await query(text);
		let val = request.payload.value;
		if (val instanceof RegExp) val = getRegURI(val);
		history.pushState(null, '', encodeURI(val));
	}

	onMount(async () => {
		const url = new URL(window.location);
		const path = url.pathname.slice(1);

		text = decodeURI(path);
		if (!text.length) return;

		// we custom encode regex due to the '/' messing with relative URLs
		if (/REGEX-(.+?)-(.+)/.test(text)) {
			const { 1: flags, 2: source } = text.match(/REGEX-(.+?)-(.+)/);
			text = `/${source}/${flags}`;
		}

		isLoading = true;
		await onStoreTrue(workerIsReadyStore);
		await search();
		isLoading = false;
	});
</script>

<main>
	<h1>Unicode Lookup</h1>
	<p>A static unicode lookup web app using web workers.</p>
	<br>

	<form on:submit|preventDefault={search}>
		<input type="text" bind:value={text}>
		<button type="submit">Submit</button>
		<br>
		<br>
	</form>

	{#if isLoading}
		<div>Loading...</div>
	{:else if $resultsStore.length || $exactMatchStore}
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
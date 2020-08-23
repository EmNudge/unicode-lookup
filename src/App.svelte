<script lang="ts">
	import { resultsStore, exactMatchStore, modalOpenStore, resultsTypeStore } from './stores';
	import ResultsContainer from './components/table-container/ResultsContainer.svelte';
	import ResultsGrid from './components/grid-container/ResultsGrid.svelte';
	import { autoQuery } from './utils/query'
	import EasySearch from './components/EasySearch.svelte';
	import PropertySearch from './components/regex-props/PropertySearch.svelte';
	import Header from './components/Header.svelte';

	let searchMode = 1;
	let isLoading: boolean = false;
	let hasSearched: boolean = false;

	function getRegURI(re: RegExp) {
		const { source, flags } = re;
		return `REGEX-${flags}-${source}`;
	}

	async function search(text: string) {
		hasSearched = true;
		autoQuery(text);

		// if (val instanceof RegExp) val = getRegURI(val);
		// history.pushState(null, '', encodeURI(val));
	}
</script>

<Header />

<main>
	<div class="searchbox">
		{#if searchMode === 1}
			<EasySearch {search} />
			<p class="hint" on:click={() => searchMode = 2}>category search</p>
		{:else}
			<PropertySearch {search} />
			<p class="hint" on:click={() => searchMode = 1}>simple search</p>
		{/if}
	</div>

	{#if isLoading}
		<div>Loading...</div>
	{:else if $resultsStore.length || $exactMatchStore}
		{#if $resultsTypeStore === 0}
			<ResultsContainer />
		{:else}
			<ResultsGrid />
		{/if}
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
		margin: 0 auto;
	}

	p.hint {
		text-decoration: underline;
		cursor: pointer;
	}

	.searchbox {
		max-width: 400px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
<script lang="ts">
	import { resultsStore, currentQueryStore, easySearchStore, boxSetsStore } from './stores';
	import ResultsContainer from './components/table-container/ResultsContainer.svelte';
	import { getBoxSetsFromText } from './utils/query'
	import EasySearch from './components/EasySearch.svelte';
	import Header from './components/Header.svelte';
	import GithubIcon from './icons/github.svelte';
	import AdvancedSearch from './components/advanced-search/AdvancedSearch.svelte';

	import type { BoxSet } from './stores';
	let queryArr: BoxSet[] = null;
	$: {
		currentQueryStore.set(queryArr);
	}

	const easySearch = () =>
		queryArr = getBoxSetsFromText($easySearchStore);
	const advancedSearch = () => 
		queryArr = $boxSetsStore;

	import { searchMode, SearchMode } from './stores'
</script>

<Header searchMode={$searchMode} />
<GithubIcon href="https://github.com/EmNudge/unicode-lookup" />

<main>
	<div class="searchbox">
		{#if $searchMode === SearchMode.SimpleSearch}
			<EasySearch on:search={easySearch} />

			<button 
				class="underline-btn" 
				on:click={() => $searchMode = SearchMode.AdvancedSearch}
			>advanced search</button>
		{:else}
			<AdvancedSearch on:search={advancedSearch} />

			<button 
				class="underline-btn" 
				on:click={() => $searchMode = SearchMode.SimpleSearch}
			>simple search</button>
		{/if}
	</div>

	<br>

	{#if $resultsStore.length}
		<ResultsContainer />
	{:else}
		<br>
		<p>No results fit that query :/</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
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
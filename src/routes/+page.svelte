<script lang="ts">
	import { 
		resultsStore, currentQueryStore, 
		easySearchStore, boxSetsStore, hasFirstLoadedStore,
		selectedCodepoint,
	} from '$stores';

	import GithubIcon from '$icons/github.svelte';
	import { getBoxSetsFromText } from '$utils/query'

	import ResultsContainer from '$components/table-container/ResultsContainer.svelte';
	import EasySearch from '$components/EasySearch.svelte';
	import Header from '$components/Header.svelte';
	import AdvancedSearch from '$components/advanced-search/AdvancedSearch.svelte';
	import Loader from '$components/Loader.svelte';
	import '../global.css';

	onMount(() => {
		import('../queryProxy');
	});

	import type { BoxSet } from '$stores';
	let queryArr: BoxSet[] = [];
	$: {
		currentQueryStore.set(queryArr);
	}

	const easySearch = () =>
		queryArr = getBoxSetsFromText($easySearchStore);
	const advancedSearch = () => 
		queryArr = $boxSetsStore;

	import { searchMode, SearchMode } from '$stores'
import { onMount } from 'svelte';
	import InfoContainer from '$components/table-container/InfoContainer.svelte';
</script>

<aside>
	<div>
		{#if $selectedCodepoint}
			<InfoContainer codepoint={$selectedCodepoint.codepoint} info={$selectedCodepoint} name={$selectedCodepoint.name} />
		{/if}
	</div>
</aside>
<div>
	<Header />
	<GithubIcon href="https://github.com/EmNudge/unicode-lookup" />
	
	<main>
		<div class="searchbox">
			{#if $searchMode === SearchMode.SimpleSearch}
				<EasySearch on:search={easySearch} />
			{:else}
				<AdvancedSearch on:search={advancedSearch} />
			{/if}
		</div>
	
		<br>
	
		{#if $hasFirstLoadedStore}
			{#if $resultsStore.length}
				<ResultsContainer />
			{:else}
				<br>
				<p>No results fit that query :/</p>
			{/if}
		{:else}
			<Loader />
		{/if}
	</main>
</div>
<aside></aside>

<style>
	main {
		text-align: center;
		margin: 0 auto;
		
		width: 600px;
		max-width: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	:global(#app) {
		display: grid;
		grid-template-columns: 500px 1fr 500px;
	}
	aside {
		padding: 3em;
	}
	aside div {
		position: fixed;
		width: 400px;
	}
</style>

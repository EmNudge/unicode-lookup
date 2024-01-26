<script lang="ts">
	import { 
		resultsStore, currentQueryStore, 
		easySearchStore, boxSetsStore, hasFirstLoadedStore,
		selectedCodepoint, searchMode, SearchMode
	} from '$stores';

	import GithubIcon from '$icons/github.svelte';
	import { getBoxSetsFromText } from '$utils/query'

	import ResultsContainer from '$components/table-container/ResultsContainer.svelte';
	import EasySearch from '$components/EasySearch.svelte';
	import Header from '$components/Header.svelte';
	import AdvancedSearch from '$components/advanced-search/AdvancedSearch.svelte';
	import Loader from '$components/Loader.svelte';
	import InfoContainer from '$components/table-container/InfoContainer.svelte';
	import '../global.css';

	import { onMount } from 'svelte';
	onMount(() => import('../queryProxy'));

	import type { BoxSet } from '$stores';
	let queryArr: BoxSet[] = [];
	$: {
		currentQueryStore.set(queryArr);
	}

	const easySearch = () => queryArr = getBoxSetsFromText($easySearchStore);
	const advancedSearch = () => queryArr = $boxSetsStore;
</script>

<div class="content" class:middle={$selectedCodepoint}>
	{#if $selectedCodepoint}
		<aside>
			<div>
				<InfoContainer codepoint={$selectedCodepoint.codepoint} info={$selectedCodepoint} name={$selectedCodepoint.name} />
			</div>
		</aside>
	{/if}
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
	{#if $selectedCodepoint}
		<aside></aside>
	{/if}
</div>

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

	.content.middle {
		display: grid;
		grid-template-columns: minmax(500px, auto) 600px 500px;
		justify-content: center;
	}
	@media (max-width: 1600px) {
		.content.middle {
			display: grid;
			grid-template-columns: minmax(500px, auto) 600px;
		}
	}
	aside {
		padding: 3em;
	}
	aside div {
		position: fixed;
		width: 400px;
	}
</style>

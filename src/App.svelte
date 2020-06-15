<script>
	import { resultsStore, workerStore, showPopoverStore } from './stores';
	import ResultsContainer from './components/ResultsContainer.svelte';
	import Popover from './components/Popover.svelte';

	let hasSearched = false;

	let text = '';

	function query() {
		hasSearched = true;

		let num = Number(text);
		if ([...text].length === 1) {
			 num = text.codePointAt(0);
			 console.log(num)
		}
		if (isNaN(num) && /^[0-9a-fA-F]+$/.test(num)) num = parseInt(text, 16);
		const isNum = !isNaN(num);

		$workerStore.postMessage({ 
			type: 'query',
			payload: {
				type: isNum ? 'number' : 'string',
				value: isNum ? num : text,
				exact: isNum
			} 
		})
	}

</script>

<main>
	<h1>Unicode Lookup</h1>
	<p>A static unicode lookup web app using web workers.</p>
	<br>

	<form on:submit|preventDefault={query}>
		<input type="text" bind:value={text}>
		<button type="submit">Submit</button>
		<br>
		<br>
	</form>

	{#if $resultsStore.length}
		<ResultsContainer results={$resultsStore} />
	{:else}
		<br>
		{#if hasSearched}
			<div>No results fit that query :/</div>
		{:else}
			<div>Type and search :)</div>
		{/if}
	{/if}
</main>

{#if $showPopoverStore}
	<Popover />
{/if}

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
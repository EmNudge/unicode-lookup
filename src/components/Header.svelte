<script lang="ts">
	import { searchModeStore } from '$stores';

	import { fly } from 'svelte/transition';
	import FilterIcon from '$icons/filter.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	function toggleSearchMode() {
		$searchModeStore = $searchModeStore === 'advanced' ? 'simple' : 'advanced';
	}
</script>

<header>
	<div class="text">
		<h1>Unicode Lookup</h1>
		{#if $searchModeStore === 'simple'}
			<h3 in:fly={{ x: -20 }}>Simple Search</h3>
		{:else}
			<h3 in:fly={{ x: -20 }}>Advanced Search</h3>
		{/if}
	</div>

	<div class="buttons">
		<ThemeSwitcher />
		<button
			class="styled"
			class:active={$searchModeStore === 'advanced'}
			on:click={toggleSearchMode}
		>
			<FilterIcon active={$searchModeStore === 'advanced'} />
		</button>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		max-width: 600px;
		margin: 20px auto;
		display: flex;
		align-items: center;
	}
	h1 {
		font-size: 1.7em;
	}

	.buttons {
		display: flex;
	}
	button {
		cursor: pointer;
		margin: 0;
		z-index: 2;
		padding: 10px 20px;
	}
	.active {
		color: var(--hsl-bg);
		background: var(--hsl);
		transition: 0.25s;
	}
	button:focus {
		border: 1px solid var(--hsl);
	}
</style>

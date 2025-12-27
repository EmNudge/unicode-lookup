<script lang="ts">
	import ResultsRow from './ResultsRow.svelte';
	import { activeIndex, resultsStore } from '$stores';
	import { get } from 'svelte/store';

	function handleFocus(e: FocusEvent) {
		const index = (e.target as Element).querySelector('img')?.dataset.index;
		if (!index) return;
		$activeIndex = Number(index);
	}
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown' && $activeIndex < $resultsStore.length - 1) {
			$activeIndex++;
		} else if (e.key === 'ArrowUp' && $activeIndex >= 0) {
			$activeIndex--;
		}
	}

	let resultsNum = $state(50);
	resultsStore.subscribe(() => {
		resultsNum = 50;
	});

	let intersectionObserver: HTMLDivElement | undefined;
	$effect(() => {
		if (!intersectionObserver) return;

		const intObserver = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				console.log({ entry });
				if (!entry.isIntersecting) return;

				if (get(resultsStore).length > resultsNum) {
					resultsNum += 50;
				}
			},
			{
				rootMargin: '0px',
				threshold: 0.8
			}
		);

		intObserver.observe(intersectionObserver);
	});

	const shownResults = $derived($resultsStore.slice(0, resultsNum));
</script>

<p>
	{$resultsStore.length} result{$resultsStore.length > 1 ? 's' : ''}
</p>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="table"
	role="table"
	onfocusin={handleFocus}
	onkeydown={handleKeydown}
>
	{#each shownResults as [codepoint, info], i}
		<ResultsRow index={i} {codepoint} {info} />
	{/each}

	<div class="intersection-observer" bind:this={intersectionObserver}></div>
</div>

<style>
	.table {
		text-align: left;
	}
	p {
		text-align: left;
		margin: 0;
		opacity: 0.7;
		font-size: 0.8rem;
	}
	.intersection-observer {
		height: 5rem;
	}
</style>

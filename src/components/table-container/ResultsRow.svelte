<script lang="ts">
	import { activeIndex } from '$stores';
	import { getCodepoint } from '$utils/char';
	import type { UnicodeCharInfo } from '$utils/types';
	import toast from 'svelte-french-toast';

	const {
		codepoint,
		info,
		index
	}: {
		codepoint: number;
		info: UnicodeCharInfo;
		index: number;
	} = $props();

	let rowEl: HTMLButtonElement | undefined;
	$effect(() => {
		if ($activeIndex === index) {
			rowEl?.focus();
		}
	});
</script>

<button
	class="row"
	class:active={$activeIndex === index}
	onclick={() => {
		$activeIndex = index;
	}}
	oncontextmenu={(e) => {
		e.preventDefault();
		navigator.clipboard.writeText(String.fromCodePoint(codepoint));
		toast.success('Copied character to clipboard');
		rowEl?.animate(
			[
				{ transform: 'scale(1)' },
				{ transform: 'scale(0.95)' },
				{ transform: 'scale(1.02)' },
				{ transform: 'scale(1)' }
			],
			{
				duration: 400,
				iterations: 1,
				easing: 'ease-out'
			}
		);
	}}
	tabindex="0"
	bind:this={rowEl}
	data-codepoint={getCodepoint(codepoint)}
>
	<div class="content">
		<div class="symbol">
			<span>{String.fromCodePoint(codepoint)}</span>
		</div>

		<div class="name">
			<span>{info.name.toLowerCase()}</span>
		</div>
	</div>
</button>

<style>
	.row {
		border: 1px solid transparent;
		width: 100%;
		background-color: var(--bg-offset);

		position: relative;
		&:after {
			content: attr(data-codepoint);
			display: block;
			position: absolute;
			bottom: 0;
			right: 0;
			padding: 0.5rem;
			opacity: 0.5;
			font-size: 0.8rem;
		}

		&.active {
			border: 1px solid blue;
		}
	}

	.content {
		width: 100%;
		padding: 0.5rem;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
	}
	.symbol {
		width: 2rem;
		text-align: center;

		&::before,
		&::after {
			content: '"';
		}
	}

	.name {
		text-align: left;
		opacity: 0.75;
	}
</style>

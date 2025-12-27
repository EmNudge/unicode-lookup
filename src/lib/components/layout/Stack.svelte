<!-- eslint-disable svelte/valid-compile -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
	type DirectionValue = 'vertical' | 'horizontal';
	type AlignValue = 'start' | 'center' | 'end' | 'stretch';
	type JustifyValue =
		| 'start'
		| 'center'
		| 'end'
		| 'between'
		| 'around'
		| 'evenly';

	interface StackProps {
		direction?: DirectionValue;
		spacing?: SpacingValue;
		align?: AlignValue;
		justify?: JustifyValue;
		wrap?: boolean;
		children?: Snippet;
	}

	let {
		direction = 'vertical',
		spacing = 4,
		align = 'stretch',
		justify = 'start',
		wrap = false,
		children
	}: StackProps = $props();

	const classes = $derived(
		[
			'stack',
			`stack--${direction}`,
			`stack--spacing-${spacing}`,
			`stack--align-${align}`,
			`stack--justify-${justify}`,
			wrap && 'stack--wrap'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={classes}>
	{@render children?.()}
</div>

<style>
	.stack {
		display: flex;
	}

	.stack--vertical {
		flex-direction: column;
	}

	.stack--horizontal {
		flex-direction: row;
	}

	/* Spacing - Vertical */
	/* svelte-ignore css-unused-selector */
	.stack--vertical.stack--spacing-0 > :not(:last-child) {
		margin-bottom: var(--space-0);
	}
	/* svelte-ignore css-unused-selector */
	.stack--vertical.stack--spacing-1 > :not(:last-child) {
		margin-bottom: var(--space-1);
	}
	/* svelte-ignore css-unused-selector */
	.stack--vertical.stack--spacing-2 > :not(:last-child) {
		margin-bottom: var(--space-2);
	}
	/* svelte-ignore css-unused-selector */
	.stack--vertical.stack--spacing-3 > :not(:last-child) {
		margin-bottom: var(--space-3);
	}
	/* svelte-ignore css-unused-selector */
	.stack--vertical.stack--spacing-4 > :not(:last-child) {
		margin-bottom: var(--space-4);
	}
	/* svelte-ignore css-unused-selector */
	.stack--vertical.stack--spacing-5 > :not(:last-child) {
		margin-bottom: var(--space-5);
	}
	/* svelte-ignore css-unused-selector */
	.stack--vertical.stack--spacing-6 > :not(:last-child) {
		margin-bottom: var(--space-6);
	}
	/* svelte-ignore css-unused-selector */
	.stack--vertical.stack--spacing-8 > :not(:last-child) {
		margin-bottom: var(--space-8);
	}
	/* svelte-ignore css-unused-selector */
	.stack--vertical.stack--spacing-10 > :not(:last-child) {
		margin-bottom: var(--space-10);
	}
	/* svelte-ignore css-unused-selector */
	.stack--vertical.stack--spacing-12 > :not(:last-child) {
		margin-bottom: var(--space-12);
	}

	/* Spacing - Horizontal */
	/* svelte-ignore css-unused-selector */
	.stack--horizontal.stack--spacing-0 > :not(:last-child) {
		margin-right: var(--space-0);
	}
	/* svelte-ignore css-unused-selector */
	.stack--horizontal.stack--spacing-1 > :not(:last-child) {
		margin-right: var(--space-1);
	}
	/* svelte-ignore css-unused-selector */
	.stack--horizontal.stack--spacing-2 > :not(:last-child) {
		margin-right: var(--space-2);
	}
	/* svelte-ignore css-unused-selector */
	.stack--horizontal.stack--spacing-3 > :not(:last-child) {
		margin-right: var(--space-3);
	}
	/* svelte-ignore css-unused-selector */
	.stack--horizontal.stack--spacing-4 > :not(:last-child) {
		margin-right: var(--space-4);
	}
	/* svelte-ignore css-unused-selector */
	.stack--horizontal.stack--spacing-5 > :not(:last-child) {
		margin-right: var(--space-5);
	}
	/* svelte-ignore css-unused-selector */
	.stack--horizontal.stack--spacing-6 > :not(:last-child) {
		margin-right: var(--space-6);
	}
	/* svelte-ignore css-unused-selector */
	.stack--horizontal.stack--spacing-8 > :not(:last-child) {
		margin-right: var(--space-8);
	}
	/* svelte-ignore css-unused-selector */
	.stack--horizontal.stack--spacing-10 > :not(:last-child) {
		margin-right: var(--space-10);
	}
	/* svelte-ignore css-unused-selector */
	.stack--horizontal.stack--spacing-12 > :not(:last-child) {
		margin-right: var(--space-12);
	}

	/* Alignment */
	.stack--align-start {
		align-items: flex-start;
	}
	.stack--align-center {
		align-items: center;
	}
	.stack--align-end {
		align-items: flex-end;
	}
	.stack--align-stretch {
		align-items: stretch;
	}

	/* Justify */
	.stack--justify-start {
		justify-content: flex-start;
	}
	.stack--justify-center {
		justify-content: center;
	}
	.stack--justify-end {
		justify-content: flex-end;
	}
	.stack--justify-between {
		justify-content: space-between;
	}
	.stack--justify-around {
		justify-content: space-around;
	}
	.stack--justify-evenly {
		justify-content: space-evenly;
	}

	/* Wrap */
	.stack--wrap {
		flex-wrap: wrap;
	}
</style>

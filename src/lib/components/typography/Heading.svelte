<script lang="ts">
	import type { Snippet } from 'svelte';

	type LevelValue = 1 | 2 | 3 | 4 | 5 | 6;
	type SizeValue = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
	type WeightValue = 'normal' | 'medium' | 'semibold' | 'bold';
	type ColorValue = 'base' | 'secondary' | 'tertiary' | 'primary';

	interface HeadingProps {
		level?: LevelValue;
		size?: SizeValue;
		weight?: WeightValue;
		color?: ColorValue;
		children?: Snippet;
	}

	let {
		level = 1,
		size,
		weight = 'bold',
		color = 'base',
		children
	}: HeadingProps = $props();

	// Default size based on level if not provided
	const defaultSize: Record<LevelValue, SizeValue> = {
		1: '4xl',
		2: '3xl',
		3: '2xl',
		4: 'xl',
		5: 'lg',
		6: 'base'
	};

	const finalSize = $derived(size ?? defaultSize[level]);
	const tag = $derived(`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');

	const classes = $derived(
		[
			'heading',
			`heading--size-${finalSize}`,
			`heading--weight-${weight}`,
			`heading--color-${color}`
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<svelte:element this={tag} class={classes}>
	{@render children?.()}
</svelte:element>

<style>
	.heading {
		margin: 0;
		font-family: var(--font-family-base);
		line-height: var(--line-height-tight);
	}

	/* Sizes */
	.heading--size-xs {
		font-size: var(--font-size-xs);
	}
	.heading--size-sm {
		font-size: var(--font-size-sm);
	}
	.heading--size-base {
		font-size: var(--font-size-base);
	}
	.heading--size-lg {
		font-size: var(--font-size-lg);
	}
	.heading--size-xl {
		font-size: var(--font-size-xl);
	}
	.heading--size-2xl {
		font-size: var(--font-size-2xl);
	}
	.heading--size-3xl {
		font-size: var(--font-size-3xl);
	}
	.heading--size-4xl {
		font-size: var(--font-size-4xl);
	}

	/* Weights */
	.heading--weight-normal {
		font-weight: var(--font-weight-normal);
	}
	.heading--weight-medium {
		font-weight: var(--font-weight-medium);
	}
	.heading--weight-semibold {
		font-weight: var(--font-weight-semibold);
	}
	.heading--weight-bold {
		font-weight: var(--font-weight-bold);
	}

	/* Colors */
	.heading--color-base {
		color: var(--color-text);
	}
	.heading--color-secondary {
		color: var(--color-text-secondary);
	}
	.heading--color-tertiary {
		color: var(--color-text-tertiary);
	}
	.heading--color-primary {
		color: var(--color-text-primary);
	}
</style>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type SizeValue = 'sm' | 'base' | 'lg';

	interface LabelProps {
		for?: string;
		required?: boolean;
		optional?: boolean;
		size?: SizeValue;
		children?: Snippet;
	}

	let {
		for: htmlFor,
		required = false,
		optional = false,
		size = 'base',
		children
	}: LabelProps = $props();

	const classes = $derived(
		['label', `label--${size}`].filter(Boolean).join(' ')
	);
</script>

<label for={htmlFor} class={classes}>
	{@render children?.()}
	{#if required}
		<span
			class="label-indicator label-indicator--required"
			aria-label="required">*</span
		>
	{:else if optional}
		<span
			class="label-indicator label-indicator--optional"
			aria-label="optional">(optional)</span
		>
	{/if}
</label>

<style>
	.label {
		display: block;
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
		margin-bottom: var(--space-1);
	}

	/* Sizes */
	.label--sm {
		font-size: var(--font-size-sm);
	}

	.label--base {
		font-size: var(--font-size-base);
	}

	.label--lg {
		font-size: var(--font-size-lg);
	}

	.label-indicator {
		margin-left: var(--space-1);
	}

	.label-indicator--required {
		color: var(--color-error);
	}

	.label-indicator--optional {
		color: var(--color-text-tertiary);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-sm);
	}
</style>

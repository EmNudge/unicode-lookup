<script lang="ts">
	import type { Snippet } from 'svelte';

	type VariantValue =
		| 'default'
		| 'primary'
		| 'success'
		| 'warning'
		| 'error'
		| 'info';
	type SizeValue = 'sm' | 'base' | 'lg';

	interface BadgeProps {
		variant?: VariantValue;
		size?: SizeValue;
		dot?: boolean;
		pill?: boolean;
		children?: Snippet;
	}

	let {
		variant = 'default',
		size = 'base',
		dot = false,
		pill = false,
		children
	}: BadgeProps = $props();

	const classes = $derived(
		[
			'badge',
			`badge--${variant}`,
			`badge--${size}`,
			pill && 'badge--pill',
			dot && 'badge--dot'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<span class={classes}>
	{#if dot}
		<span class="badge__dot"></span>
	{/if}
	{@render children?.()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		font-weight: var(--font-weight-medium);
		border-radius: var(--radius-md);
		white-space: nowrap;
	}

	/* Variants */
	.badge--default {
		background: var(--color-bg-offset);
		color: var(--color-text);
		border: var(--border-width-1) solid var(--color-border);
	}

	.badge--primary {
		background: var(--color-primary-bg);
		color: var(--color-primary);
		border: var(--border-width-1) solid var(--color-primary);
	}

	.badge--success {
		background: var(--color-success-bg);
		color: var(--color-success);
		border: var(--border-width-1) solid var(--color-success-border);
	}

	.badge--warning {
		background: var(--color-warning-bg);
		color: var(--color-warning);
		border: var(--border-width-1) solid var(--color-warning-border);
	}

	.badge--error {
		background: var(--color-error-bg);
		color: var(--color-error);
		border: var(--border-width-1) solid var(--color-error-border);
	}

	.badge--info {
		background: var(--color-info-bg);
		color: var(--color-info);
		border: var(--border-width-1) solid var(--color-info-border);
	}

	/* Sizes */
	.badge--sm {
		padding: var(--space-1) var(--space-2);
		font-size: var(--font-size-xs);
	}

	.badge--base {
		padding: var(--space-1) var(--space-3);
		font-size: var(--font-size-sm);
	}

	.badge--lg {
		padding: var(--space-2) var(--space-4);
		font-size: var(--font-size-base);
	}

	/* Pill */
	.badge--pill {
		border-radius: var(--radius-full);
	}

	/* Dot */
	.badge--dot {
		padding-left: var(--space-2);
	}

	.badge__dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: var(--radius-full);
		background: currentColor;
	}
</style>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type VariantValue = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
	type SizeValue = 'sm' | 'base' | 'lg';
	type TypeValue = 'button' | 'submit' | 'reset';

	interface ButtonProps {
		variant?: VariantValue;
		size?: SizeValue;
		disabled?: boolean;
		loading?: boolean;
		fullWidth?: boolean;
		hue?: number; // Backward compatibility
		type?: TypeValue;
		onclick?: (e: MouseEvent) => void;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'base',
		disabled = false,
		loading = false,
		fullWidth = false,
		hue,
		type = 'button',
		onclick,
		children
	}: ButtonProps = $props();

	const classes = $derived(
		[
			'btn',
			hue !== undefined ? 'styled' : `btn--${variant}`,
			`btn--${size}`,
			fullWidth && 'btn--full-width',
			(disabled || loading) && 'btn--disabled'
		]
			.filter(Boolean)
			.join(' ')
	);

	const style = $derived(hue !== undefined ? `--hue: ${hue}` : undefined);
</script>

<button class={classes} {style} {type} disabled={disabled || loading} {onclick}>
	{#if loading}
		<span class="btn__spinner"></span>
	{/if}
	<span class="btn__content" class:btn__content--loading={loading}>
		{@render children?.()}
	</span>
</button>

<style>
	.btn {
		margin: 0;
		padding: var(--space-2) var(--space-5);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		cursor: pointer;
		font-family: var(--font-family-base);
		font-weight: var(--font-weight-medium);
		transition: var(--transition-colors), var(--transition-transform);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		position: relative;
		border: var(--border-width-1) solid transparent;
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	/* Variants */
	.btn--primary {
		color: var(--color-primary);
		background: var(--color-primary-bg);
		border-color: var(--color-primary);
	}

	.btn--primary:hover:not(:disabled) {
		background: var(--color-primary-hover);
		filter: brightness(0.95);
	}

	.btn--primary:active:not(:disabled) {
		transform: scale(0.98);
	}

	.btn--secondary {
		color: var(--color-text);
		background: var(--color-bg-offset);
		border-color: var(--color-border);
	}

	.btn--secondary:hover:not(:disabled) {
		background: var(--color-bg-elevated);
		border-color: var(--color-text-secondary);
	}

	.btn--secondary:active:not(:disabled) {
		transform: scale(0.98);
	}

	.btn--ghost {
		color: var(--color-text-primary);
		background: transparent;
		border-color: transparent;
		box-shadow: none;
	}

	.btn--ghost:hover:not(:disabled) {
		background: var(--color-bg-offset);
	}

	.btn--ghost:active:not(:disabled) {
		transform: scale(0.98);
	}

	.btn--outline {
		color: var(--color-primary);
		background: transparent;
		border-color: var(--color-primary);
		box-shadow: none;
	}

	.btn--outline:hover:not(:disabled) {
		background: var(--color-primary-bg);
	}

	.btn--outline:active:not(:disabled) {
		transform: scale(0.98);
	}

	.btn--danger {
		color: white;
		background: var(--color-error);
		border-color: var(--color-error);
	}

	.btn--danger:hover:not(:disabled) {
		filter: brightness(1.1);
	}

	.btn--danger:active:not(:disabled) {
		transform: scale(0.98);
	}

	/* Sizes */
	.btn--sm {
		padding: var(--space-1) var(--space-3);
		font-size: var(--font-size-sm);
	}

	.btn--lg {
		padding: var(--space-3) var(--space-6);
		font-size: var(--font-size-lg);
	}

	/* Full Width */
	.btn--full-width {
		width: 100%;
	}

	/* Disabled */
	.btn:disabled,
	.btn--disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Loading Spinner */
	.btn__spinner {
		width: 1em;
		height: 1em;
		border: 2px solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.btn__content--loading {
		opacity: 0.7;
	}

	/* Backward compatibility with .styled class */
	.btn.styled {
		color: var(--hsl);
		background: var(--hsl-bg);
		border-color: var(--hsl);
	}

	.btn.styled:hover:not(:disabled) {
		filter: brightness(0.95);
	}

	.btn.styled:active:not(:disabled) {
		transform: scale(0.98);
	}
</style>

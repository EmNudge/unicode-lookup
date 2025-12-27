<script lang="ts">
	type TypeValue =
		| 'text'
		| 'email'
		| 'password'
		| 'number'
		| 'search'
		| 'tel'
		| 'url';
	type SizeValue = 'sm' | 'base' | 'lg';

	interface InputProps {
		value?: string;
		type?: TypeValue;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		error?: string | boolean;
		size?: SizeValue;
		fullWidth?: boolean;
		hue?: number; // Backward compatibility
		autocomplete?: import('svelte/elements').FullAutoFill | null;
		oninput?: (e: Event) => void;
		onfocus?: (e: FocusEvent) => void;
		onblur?: (e: FocusEvent) => void;
	}

	let {
		value = $bindable(''),
		type = 'text',
		placeholder = '',
		disabled = false,
		readonly = false,
		error = false,
		size = 'base',
		fullWidth = false,
		hue,
		autocomplete,
		oninput,
		onfocus,
		onblur
	}: InputProps = $props();

	const hasError = $derived(typeof error === 'string' ? !!error : error);

	const classes = $derived(
		[
			'input',
			hue !== undefined ? 'styled' : 'input--default',
			`input--${size}`,
			hasError && 'input--error',
			fullWidth && 'input--full-width',
			disabled && 'input--disabled'
		]
			.filter(Boolean)
			.join(' ')
	);

	const style = $derived(hue !== undefined ? `--hue: ${hue}` : undefined);
</script>

<div class="input-wrapper">
	<input
		class={classes}
		{style}
		bind:value
		{type}
		{placeholder}
		{disabled}
		{readonly}
		{autocomplete}
		{oninput}
		{onfocus}
		{onblur}
		aria-invalid={hasError}
	/>
	{#if typeof error === 'string' && error}
		<span class="input-error">{error}</span>
	{/if}
</div>

<style>
	.input-wrapper {
		display: inline-flex;
		flex-direction: column;
		gap: var(--space-1);
		width: auto;
	}

	.input {
		margin: 0;
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-md);
		border: var(--border-width-1) solid var(--color-border);
		background: var(--color-bg-input);
		color: var(--color-text);
		font-family: var(--font-family-base);
		transition: var(--transition-colors);
		box-sizing: border-box;
	}

	.input::placeholder {
		color: var(--color-text-tertiary);
		opacity: 0.6;
	}

	.input:focus {
		outline: none;
		border-color: var(--color-border-focus);
		box-shadow: var(--shadow-input-focus);
	}

	.input--default:hover:not(:disabled):not(:focus) {
		border-color: var(--color-text-secondary);
	}

	/* Sizes */
	.input--sm {
		padding: var(--space-1) var(--space-3);
		font-size: var(--font-size-sm);
		height: var(--size-input-height-sm);
	}

	.input--base {
		height: var(--size-input-height-base);
	}

	.input--lg {
		padding: var(--space-3) var(--space-5);
		font-size: var(--font-size-lg);
		height: var(--size-input-height-lg);
	}

	/* Error State */
	.input--error {
		border-color: var(--color-error-border);
	}

	.input--error:focus {
		border-color: var(--color-error);
	}

	.input-error {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		margin-top: var(--space-1);
	}

	/* Full Width */
	.input--full-width {
		width: 100%;
	}

	/* Disabled */
	.input:disabled,
	.input--disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background: var(--color-bg-offset);
	}

	/* Backward compatibility with .styled class */
	.input.styled {
		color: var(--hsl);
		background: var(--hsl-bg);
		border-color: var(--hsl);
	}

	.input.styled:focus {
		border-color: var(--hsl);
		box-shadow: var(--shadow-input-focus);
	}
</style>

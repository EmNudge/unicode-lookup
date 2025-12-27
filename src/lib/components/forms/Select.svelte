<script lang="ts">
	type OptionValue = string | number;
	type Option = { value: OptionValue; label: string };
	type SizeValue = 'sm' | 'base' | 'lg';

	interface SelectProps {
		value?: string | number;
		options: Option[] | string[] | number[];
		placeholder?: string;
		disabled?: boolean;
		error?: string | boolean;
		size?: SizeValue;
		fullWidth?: boolean;
		hue?: number; // Backward compatibility
		onchange?: (value: OptionValue) => void;
	}

	let {
		value = $bindable('' as OptionValue),
		options,
		placeholder = 'Select an option',
		disabled = false,
		error = false,
		size = 'base',
		fullWidth = false,
		hue,
		onchange
	}: SelectProps = $props();

	// Normalize options to {value, label} format
	const normalizedOptions = $derived(
		options.map((opt) => {
			if (typeof opt === 'object' && 'value' in opt && 'label' in opt) {
				return opt;
			}
			return { value: opt, label: String(opt) };
		})
	);

	const hasError = $derived(typeof error === 'string' ? !!error : error);

	const classes = $derived(
		[
			'select',
			hue !== undefined ? 'styled' : 'select--default',
			`select--${size}`,
			hasError && 'select--error',
			fullWidth && 'select--full-width',
			disabled && 'select--disabled'
		]
			.filter(Boolean)
			.join(' ')
	);

	const style = $derived(hue !== undefined ? `--hue: ${hue}` : undefined);

	function handleChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		const selectedValue = target.value;

		// Convert back to number if original options were numbers
		if (options.length > 0 && typeof options[0] === 'number') {
			value = Number(selectedValue);
		} else {
			value = selectedValue;
		}

		onchange?.(value);
	}
</script>

<div class="select-wrapper">
	<select
		class={classes}
		{style}
		bind:value
		{disabled}
		onchange={handleChange}
		aria-invalid={hasError}
	>
		{#if placeholder}
			<option value="" disabled selected={value === ''}>{placeholder}</option>
		{/if}
		{#each normalizedOptions as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	{#if typeof error === 'string' && error}
		<span class="select-error">{error}</span>
	{/if}
</div>

<style>
	.select-wrapper {
		display: inline-flex;
		flex-direction: column;
		gap: var(--space-1);
		width: auto;
	}

	.select {
		margin: 0;
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-md);
		border: var(--border-width-1) solid var(--color-border);
		background: var(--color-bg-input);
		color: var(--color-text);
		font-family: var(--font-family-base);
		transition: var(--transition-colors);
		box-sizing: border-box;
		cursor: pointer;
	}

	.select:focus {
		outline: none;
		border-color: var(--color-border-focus);
		box-shadow: var(--shadow-input-focus);
	}

	.select--default:hover:not(:disabled):not(:focus) {
		border-color: var(--color-text-secondary);
	}

	/* Sizes */
	.select--sm {
		padding: var(--space-1) var(--space-3);
		font-size: var(--font-size-sm);
		height: var(--size-input-height-sm);
	}

	.select--base {
		height: var(--size-input-height-base);
	}

	.select--lg {
		padding: var(--space-3) var(--space-5);
		font-size: var(--font-size-lg);
		height: var(--size-input-height-lg);
	}

	/* Error State */
	.select--error {
		border-color: var(--color-error-border);
	}

	.select--error:focus {
		border-color: var(--color-error);
	}

	.select-error {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		margin-top: var(--space-1);
	}

	/* Full Width */
	.select--full-width {
		width: 100%;
	}

	/* Disabled */
	.select:disabled,
	.select--disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background: var(--color-bg-offset);
	}

	/* Backward compatibility with .styled class */
	.select.styled {
		color: var(--hsl);
		background: var(--hsl-bg);
		border-color: var(--hsl);
	}

	.select.styled:focus {
		border-color: var(--hsl);
		box-shadow: var(--shadow-input-focus);
	}

	/* Style the option elements */
	option {
		background: var(--color-bg-input);
		color: var(--color-text);
	}
</style>

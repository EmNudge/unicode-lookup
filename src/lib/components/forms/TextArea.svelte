<script lang="ts">
	type ResizeValue = 'none' | 'vertical' | 'horizontal' | 'both';

	interface TextAreaProps {
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		error?: string | boolean;
		rows?: number;
		resize?: ResizeValue;
		fullWidth?: boolean;
		oninput?: (e: Event) => void;
		onfocus?: (e: FocusEvent) => void;
		onblur?: (e: FocusEvent) => void;
	}

	let {
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		readonly = false,
		error = false,
		rows = 4,
		resize = 'vertical',
		fullWidth = false,
		oninput,
		onfocus,
		onblur
	}: TextAreaProps = $props();

	const hasError = $derived(typeof error === 'string' ? !!error : error);

	const classes = $derived(
		[
			'textarea',
			hasError && 'textarea--error',
			fullWidth && 'textarea--full-width',
			disabled && 'textarea--disabled',
			`textarea--resize-${resize}`
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class="textarea-wrapper">
	<textarea
		class={classes}
		bind:value
		{placeholder}
		{disabled}
		{readonly}
		{rows}
		{oninput}
		{onfocus}
		{onblur}
		aria-invalid={hasError}
	></textarea>
	{#if typeof error === 'string' && error}
		<span class="textarea-error">{error}</span>
	{/if}
</div>

<style>
	.textarea-wrapper {
		display: inline-flex;
		flex-direction: column;
		gap: var(--space-1);
		width: auto;
	}

	.textarea {
		margin: 0;
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		border: var(--border-width-1) solid var(--color-border);
		background: var(--color-bg-input);
		color: var(--color-text);
		font-family: var(--font-family-base);
		font-size: var(--font-size-base);
		line-height: var(--line-height-normal);
		transition: var(--transition-colors);
		box-sizing: border-box;
		min-height: 5rem;
	}

	.textarea::placeholder {
		color: var(--color-text-tertiary);
		opacity: 0.6;
	}

	.textarea:focus {
		outline: none;
		border-color: var(--color-border-focus);
		box-shadow: var(--shadow-input-focus);
	}

	.textarea:hover:not(:disabled):not(:focus) {
		border-color: var(--color-text-secondary);
	}

	/* Resize */
	.textarea--resize-none {
		resize: none;
	}
	.textarea--resize-vertical {
		resize: vertical;
	}
	.textarea--resize-horizontal {
		resize: horizontal;
	}
	.textarea--resize-both {
		resize: both;
	}

	/* Error State */
	.textarea--error {
		border-color: var(--color-error-border);
	}

	.textarea--error:focus {
		border-color: var(--color-error);
	}

	.textarea-error {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		margin-top: var(--space-1);
	}

	/* Full Width */
	.textarea--full-width {
		width: 100%;
	}

	/* Disabled */
	.textarea:disabled,
	.textarea--disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background: var(--color-bg-offset);
	}
</style>

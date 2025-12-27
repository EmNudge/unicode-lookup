<script lang="ts">
	interface CheckboxProps {
		checked?: boolean;
		disabled?: boolean;
		label?: string;
		error?: string | boolean;
		indeterminate?: boolean;
		onchange?: (checked: boolean) => void;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		label = '',
		error = false,
		indeterminate = false,
		onchange
	}: CheckboxProps = $props();

	let inputElement: HTMLInputElement;

	const hasError = $derived(typeof error === 'string' ? !!error : error);

	$effect(() => {
		if (inputElement) {
			inputElement.indeterminate = indeterminate;
		}
	});

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		checked = target.checked;
		onchange?.(checked);
	}
</script>

<div class="checkbox-wrapper">
	<label class="checkbox-label" class:checkbox-label--disabled={disabled}>
		<input
			bind:this={inputElement}
			type="checkbox"
			class="checkbox-input"
			bind:checked
			{disabled}
			onchange={handleChange}
			aria-invalid={hasError}
		/>
		<span class="checkbox-box" class:checkbox-box--error={hasError}>
			{#if checked || indeterminate}
				<svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
					{#if indeterminate}
						<path
							d="M4 8h8"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						/>
					{:else}
						<path
							d="M3 8l3 3 7-7"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					{/if}
				</svg>
			{/if}
		</span>
		{#if label}
			<span class="checkbox-text">{label}</span>
		{/if}
	</label>
	{#if typeof error === 'string' && error}
		<span class="checkbox-error">{error}</span>
	{/if}
</div>

<style>
	.checkbox-wrapper {
		display: inline-flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.checkbox-label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		cursor: pointer;
		user-select: none;
	}

	.checkbox-label--disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.checkbox-input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.checkbox-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
		border: var(--border-width-2) solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-bg-input);
		transition: var(--transition-colors);
		flex-shrink: 0;
	}

	.checkbox-input:focus-visible + .checkbox-box {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	.checkbox-input:checked + .checkbox-box {
		background: var(--color-primary);
		border-color: var(--color-primary);
	}

	.checkbox-input:indeterminate + .checkbox-box {
		background: var(--color-primary);
		border-color: var(--color-primary);
	}

	.checkbox-label:hover .checkbox-box:not(.checkbox-box--error) {
		border-color: var(--color-primary);
	}

	.checkbox-box--error {
		border-color: var(--color-error-border);
	}

	.checkbox-icon {
		width: 1rem;
		height: 1rem;
		color: white;
	}

	.checkbox-text {
		color: var(--color-text);
		font-size: var(--font-size-base);
	}

	.checkbox-error {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		margin-left: calc(1.25rem + var(--space-2));
	}
</style>

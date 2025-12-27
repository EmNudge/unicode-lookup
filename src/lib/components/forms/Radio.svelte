<script lang="ts">
	interface RadioProps {
		value: string | number;
		name: string;
		group?: string | number;
		disabled?: boolean;
		label?: string;
		onchange?: (value: string | number) => void;
	}

	let {
		value,
		name,
		group = $bindable('' as string | number),
		disabled = false,
		label = '',
		onchange
	}: RadioProps = $props();

	function handleChange() {
		onchange?.(value);
	}
</script>

<label class="radio-label" class:radio-label--disabled={disabled}>
	<input
		type="radio"
		class="radio-input"
		{name}
		{value}
		bind:group
		{disabled}
		onchange={handleChange}
	/>
	<span class="radio-box">
		<span class="radio-dot"></span>
	</span>
	{#if label}
		<span class="radio-text">{label}</span>
	{/if}
</label>

<style>
	.radio-label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		cursor: pointer;
		user-select: none;
	}

	.radio-label--disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.radio-input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.radio-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
		border: var(--border-width-2) solid var(--color-border);
		border-radius: var(--radius-full);
		background: var(--color-bg-input);
		transition: var(--transition-colors);
		flex-shrink: 0;
	}

	.radio-input:focus-visible + .radio-box {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	.radio-label:hover .radio-box {
		border-color: var(--color-primary);
	}

	.radio-input:checked ~ .radio-box {
		border-color: var(--color-primary);
	}

	.radio-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: var(--radius-full);
		background: var(--color-primary);
		transform: scale(0);
		transition: transform var(--duration-base) var(--ease-out);
	}

	.radio-input:checked ~ .radio-box .radio-dot {
		transform: scale(1);
	}

	.radio-text {
		color: var(--color-text);
		font-size: var(--font-size-base);
	}
</style>

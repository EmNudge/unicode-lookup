<script lang="ts">
	import type { Snippet } from 'svelte';

	type VariantValue = 'info' | 'success' | 'warning' | 'error';

	interface AlertProps {
		variant?: VariantValue;
		title?: string;
		dismissible?: boolean;
		icon?: boolean;
		children?: Snippet;
		onclose?: () => void;
	}

	let {
		variant = 'info',
		title = '',
		dismissible = false,
		icon = true,
		children,
		onclose
	}: AlertProps = $props();

	const icons: Record<VariantValue, string> = {
		info: 'ℹ',
		success: '✓',
		warning: '⚠',
		error: '✕'
	};
</script>

<div class="alert alert--{variant}" role="alert">
	{#if icon}
		<div class="alert__icon">{icons[variant]}</div>
	{/if}

	<div class="alert__content">
		{#if title}
			<div class="alert__title">{title}</div>
		{/if}
		<div class="alert__message">
			{@render children?.()}
		</div>
	</div>

	{#if dismissible}
		<button
			class="alert__close"
			onclick={onclose}
			aria-label="Close"
			type="button">✕</button
		>
	{/if}
</div>

<style>
	.alert {
		display: flex;
		gap: var(--space-3);
		padding: var(--space-4);
		border-radius: var(--radius-md);
		border: var(--border-width-1) solid;
	}

	.alert--info {
		background: var(--color-info-bg);
		color: var(--color-info);
		border-color: var(--color-info-border);
	}

	.alert--success {
		background: var(--color-success-bg);
		color: var(--color-success);
		border-color: var(--color-success-border);
	}

	.alert--warning {
		background: var(--color-warning-bg);
		color: var(--color-warning);
		border-color: var(--color-warning-border);
	}

	.alert--error {
		background: var(--color-error-bg);
		color: var(--color-error);
		border-color: var(--color-error-border);
	}

	.alert__icon {
		flex-shrink: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
	}

	.alert__content {
		flex: 1;
		min-width: 0;
	}

	.alert__title {
		font-weight: var(--font-weight-semibold);
		margin-bottom: var(--space-1);
	}

	.alert__message {
		font-size: var(--font-size-base);
	}

	.alert__close {
		flex-shrink: 0;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		opacity: 0.7;
		transition: opacity var(--duration-base);
		color: inherit;
		font-size: var(--font-size-lg);
		line-height: 1;
	}

	.alert__close:hover {
		opacity: 1;
	}
</style>

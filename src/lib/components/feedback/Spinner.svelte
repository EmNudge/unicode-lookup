<script lang="ts">
	type SizeValue = 'sm' | 'base' | 'lg' | 'xl';
	type ColorValue = 'primary' | 'white' | 'current';

	interface SpinnerProps {
		size?: SizeValue;
		color?: ColorValue;
	}

	let { size = 'base', color = 'primary' }: SpinnerProps = $props();

	const classes = $derived(
		['spinner', `spinner--${size}`, `spinner--${color}`].join(' ')
	);
</script>

<div class={classes} role="status" aria-label="Loading">
	<div class="spinner__circle"></div>
</div>

<style>
	.spinner {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.spinner__circle {
		border-radius: 50%;
		border-style: solid;
		border-right-color: transparent;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Sizes */
	.spinner--sm .spinner__circle {
		width: 1rem;
		height: 1rem;
		border-width: 2px;
	}

	.spinner--base .spinner__circle {
		width: 1.5rem;
		height: 1.5rem;
		border-width: 2px;
	}

	.spinner--lg .spinner__circle {
		width: 2rem;
		height: 2rem;
		border-width: 3px;
	}

	.spinner--xl .spinner__circle {
		width: 3rem;
		height: 3rem;
		border-width: 4px;
	}

	/* Colors */
	.spinner--primary .spinner__circle {
		border-color: var(--color-primary);
		border-right-color: transparent;
	}

	.spinner--white .spinner__circle {
		border-color: white;
		border-right-color: transparent;
	}

	.spinner--current .spinner__circle {
		border-color: currentColor;
		border-right-color: transparent;
	}
</style>

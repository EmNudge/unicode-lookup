<script lang="ts">
	let from = 0;
	let to = 65535;

	export let data: { from: number; to: number } = { from, to };
	import NumberInput from '../NumberInput.svelte';

	$: {
		data = { from, to };
	}
</script>

<div>
	<span>From</span>
	<NumberInput bind:value={from} />
	<span>To</span>
	<NumberInput bind:value={to} />
</div>

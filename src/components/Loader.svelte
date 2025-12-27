<script>
	let str = 'xxxxxx';

	import { onMount } from 'svelte';
	onMount(() => {
		const id = setInterval(() => {
			const codepoint = Math.floor(Math.random() * 0xfff);
			const char = String.fromCodePoint(codepoint);

			const index = Math.floor(Math.random() * str.length);
			str = str.slice(0, index) + char + str.slice(index + 1);
		}, 50);

		return () => clearInterval(id);
	});
</script>

<section>
	<h2>Fetching Data</h2>
	<br />
	<div class="chars">
		{#each Array.from(str) as char}
			<span>{char}</span>
		{/each}
	</div>
</section>

<style>
	section {
		text-align: center;
		padding-top: 50px;
	}
	.chars span {
		display: inline-block;
		width: 25px;
		text-align: center;
		line-height: 1em;
	}
</style>

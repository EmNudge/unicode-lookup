<script lang="ts">
	export let hue = 111;
	export let options: any[] = ['Dropdown'];
	export let value: any;
	export let disabled = false;
</script>

<style>
	select {
		box-shadow: 0px 4px 3px 0px #00000017;
		cursor: pointer;
	}
	select:focus {
		outline: none;
	}
	select:disabled {
		opacity: 1;
		filter: brightness(95%);
		cursor: auto;
	}
</style>

<select {disabled} class="styled" style="--hue: {hue}" bind:value>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
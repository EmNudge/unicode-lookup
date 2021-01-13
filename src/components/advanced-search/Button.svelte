<script>
	export let hue = 170;
	export let disabled = false;
</script>

<style>
	button {
		margin: 0;
		padding: 5px 15px;
		
		border-radius: 4px;
		box-shadow: 0px 4px 3px 0px #00000017;
		cursor: pointer;
	}
	button:focus, button:active {
		color: var(--hsl);
		border: 1px solid var(--hsl);
		background: hsl(var(--hue), 100%, 95%);
	}
	button:active {
		background: hsl(var(--hue), 70%, 95%);
		transform: scale(.95);
	}
	
	.disabled {
		border: 1px solid hsl(var(--hue), 40%, 75%);
		color: hsl(var(--hue), 40%, 75%);
		cursor: auto;
	}
</style>

<button 
	on:click 
	class="styled" 
	style="--hue: {hue}"
	class:disabled
	{disabled}
>
	<slot />
</button>
<script lang="ts">
	import Input from '../Input.svelte';
	
	export let data: string = '';

	let text: string = 'symbol';
	$: {
		data = text
	}

	function validator(text: string) {
		if (/^[A-Za-z ]+$/.test(text)) return true;
		return 'name must include letters A-Z only';
	}
</script>

<Input 
	placeholder="text" 
	validator={validator}
	bind:value={text} />
<script lang="ts">
	import Input from '../Input.svelte';
	
	export let data: string = '';

	let text: string = 'symbol';
	$: {
		data = text
	}

	function validator(text: string) {
		if (/^[A-Za-z0-9 ()<>,-]+$/.test(text)) return true;
		return 'Impossible name';
	}
</script>

<Input 
	placeholder="text" 
	validator={validator}
	bind:value={text} />
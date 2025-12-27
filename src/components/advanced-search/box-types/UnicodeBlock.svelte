<script lang="ts">
	export let data: string;

	import Dropdown from '../Dropdown.svelte';
	import { blockLookupStore } from '../../../stores';

	const blockNames = $blockLookupStore.map((block) => block.name);

	let shouldSort = true;
	$: blocks = shouldSort ? [...blockNames].sort() : blockNames;

	let blockName: string = blockNames[0];

	$: {
		data = blockName;
	}
</script>

<Dropdown options={blocks} hue={35} bind:value={blockName} />

<label>
	<span>Sort Blocks Alphabetically</span>
	<input type="checkbox" bind:checked={shouldSort} />
</label>

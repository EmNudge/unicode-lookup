<script lang="ts">
	import { Types, scripts } from '../../utils/regexBuilder.js';
	
	export let name: string;
	export let properties: Map<string, any>;
	
	let value = name === 'Script' ? 'Adlam' : '';
	
	function removeIndex(arr: any[], index: number) {
		return [...arr.slice(0, index), ...arr.slice(index + 1)];
	}
	
	const onClick = (e: MouseEvent) => {
		if ((e.target as HTMLElement).tagName === "SELECT") return;
		
		if (!properties.has(name)) {
			properties.set(name, { value, type: Types.INCLUDED });
			properties = properties;
			return;
		}
		
		const { type } = properties.get(name);

		if (type === Types.INCLUDED) {
			properties.set(name, { value, type: Types.EXCLUDED });
		} else {
			properties.delete(name);
		}
		
		properties = properties;
	}
  
	const onInput = (e: Event & { target: EventTarget & HTMLSelectElement; }) => {
		if (!properties.has(name)) return;

		const { value } = e.target;
		const { type } = properties.get(name);
		properties.set(name, { value, type });
		properties = properties;
	}
</script>

<style>
	button, button:active {
		cursor: pointer;
		border: none;
		background: var(--gry);
		height: 50px;
		margin: 0;
	}
	button.included {
		background: var(--grn);
	}
	button.excluded {
		background: var(--red);
	}
	select {
		margin: 0;
	}
</style>

<button 
  class:included={properties.has(name) && properties.get(name).type === Types.INCLUDED}
  class:excluded={properties.has(name) && properties.get(name).type === Types.EXCLUDED}
  on:click={onClick}
>
	<span>{name}</span>
	{#if name === "Script"}
		<span>=</span>
		<select bind:value on:input={onInput}>
			{#each scripts as script}
				<option>{script}</option>
			{/each}
		</select>
	{/if}
</button>
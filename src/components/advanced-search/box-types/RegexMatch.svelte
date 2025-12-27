<script lang="ts">
	import Input from '../Input.svelte';
	import Dropdown from '../Dropdown.svelte';

	let regex: string = '/[A-Za-z]/u';
	let matchOn: 'Character' | 'Name' = 'Character';

	type Data = { regex: RegExp; matchOn: 'Character' | 'Name' };
	export let data: Data = { regex: getRegexFromString(regex)!, matchOn };

	$: {
		data = { regex: getRegexFromString(regex)!, matchOn };
	}

	function validateRegex(text: string) {
		if (getRegexFromString(text)) return true;
		return 'invalid regex';
	}

	export function getRegexFromString(text: string) {
		const res = text.match(/^\/(.+)\/([A-Za-z]*)$/);
		if (!res) return null;

		const { 1: regex, 2: flags } = res;
		try {
			return new RegExp(regex, flags);
		} catch {
			return null;
		}
	}
</script>

<span>Regex</span>
<Input
	placeholder="regular expression"
	validator={validateRegex}
	bind:value={regex}
/>

<span>Match On</span>
<Dropdown options={['Character', 'Name']} hue={35} bind:value={matchOn} />

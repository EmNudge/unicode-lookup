<script lang="ts">
	export let value: any;

	type Mutator = (text: string) => any;
	export let mutator: Mutator = (t: any) => t;

	type Validator = (text: string, mutatedValue: any) => string | true;
	export let validator: Validator = () => true;

	export let hue = 35;
	export let placeholder = '';

	let text = value;
	let errText = '';
	$: {
		const newValue = mutator(text);
		const isValid = validator(text, newValue);

		if (isValid === true) {
			value = newValue;
			errText = '';
		} else {
			errText = isValid;
		}
	}
</script>

<input
	class="styled"
	style="--hue: {hue}"
	type="text"
	autocorrect="off"
	{placeholder}
	bind:value={text}
/>

<p>{errText}</p>

<style>
	p {
		color: red;
	}
</style>

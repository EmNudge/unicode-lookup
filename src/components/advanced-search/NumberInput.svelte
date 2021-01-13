<script>
	export let value = 0;
	export let type = 'dec';
	
	let currText = value;
	let errText = '';
	
	$: {
		const newVal = getValue(type, currText)
		if (Number.isNaN(newVal)) {
			errText = 'Invalid input';
		} else {
			errText = '';
			if (!Object.is(newVal, value)) value = newVal;
		}
	}
	
	function parseHex(hex) {
		if (!/^[A-Fa-f0-9]+$/.test(hex)) return NaN;
		return parseInt(hex, 16);
	}
	function parseBin(bin) {
		if (!/^[01]+$/.test(bin)) return NaN;
		return parseInt(bin, 2);
	}
	function getValue(type, text) {
		if (type === 'hex') return parseHex(currText);
		if (type === 'bin') return parseBin(currText);
		return Number(text);
	}
	
	function getText(type, value) {
		if (type === 'hex') return value.toString(16);
		if (type === 'bin') return value.toString(2);
		return value;
	}
	
  function* cycle(arr) {
    while (true) {
      yield* arr;
    }
  }
	const typeIter = cycle(['hex', 'bin', 'dec']);
	function changeType() {
    type = typeIter.next().value;
    currText = getText(type, value);
	}
</script>

<style>
	p {
		margin: 0;
		color: red;
	}
</style>

<div>
	<input 
		class="styled" 
		style="--hue: 35" 
		type="text" 
		bind:value={currText} />
	<button 
		class="styled" 
		style="--hue: 35" 
		on:click={changeType}
	>{type}</button>	
</div>

<p>{errText}</p>

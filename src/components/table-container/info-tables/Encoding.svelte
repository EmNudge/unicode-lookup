<script lang="ts">
	import { encodingMode } from '$stores';
	import { getEncodings } from '$utils/char';

	export let codepoint: number;

	type EncodingType = 'hex' | 'bin' | 'dec';
	let encodingTypes: EncodingType[] = ['hex', 'bin', 'dec'];

	function getNumber(num: number, encoding: EncodingType, length: number) {
		if (encoding === 'hex') return `0x<b>${num.toString(16).padStart(length / 4, '0')}</b>`;
		if (encoding === 'bin') return `0b<b>${num.toString(2).padStart(length, '0')}</b>`;
		return `<b>${String(num)}</b>`;
	}

	$: encodings = getEncodings(codepoint);
	$: encodingsTable = [
		['UTF-8', encodings.utf8, 8],
		['UTF-16', encodings.utf16, 16],
		['UTF-32', encodings.utf32, 32]
	] as [string, Uint8Array | Uint16Array | Uint32Array, number][];
</script>

<br />
<table class="encoding-table">
	<thead>
		<tr>
			<th class="title">Encoding</th>
			<th>
        <div class="encoding-type">
          {#each encodingTypes as encoding}
            <button
              class:active={$encodingMode === encoding}
              on:click={() => ($encodingMode = encoding)}
            >
              {encoding}
            </button>
          {/each}
        </div>
			</th>
		</tr>
	</thead>

	<tbody>
		{#each encodingsTable as [name, bitSets, length]}
			<tr>
				<td>{name}</td>
				<td class="bit-sets">
					{#each bitSets as bitSet}
						<span>{@html getNumber(bitSet, $encodingMode, length)}</span>
					{/each}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.bit-sets span {
		padding: 0 3px;
	}
	.title {
		color: var(--label-col);
		font-weight: bold;
	}
  td {
    padding: 5px;
  }
	th:first-child {
		color: var(--primary-text);
		font-weight: 400;
		padding-right: 1rem;
	}
  tbody tr:nth-child(odd) {
    background-color: var(--bg-offset);
  }
	.encoding-type {
		display: flex;
	}
	.encoding-type button {
		opacity: 0.6;
		cursor: pointer;
    padding: 6px;
    border: none;
    background: 0;
    margin: 0;
		font-weight: 600;
	}
	.encoding-type button:focus {
		outline: 1px solid rgba(0, 0, 255, 0.443);
	}
	.encoding-type .active {
		opacity: 0.95;
		background-color: rgba(128, 128, 128, 0.097);;
	}
</style>

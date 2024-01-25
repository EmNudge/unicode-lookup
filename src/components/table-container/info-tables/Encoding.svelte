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
			<td class="title">Encoding</td>
			<td>
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
			</td>
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
	.active {
		font-weight: bold;
	}
	.title {
		color: var(--label-col);
		font-weight: bold;
	}
  td {
    padding: 5px;
  }
  tbody tr:nth-child(odd) {
    background-color: var(--bg-offset);
  }
	.encoding-type {
		display: flex;
		gap: 5px;
	}
	.encoding-type button {
		opacity: 0.6;
		cursor: pointer;
    padding: 0;
    border: none;
    background: 0;
    margin: 0;
	}
	.encoding-type .active {
		opacity: 0.95;
	}
</style>

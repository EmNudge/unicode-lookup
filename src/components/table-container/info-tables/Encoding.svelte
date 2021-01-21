<script lang="ts">
  import { encodingMode } from '../../../stores';
  import { getEncodings } from '../../../utils/char';
  
  export let codepoint: number;
  
  type EncodingType = 'hex' | 'bin' | 'dec';
  let encodingTypes: EncodingType[] = ['hex', 'bin', 'dec'];

  function getNumber(num: number, encoding: EncodingType, length: number) {
    if (encoding === 'hex') return `0x<b>${num.toString(16).padStart(length/4, '0')}</b>`;
    if (encoding === 'bin') return `0b<b>${num.toString(2).padStart(length, '0')}</b>`;
    return `<b>${String(num)}</b>`;
  }

  $: encodings = getEncodings(codepoint);
  $: encodingsTable = [
    ['UTF-8', encodings.utf8, 8],
    ['UTF-16', encodings.utf16, 16],
    ['UTF-32', encodings.utf32, 32],
  ] as [string, Uint8Array | Uint16Array | Uint32Array, number][];
</script>

<br />
<table class="encoding-table">
  <thead>
    <tr>
      <th class="title">Encoding</th>
      <th class="encoding-type">
        {#each encodingTypes as encoding}
          <span 
            class:active={$encodingMode === encoding}
            on:click={() => $encodingMode = encoding}
          >{encoding}</span>
        {/each}
      </th>
    </tr>
  </thead>
  
  <tbody>
    {#each encodingsTable as [name, bitSets, length]}
      <tr>
        <td>{name}</td>
        <td>
          {#each bitSets as bitSet}
            <span>{@html getNumber(bitSet, $encodingMode, length)}</span>
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  th {
    padding-right: 10px;
  }
  td:nth-child(2) {
    font-family: 'Courier New', Courier, monospace;
  }
  .active {
    font-weight: bold;
  }
  .title {
    color: #4B558C;
  }
  .encoding-type span {
    opacity: .6;
    cursor: pointer;
  }
  .encoding-type .active {
    opacity: .95;
  }

  .encoding-table td:last-child,  .encoding-table th:last-child {
    display: flex;
  }
  .encoding-table td:last-child span, .encoding-table th:last-child span {
    padding: 0 5px;
  }
</style>
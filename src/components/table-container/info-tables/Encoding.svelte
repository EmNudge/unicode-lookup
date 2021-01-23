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
<div class="encoding-table">
  <div class="title">Encoding</div>
  <div class="encoding-type">
    {#each encodingTypes as encoding}
      <span 
        class:active={$encodingMode === encoding}
        on:click={() => $encodingMode = encoding}
      >{encoding}</span>
    {/each}
  </div>

  {#each encodingsTable as [name, bitSets, length]}
    <div>{name}</div>
    <div>
      {#each bitSets as bitSet}
        <span>{@html getNumber(bitSet, $encodingMode, length)}</span>
      {/each}
    </div>
  {/each}
</div>

<style>
  .encoding-table {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
  }
  .active {
    font-weight: bold;
  }
  .title {
    color: #4B558C;
    font-weight: bold;
  }
  .encoding-type {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-gap: 5px;
  }
  .encoding-type span {
    opacity: .6;
    cursor: pointer;
  }
  .encoding-type .active {
    opacity: .95;
  }
</style>
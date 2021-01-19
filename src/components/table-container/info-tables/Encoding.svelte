<script lang="ts">
  import { encodingMode } from '../../../stores';
  
  export let codepoint: number;
  
  type EncodingType = 'hex' | 'bin' | 'dec';
  let encodingTypes: EncodingType[] = ['hex', 'bin', 'dec'];

  function getNumber(num: number, encoding: EncodingType) {
    if (encoding === 'hex') return '0x' + num.toString(16);
    if (encoding === 'bin') return '0b' + num.toString(2);
    return String(num);
  }

  $: char = String.fromCodePoint(codepoint);

  $: utf8 = new TextEncoder().encode(char);
  $: utf16 = [char.charCodeAt(0), char.charCodeAt(1)].filter(n => !Number.isNaN(n));
  $: utf32 = codepoint;
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
    <tr>
      <td>UTF-8</td>
      <td>
        {#each utf8 as byte}
          <span>{getNumber(byte, $encodingMode)}</span>
        {/each}  
      </td>
    </tr>
    <tr>
      <td>UTF-16</td>
      <td>
        {#each utf16 as num}
          <span>{getNumber(num, $encodingMode)}</span>
        {/each}  
      </td>
    </tr>
    <tr>
      <td>UTF-32</td>
      <td>
        <span>{getNumber(utf32, $encodingMode)}</span>
      </td>
    </tr>
  </tbody>
</table>

<style>
  th {
    padding-right: 10px;
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
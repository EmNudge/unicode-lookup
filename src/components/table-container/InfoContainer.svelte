<script lang="ts">  
  import { getPropertiesForChar, getPlaneForChar, getCodepointBlock } from '../../utils/unicode';
  import { blockLookupStore } from '../../stores';

  export let codepoint: number;
  export let name: string;

  $: charBlock = getCodepointBlock($blockLookupStore, codepoint);
  $: charBlockName = `(${charBlock.range[0]}-${charBlock.range[1]}) ${charBlock.name}`;

  const char = String.fromCodePoint(codepoint);
  const utf8 = new TextEncoder().encode(char);
  const utf16 = [char.charCodeAt(0), char.charCodeAt(1)].filter(Boolean);
  const utf32 = codepoint;

  let encodingTypes = ['hex', 'bin', 'dec'];
  let currEncoding = 'hex';

  function getNumber(num: number, encoding: string) {
    if (encoding === 'hex') return '0x' + num.toString(16);
    if (encoding === 'bin') return '0b' + num.toString(2);
    return String(num);
  }

  $: planeData = getPlaneForChar(char);
  $: planeName = planeData.name ? `(${planeData.number}) ${planeData.name}` : planeData.number;
</script>

<style>
  div {
    background: #a4b1c838;
    border-radius: 8px;
    padding: 20px;
  }

  td:first-child {
    font-weight: bold;
  }
  .active {
    font-weight: bold;
  }
  td, th {
    padding: 5px;
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

  .properties {
    display: grid;
		grid-template-rows: repeat(7, 1fr);
		grid-template-columns: 1fr 1fr;
		width: min-content;
		gap: 5px 40px;
		text-align: left;
  }

  h3 {
    padding: 5px;
    padding-bottom: 15px;
  }
</style>

<div class="container">
  <table>
    <tbody>
      <tr>
        <td>Name</td>
        <td>{name}</td>
      </tr>
      <tr>
        <td>Codepoint</td>
        <td>{codepoint}</td>
      </tr>
      <tr>
        <td>Plane</td>
        <td>{planeName}</td>
      </tr>
      <tr>
        <td>Block</td>
        <td>{charBlockName}</td>
      </tr>
    </tbody>
  </table>

  <br />

  <table class="encoding-table">
    <thead>
      <tr>
        <th class="title">Encoding</th>
        <th class="encoding-type">
          {#each encodingTypes as encoding}
            <span 
              class:active={currEncoding === encoding}
              on:click={() => currEncoding = encoding}
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
            <span>{getNumber(byte, currEncoding)}</span>
          {/each}  
        </td>
      </tr>
      <tr>
        <td>UTF-16</td>
        <td>
          {#each utf16 as num}
            <span>{getNumber(num, currEncoding)}</span>
          {/each}  
        </td>
      </tr>
      <tr>
        <td>UTF-32</td>
        <td>
          <span>{getNumber(utf32, currEncoding)}</span>
        </td>
      </tr>
    </tbody>
  </table>

  <br>

  <h3>Properties</h3>
  <div class="properties">
    {#each getPropertiesForChar(char) as property}
      <span>{property}</span>
    {/each}
  </div>
</div>
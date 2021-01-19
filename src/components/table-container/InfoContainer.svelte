<script lang="ts">  
  import { getPropertiesForChar, getPlaneForCodepoint, getCodepointBlock, Catetegory } from '../../utils/unicode';
  import { blockLookupStore } from '../../stores';
  import type { UnicodeCharInfo } from '../../worker/retrieval'

  import CaseMapping from './info-tables/CaseMapping.svelte';
  import Encoding from './info-tables/Encoding.svelte';
  import NumberEquiv from './info-tables/NumberEquiv.svelte';

  export let codepoint: number;
  export let name: string;
  export let info: UnicodeCharInfo;

  // @ts-ignore
  $: category = `${info.category} (${Catetegory[info.category]})`;

  $: charBlock = getCodepointBlock($blockLookupStore, codepoint);
  $: charBlockName = `(${charBlock.range[0]}-${charBlock.range[1]}) ${charBlock.name}`;

  $: planeData = getPlaneForCodepoint(codepoint);
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
  td {
    padding: 5px;
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

      {#if info.oldName && info.oldName !== name}
        <tr>
          <td>Old Name</td>
          <td>{info.oldName}</td>
        </tr>
      {/if}

      <tr>
        <td>Codepoint</td>
        <td>{codepoint}</td>
      </tr>
      <tr>
        <td>Category</td>
        <td>{category}</td>
      </tr>
      
      {#if info.decomposition}
        <tr>
          <td>Decomposition</td>
          <td>&lt;{info.decomposition.type}&gt; {info.decomposition.codepoints.join(' ')}</td>
        </tr>
      {/if}
      
      <tr>
        <td>Bidi Class</td>
        <td>{info.bidiClass}</td>
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
  <CaseMapping caseMapping={info.caseMapping} />
  <br />
  <NumberEquiv numberEquiv={info.numberEquivalent} />
  <br /> 
  <Encoding {codepoint} />
  <br />

  <h3>Properties</h3>
  <div class="properties">
    {#each getPropertiesForChar(String.fromCodePoint(codepoint)) as property}
      <span>{property}</span>
    {/each}
  </div>
</div>
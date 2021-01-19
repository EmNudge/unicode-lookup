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
  $: planeData = getPlaneForCodepoint(codepoint);

  const getIf = (cond: boolean, value: any) => cond ? [value] : [];

  $: decompText = info.decomposition != null 
    ? `<${info.decomposition.type}> ${info.decomposition.codepoints.join(' ')}`
    : '';
  
  $: baseInfo = [
    ['Name', name],
    ['Bidi Class', info.bidiClass],
    ...getIf(
      info.oldName && info.oldName !== name, 
      ['Old Name', info.oldName]
    ),
    ['Codepoint', codepoint],
    ['Category', category],
    ...getIf(
      info.decomposition != null,
      ['Decomposition', decompText]
    ),
    [
      'Plane', 
      planeData.name ? `${planeData.name} (Plane ${planeData.number}) ` : `Plane ${planeData.number}`
    ],
    [
      'Block', 
      `${charBlock.name} (Range ${charBlock.range[0]}-${charBlock.range[1]}) `
    ],
  ]
</script>

<style>
  div.container {
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
    padding-left: 8px;
  }

  h3 {
    padding: 5px;
    padding-bottom: 15px;
  }
</style>

<div class="container styled" style="--hue: 200">
  <table>
    <tbody>
      {#each baseInfo as [name, value]}
        <tr>
          <td>{name}</td>
          <td>{value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <CaseMapping caseMapping={info.caseMapping} />
  <NumberEquiv numberEquiv={info.numberEquivalent} />
  <Encoding {codepoint} />
  
  <br />
  <h3>Properties</h3>
  <div class="properties">
    {#each getPropertiesForChar(String.fromCodePoint(codepoint)) as property}
      <span>{property}</span>
    {/each}
  </div>
</div>
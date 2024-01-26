<script lang="ts">  
  import { getPropertiesForChar, getPlaneForCodepoint, getCodepointBlock, Catetegory } from '../../utils/unicode';
  import { blockLookupStore } from '$stores';

  import { BidiClassMap } from '../../worker/retrieval';
  import type { UnicodeCharInfo } from '../../worker/retrieval';

  import CaseMapping from './info-tables/CaseMapping.svelte';
  import Encoding from './info-tables/Encoding.svelte';
  import NumberEquiv from './info-tables/NumberEquiv.svelte';
  import HtmlEntities from './info-tables/HtmlEntities.svelte';

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
    // ['Name', name],
    ['Bidi Class', `${info.bidiClass} (${BidiClassMap.get(info.bidiClass)})`],
    ...getIf(
      Boolean(info.oldName && info.oldName !== name), 
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
  ];

  $: properties = getPropertiesForChar(String.fromCodePoint(codepoint));
</script>

<style>
  div.container {
    border-radius: 8px;
    padding: 20px;
  }
  .basic-info {
    display: grid;
  }
  td {
    padding: 5px;
  }
  td:nth-child(1) {
    font-weight: bold;
  }
  tr:nth-child(odd) {
    background-color: var(--bg-offset);
  }
  .properties {
    display: grid;
		grid-template-rows: repeat(var(--item-num), 1fr);
		grid-template-columns: 1fr 1fr;
		width: min-content;
		gap: 5px;
    text-align: left;    
    padding-left: 8px;
  }
  .properties span {
    background: var(--bg-offset);
    padding: 2px 8px;
    border-radius: 4px;
  }
  h1 {
    text-align: center;
  }

  h3 {
    padding: 5px;
    padding-bottom: 15px;
  }
  .display-box {
    background-color: var(--bg-offset);
    height: 64px;
    width: 64px;
    font-size: 3em;
    border: 1px solid grey;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px 0;
  }
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<div class="container" style="--item-num: {Math.ceil(properties.length / 2)}">
  <header>
    <h1>{name}</h1>
    <div class="display-box">
      <span>
        {String.fromCodePoint(codepoint)}
      </span>
    </div>
  </header>
  <table class="basic-info">
    <tbody>
      {#each baseInfo as [name, value]}
        <tr>
          <td>{name}</td>
          <td>{value}</td>
        </tr>
      {/each}
    </tbody>
    </table>
  
  <HtmlEntities {codepoint} names={info.htmlEntityNames} />
  <CaseMapping caseMapping={info.caseMapping} />
  <NumberEquiv numberEquiv={info.numberEquivalent} />
  <Encoding {codepoint} />
  
  <br />
  <h3>Properties</h3>
  <div class="properties">
    {#each properties as property}
      <span>{property}</span>
    {/each}
  </div>
</div>
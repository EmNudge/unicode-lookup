<script lang="ts">
  import type { UnicodeCharInfo } from '../../../worker/retrieval';

  export let caseMapping: UnicodeCharInfo["caseMapping"];

  $: caseMappings = Object.entries(caseMapping).filter(([_k,v]) => v) as [string, number][];
</script>

{#if caseMappings.length}
  <br />
  <table>
    <thead>
      <tr>
        <th class="title" colspan="2">Case Mapping</th>
      </tr>
    </thead>
    <tbody>
      {#each caseMappings as [key, value]}
        <tr>
          <td>{key}</td>
          <td>{String.fromCodePoint(value)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
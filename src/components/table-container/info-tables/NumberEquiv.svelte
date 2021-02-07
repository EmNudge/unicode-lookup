<script lang="ts">
  import type { UnicodeCharInfo } from '../../../worker/retrieval';

  export let numberEquiv: UnicodeCharInfo["numberEquivalent"];

  $: caseMappings = Object.entries(numberEquiv).filter(([_k,v]) => v) as [string, number | string][];
</script>

{#if caseMappings.length}
  <br />
  <table>
    <thead>
      <tr>
        <th class="title" colspan="2">Number Equivalent</th>
      </tr>
    </thead>
    <tbody>
      {#each caseMappings as [key, value]}
        <tr>
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
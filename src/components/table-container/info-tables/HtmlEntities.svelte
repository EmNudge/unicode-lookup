<script lang="ts">
  export let names: string[];
  export let codepoint: number;
</script>

<br />
<table>
  <thead>
    <tr>
      <th class="title" colspan="2">Html Entities</th>
    </tr>
  </thead>
  <tbody>
    {#each names as name}
      <tr>
        <td>Named</td>
        <td>&{name};</td>
      </tr>
    {/each}
    <tr>
      <td>Hex</td>
      <td>&#x{codepoint.toString(16).padStart(5, '0')};</td>
    </tr>
    <tr>
      <td>Dec</td>
      <td>&#{codepoint};</td>
    </tr>
  </tbody>
</table>

<style>
  td:first-child {
    padding-right: 30px;
  }
</style>
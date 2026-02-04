<script setup lang="ts">
interface Props {
  names: string[];
  codepoint: number;
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <br />
    <table>
      <thead>
        <tr>
          <th class="title" colspan="2">Html Entities</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="name in props.names" :key="name">
          <td>Named</td>
          <td>&amp;{{ name }};</td>
        </tr>
        <tr>
          <td>Hex</td>
          <td>&amp;#x{{ props.codepoint.toString(16).padStart(5, "0") }};</td>
        </tr>
        <tr>
          <td>Dec</td>
          <td>&amp;#{{ props.codepoint }};</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
th {
  text-align: left;
  color: var(--primary-text);
  font-weight: 400;
  padding-bottom: var(--space-2);
}
tbody tr:nth-child(odd) {
  background-color: var(--bg-offset);
}
td {
  padding: var(--space-2);
}
td:first-child {
  padding-right: var(--space-8);
}
</style>

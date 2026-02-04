<script setup lang="ts">
import { computed } from "vue";
import type { UnicodeMapData } from "@emnudge/unicode-query";

interface Props {
  titlecaseMapping: UnicodeMapData["titlecaseMapping"];
  uppercaseMapping: UnicodeMapData["uppercaseMapping"];
  lowercaseMapping: UnicodeMapData["lowercaseMapping"];
}

const props = defineProps<Props>();

const caseMappings = computed(
  () =>
    Object.entries({
      titlecaseMapping: props.titlecaseMapping,
      uppercaseMapping: props.uppercaseMapping,
      lowercaseMapping: props.lowercaseMapping,
    }).filter(([, v]) => v) as [string, number][],
);
</script>

<template>
  <template v-if="caseMappings.length">
    <br />
    <table>
      <thead>
        <tr>
          <th class="title" colspan="2">Case Mapping</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[key, value] in caseMappings" :key="key">
          <td>{{ key }}</td>
          <td>{{ String.fromCodePoint(value) }}</td>
        </tr>
      </tbody>
    </table>
  </template>
</template>

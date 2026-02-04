<script setup lang="ts">
import { computed } from "vue";
import type { UnicodeMapData } from "@emnudge/unicode-query";

interface Props {
  digitEquiv: UnicodeMapData["digitEquiv"];
  numericEquiv: UnicodeMapData["numericEquiv"];
  decimalEquiv: UnicodeMapData["decimalEquiv"];
}

const props = defineProps<Props>();

const numberMappings = computed(() =>
  Object.entries({
    digitEquiv: props.digitEquiv,
    numericEquiv: props.numericEquiv,
    decimalEquiv: props.decimalEquiv,
  }).filter(([, v]) => v),
);
</script>

<template>
  <template v-if="numberMappings.length">
    <br />
    <table>
      <thead>
        <tr>
          <th class="title" colspan="2">Number Equivalent</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[key, value] in numberMappings" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </template>
</template>

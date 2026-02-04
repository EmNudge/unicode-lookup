<script setup lang="ts">
import { computed } from "vue";
import {
  getPropertiesForChar,
  getPlaneForCodepoint,
  getCodepointBlock,
  Category,
  getDecompFromStr,
  BidiClassMap,
} from "$utils/unicode";
import { blockLookup, symbolHtmlNamesMap } from "$stores";

import CaseMapping from "./info-tables/CaseMapping.vue";
import Encoding from "./info-tables/Encoding.vue";
import NumberEquiv from "./info-tables/NumberEquiv.vue";
import HtmlEntities from "./info-tables/HtmlEntities.vue";
import Properties from "./info-tables/Properties.vue";
import type { UnicodeMapData } from "@emnudge/unicode-query";

interface Props {
  codepoint: number;
  name: string;
  info: UnicodeMapData;
}

const props = defineProps<Props>();

const category = computed(
  () => `${props.info.category} (${Category[props.info.category as keyof typeof Category]})`,
);
const charBlock = computed(() => getCodepointBlock(blockLookup.value, props.codepoint));
const planeData = computed(() => getPlaneForCodepoint(props.codepoint));

const decomposition = computed(() =>
  props.info.decompositionStr ? getDecompFromStr(props.info.decompositionStr) : null,
);
const decompText = computed(() =>
  decomposition.value != null
    ? `<${decomposition.value.type}> ${decomposition.value.codepoints.join(" ")}`
    : "",
);

const baseInfo = computed(
  () =>
    [
      ["Bidi Class", `${props.info.bidiClass} (${BidiClassMap.get(props.info.bidiClass)})`],
      !!props.info.oldName && props.info.oldName !== props.name && ["Old Name", props.info.oldName],
      ["Codepoint", props.codepoint],
      ["Category", category.value],
      !!decompText.value && ["Decomposition", decompText.value],
      [
        "Plane",
        planeData.value.name
          ? `${planeData.value.name} (Plane ${planeData.value.number}) `
          : `Plane ${planeData.value.number}`,
      ],
      [
        "Block",
        `${charBlock.value.name} (Range ${charBlock.value.range[0]}-${charBlock.value.range[1]}) `,
      ],
    ].filter(Boolean) as [string, string][],
);

const properties = computed(() => getPropertiesForChar(String.fromCodePoint(props.codepoint)));

const htmlEntityNames = computed(() => symbolHtmlNamesMap.value.get(props.codepoint) ?? []);
</script>

<template>
  <div class="container" :style="`--item-num: ${Math.ceil(properties.length / 2)}`">
    <header>
      <h1>{{ props.name }}</h1>
      <div class="display-box">
        <span>{{ String.fromCodePoint(props.codepoint) }}</span>
      </div>
    </header>
    <table class="basic-info">
      <tbody>
        <tr v-for="[name, value] in baseInfo" :key="name">
          <td>{{ name }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>

    <HtmlEntities :codepoint="props.codepoint" :names="htmlEntityNames" />
    <CaseMapping
      :lowercase-mapping="props.info.lowercaseMapping"
      :titlecase-mapping="props.info.titlecaseMapping"
      :uppercase-mapping="props.info.uppercaseMapping"
    />
    <NumberEquiv
      :digit-equiv="props.info.digitEquiv"
      :numeric-equiv="props.info.numericEquiv"
      :decimal-equiv="props.info.decimalEquiv"
    />
    <Encoding :codepoint="props.codepoint" />

    <br />
    <Properties :properties="properties" />
  </div>
</template>

<style scoped>
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
h1 {
  text-align: center;
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

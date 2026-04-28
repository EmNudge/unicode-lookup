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
    <dl class="basic-info">
      <div v-for="[name, value] in baseInfo" :key="name" class="info-item">
        <dt>{{ name }}</dt>
        <dd>{{ value }}</dd>
      </div>
    </dl>

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

    <Properties :properties="properties" />
  </div>
</template>

<style scoped>
div.container {
  border-radius: 0;
  padding: var(--space-6) var(--space-5) var(--space-16);
}
.basic-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
}
.info-item {
  background: var(--color-bg-offset);
  border-radius: var(--radius-lg);
  padding: var(--space-2) var(--space-3);
  border: 1px solid rgba(128, 128, 128, 0.1);
}
.info-item:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}
dt {
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}
dd {
  color: var(--color-text);
  margin: 0;
  word-break: break-word;
}
h1 {
  text-align: center;
  font-size: var(--font-size-lg);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--color-text);
}
.display-box {
  background-color: var(--color-bg-offset);
  height: 72px;
  width: 72px;
  font-size: 2.5em;
  border: 1px solid rgba(128, 128, 128, 0.15);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--space-4) 0;
}
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-4);
}
</style>

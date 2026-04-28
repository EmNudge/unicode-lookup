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
  <div v-if="caseMappings.length" class="case-section">
    <h3>Case Mapping</h3>
    <div class="case-cards">
      <div v-for="[key, value] in caseMappings" :key="key" class="case-card">
        <span class="case-char">{{ String.fromCodePoint(value) }}</span>
        <span class="case-label">{{ key }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.case-section {
  margin-top: var(--space-4);
}
h3 {
  padding-bottom: var(--space-3);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: 400;
  letter-spacing: 0.01em;
}
.case-cards {
  display: flex;
  gap: var(--space-2);
}
.case-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  background: var(--color-bg-offset);
  border: 1px solid rgba(128, 128, 128, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-5);
  min-width: 72px;
}
.case-char {
  font-size: var(--font-size-2xl);
  color: var(--color-text);
  line-height: 1;
}
.case-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: 500;
}
</style>

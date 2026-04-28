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
  <div v-if="numberMappings.length" class="number-section">
    <h3>Number Equivalent</h3>
    <div class="number-cards">
      <div v-for="[key, value] in numberMappings" :key="key" class="number-card">
        <span class="number-value">{{ value }}</span>
        <span class="number-label">{{ key }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.number-section {
  margin-top: var(--space-4);
}
h3 {
  padding-bottom: var(--space-3);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: 400;
  letter-spacing: 0.01em;
}
.number-cards {
  display: flex;
  gap: var(--space-2);
}
.number-card {
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
.number-value {
  font-size: var(--font-size-2xl);
  font-family: var(--font-family-mono);
  color: var(--color-text);
  line-height: 1;
}
.number-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: 500;
}
</style>

<script setup lang="ts">
interface Props {
  names: string[];
  codepoint: number;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="html-entities-section">
    <h3>HTML Entities</h3>
    <div class="chips">
      <span v-for="name in props.names" :key="name" class="chip">
        <span class="chip-label">Named</span>
        <code>&amp;{{ name }};</code>
      </span>
      <span class="chip">
        <span class="chip-label">Hex</span>
        <code>&amp;#x{{ props.codepoint.toString(16).padStart(5, "0") }};</code>
      </span>
      <span class="chip">
        <span class="chip-label">Dec</span>
        <code>&amp;#{{ props.codepoint }};</code>
      </span>
    </div>
  </div>
</template>

<style scoped>
.html-entities-section {
  margin-top: var(--space-4);
}
h3 {
  padding-bottom: var(--space-3);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: 400;
  letter-spacing: 0.01em;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.chip {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  background: var(--color-bg-offset);
  border: 1px solid rgba(128, 128, 128, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--space-2) var(--space-3);
}
.chip-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: 500;
}
.chip code {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text);
}
</style>

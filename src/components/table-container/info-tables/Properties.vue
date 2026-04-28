<script setup lang="ts">
interface Props {
  properties: string[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="properties-section">
    <h3>Properties</h3>
    <div class="properties">
      <span v-for="property in props.properties" :key="property">{{ property }}</span>
    </div>
  </div>
</template>

<style scoped>
.properties-section {
  margin-top: var(--space-4);
}
h3 {
  padding-bottom: var(--space-3);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: 400;
  letter-spacing: 0.01em;
}
.properties {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  text-align: left;
  margin-bottom: var(--space-6);
}
.properties span {
  background: var(--color-bg-offset);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  border: 1px solid rgba(128, 128, 128, 0.1);
}
</style>

<script setup lang="ts">
interface Props {
  properties: string[];
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <h3>Properties</h3>
    <div class="properties">
      <span v-for="property in props.properties" :key="property">{{ property }}</span>
    </div>
  </div>
</template>

<style scoped>
h3 {
  padding-bottom: var(--space-2);
  color: var(--primary-text);
  font-size: 1rem;
  font-weight: 400;
}
.properties {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  text-align: left;
  margin-bottom: var(--space-8);
}
.properties span {
  background: var(--bg-offset);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
}
</style>

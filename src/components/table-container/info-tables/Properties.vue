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
  padding-bottom: 6px;
  color: var(--primary-text);
  font-size: 1rem;
  font-weight: 400;
}
.properties {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  text-align: left;
}
.properties span {
  background: var(--bg-offset);
  padding: 2px 8px;
  border-radius: 4px;
}
</style>

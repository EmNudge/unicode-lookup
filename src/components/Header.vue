<script setup lang="ts">
import { searchMode } from "$stores";
import FilterIcon from "$icons/FilterIcon.vue";

function toggleSearchMode() {
  searchMode.value = searchMode.value === "advanced" ? "simple" : "advanced";
}
</script>

<template>
  <header>
    <div class="text">
      <h1>Unicode Lookup</h1>
      <h3 v-if="searchMode === 'simple'">Simple Search</h3>
      <h3 v-else>Advanced Search</h3>
    </div>

    <div class="buttons">
      <button :class="['styled', searchMode === 'advanced' && 'active']" @click="toggleSearchMode">
        <FilterIcon :active="searchMode === 'advanced'" />
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  margin: var(--space-8) auto var(--space-6);
  align-items: baseline;
}
h1 {
  font-size: 1.5em;
  font-weight: 400;
  letter-spacing: -0.025em;
}
h3 {
  font-weight: 300;
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  letter-spacing: 0.01em;
}
.text {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}
.buttons {
  display: flex;
}
button {
  cursor: pointer;
  margin: 0;
  z-index: 2;
  padding: var(--space-2) var(--space-4);
}
.active {
  color: var(--hsl-bg);
  background: var(--hsl);
}
</style>

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
  margin: var(--space-5) auto;
  display: flex;
  align-items: center;
}
h1 {
  font-size: 1.7em;
}
.buttons {
  display: flex;
}
button {
  cursor: pointer;
  margin: 0;
  z-index: 2;
  padding: var(--space-3) var(--space-5);
}
.active {
  color: var(--hsl-bg);
  background: var(--hsl);
  transition: 0.25s;
}
button:focus {
  outline: var(--border-width-2) solid var(--color-border-focus);
  outline-offset: var(--border-width-2);
}
</style>

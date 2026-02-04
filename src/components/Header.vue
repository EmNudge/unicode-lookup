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
  margin: 20px auto;
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
  padding: 10px 20px;
}
.active {
  color: var(--hsl-bg);
  background: var(--hsl);
  transition: 0.25s;
}
button:focus {
  border: 1px solid var(--hsl);
}
</style>

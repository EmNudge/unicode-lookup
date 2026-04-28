<script setup lang="ts">
import { searchMode } from "$stores";
import { openCommandPalette } from "$stores/commandPalette";
import FilterIcon from "$icons/FilterIcon.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";

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
      <button class="cmd-k-hint" @click="openCommandPalette">
        <kbd>⌘K</kbd>
      </button>
      <ThemeSwitcher />
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
  align-items: center;
  gap: var(--space-1);
}
button {
  cursor: pointer;
  margin: 0;
  z-index: 2;
  padding: var(--space-2) var(--space-4);
}
.cmd-k-hint {
  background: none;
  border: none;
  padding: var(--space-1) var(--space-2);
  opacity: 0.35;
  transition: opacity var(--duration-fast) var(--ease-out);
}
.cmd-k-hint:hover {
  opacity: 0.7;
}
.cmd-k-hint kbd {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  background: var(--color-bg-offset);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 2px var(--space-2);
}
.active {
  color: var(--hsl-bg);
  background: var(--hsl);
}
</style>

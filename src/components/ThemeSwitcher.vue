<script setup lang="ts">
import SunIcon from "$icons/SunIcon.vue";
import { useTheme } from "$src/composables/useTheme";

const { toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme">
    <SunIcon />
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
  margin: 0;
  background: none;
  border: none;
  padding: 0 var(--space-3);
  opacity: 0.5;
  transition: opacity var(--duration-fast) var(--ease-out);
}
button:hover {
  opacity: 0.8;
}
button:active {
  transform: scale(0.92);
}
</style>

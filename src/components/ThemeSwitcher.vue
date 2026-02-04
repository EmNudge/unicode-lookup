<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SunIcon from "$icons/SunIcon.vue";

const isDarkTheme = ref(false);

const updateTheme = (darkTheme: boolean) => {
  const newTheme = darkTheme ? "dark" : "light";
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem("color-scheme", newTheme);
};

const getColorSchemeLS = () => localStorage.getItem("color-scheme") as "dark" | "light" | null;

let colorSchemeMedia: MediaQueryList | null = null;
const onColorSchemeChange = (e: MediaQueryListEvent) => {
  if (getColorSchemeLS()) return;
  isDarkTheme.value = e.matches;
};

onMounted(() => {
  colorSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  colorSchemeMedia.addEventListener("change", onColorSchemeChange);

  const colorSchemeLS = getColorSchemeLS();
  if (colorSchemeLS) {
    isDarkTheme.value = colorSchemeLS === "dark";
  } else {
    const isSystemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    isDarkTheme.value = isSystemDarkTheme;
  }

  updateTheme(isDarkTheme.value);
});

onUnmounted(() => {
  colorSchemeMedia?.removeEventListener("change", onColorSchemeChange);
});

const toggleTheme = () => {
  const newValue = !isDarkTheme.value;
  isDarkTheme.value = newValue;
  updateTheme(newValue);
};
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
  padding: 0 10px;
  opacity: 0.6;
}
button:active {
  transform: scale(0.9);
}
</style>

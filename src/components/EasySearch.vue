<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { easySearch, isCommandPaletteOpen } from "$stores";
import { debounce } from "$utils/debounce";
import Input from "$lib/components/forms/Input.vue";

interface Props {
  onSearch?: () => void;
}

const props = defineProps<Props>();

const error = ref("");
const inputEl = ref<InstanceType<typeof Input> | null>(null);

const search = debounce(() => props.onSearch?.(), 100);

function hasRegexError(text: string) {
  const regexRes = text.match(/\/(.+?)\/([a-z]+)?/);
  if (!regexRes) return false;

  const [, regStr, flags] = regexRes;

  try {
    new RegExp(regStr!, flags);
    return false;
  } catch {
    return true;
  }
}

function trySearch() {
  if (hasRegexError(easySearch.value)) {
    error.value = "Regex Error. Please verify search text.";
    return;
  }
  error.value = "";
  search();
}

function getInputElement() {
  return inputEl.value?.$el?.querySelector("input") as HTMLInputElement | null;
}

function handleKeyDown(e: KeyboardEvent) {
  if (isCommandPaletteOpen.value) return;

  const input = getInputElement();
  const inputIsFocused = document.activeElement === input;
  if (inputIsFocused) return;

  if (e.key.length > 1 || /\p{C}/u.test(e.key)) return;
  if (e.ctrlKey || e.altKey || e.metaKey) return;

  if (e.key === " ") {
    e.preventDefault();
    return;
  }

  input?.focus();
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  easySearch.value = target.value;
  trySearch();
}

function handleSubmit(e: Event) {
  e.preventDefault();
  trySearch();
}
</script>

<template>
  <form @submit="handleSubmit">
    <Input
      ref="inputEl"
      type="text"
      placeholder="Search..."
      :model-value="easySearch"
      :error="error"
      full-width
      @input="handleInput"
    />
  </form>
</template>

<style scoped>
form {
  width: 100%;
}
</style>

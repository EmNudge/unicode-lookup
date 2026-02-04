<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { easySearch } from "$stores";
import { debounce } from "$utils/debounce";

interface Props {
  onSearch?: () => void;
}

const props = defineProps<Props>();

const error = ref("");
const inputEl = ref<HTMLInputElement | null>(null);

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

function handleKeyDown(e: KeyboardEvent) {
  const inputIsFocused = document.activeElement === inputEl.value;
  if (inputIsFocused) return;

  if (e.key.length > 1 || /\p{C}/u.test(e.key)) return;
  if (e.ctrlKey || e.altKey || e.metaKey) return;

  if (e.key === " ") {
    e.preventDefault();
    return;
  }

  inputEl.value?.focus();
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
    <input
      ref="inputEl"
      type="text"
      placeholder="Search..."
      :value="easySearch"
      @input="handleInput"
    />

    <template v-if="error">
      <br />
      <span style="color: red">{{ error }}</span>
    </template>
  </form>
</template>

<style scoped>
input {
  width: 90%;
  margin: 0 auto;
  border: 1px solid transparent;
  box-shadow: -3px 4px 2px #0000000f;
}
:root[data-theme="dark"] input {
  background-color: #151515;
  color: white;
  border: 1px solid #6b6b6b;
  box-shadow: 1px 1px 1px 2px #0000006e;
}
input::-webkit-input-placeholder {
  opacity: 0.5;
}
input:focus {
  outline: 1px solid #a5b5ff;
  box-shadow: -3px 4px 2px #894aff0f;
}
</style>

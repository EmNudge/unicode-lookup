<script setup lang="ts">
import { ref, watch } from "vue";
import { activeIndex } from "$stores";
import { getCodepoint } from "$utils/char";
import type { UnicodeMapData } from "@emnudge/unicode-query";

interface Props {
  codepoint: number;
  info: UnicodeMapData;
  index: number;
}

const props = defineProps<Props>();

const rowEl = ref<HTMLButtonElement | null>(null);

watch(activeIndex, (idx) => {
  if (idx === props.index) {
    rowEl.value?.focus();
  }
});

function handleClick() {
  activeIndex.value = props.index;
}

function handleContextMenu(e: MouseEvent) {
  e.preventDefault();
  navigator.clipboard.writeText(String.fromCodePoint(props.codepoint));
  rowEl.value?.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.95)" },
      { transform: "scale(1.02)" },
      { transform: "scale(1)" },
    ],
    {
      duration: 400,
      iterations: 1,
      easing: "ease-out",
    },
  );
}

const rowClass = ref("");

watch(
  () => activeIndex.value === props.index,
  (isActive) => {
    rowClass.value = isActive ? "row active" : "row";
  },
  { immediate: true },
);
</script>

<template>
  <button
    ref="rowEl"
    :class="rowClass"
    @click="handleClick"
    @contextmenu="handleContextMenu"
    tabindex="0"
    :data-codepoint="getCodepoint(props.codepoint)"
  >
    <div class="content">
      <div class="symbol">
        <span>{{ String.fromCodePoint(props.codepoint) }}</span>
      </div>

      <div class="name">
        <span>{{ props.info.label.toLowerCase() }}</span>
      </div>
    </div>
  </button>
</template>

<style scoped>
.row {
  border: 1px solid transparent;
  width: 100%;
  background-color: var(--bg-offset);
  position: relative;
}
.row:after {
  content: attr(data-codepoint);
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5rem;
  opacity: 0.5;
  font-size: 0.8rem;
}
.row.active {
  border: var(--border-width-1) solid var(--color-border-focus);
}
.content {
  width: 100%;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
}
.symbol {
  width: 2rem;
  text-align: center;
}
.symbol::before,
.symbol::after {
  content: '"';
}
.name {
  text-align: left;
  opacity: 0.75;
}
</style>

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
  background-color: var(--color-bg-offset);
  position: relative;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-1);
  transition:
    border-color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}
.row:hover {
  box-shadow: inset 0 0 0 1px var(--color-border);
}
.row:after {
  content: attr(data-codepoint);
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: var(--space-2) var(--space-3);
  color: var(--color-text-tertiary);
  opacity: 0.5;
  font-size: var(--font-size-xs);
  font-family: var(--font-family-mono);
  letter-spacing: 0.02em;
}
.row.active {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 2px rgba(123, 142, 230, 0.2);
}
.content {
  width: 100%;
  padding: var(--space-3) var(--space-3);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-4);
  align-items: center;
}
.symbol {
  width: 2rem;
  text-align: center;
  font-size: var(--font-size-lg);
}
.symbol::before,
.symbol::after {
  content: '"';
  opacity: 0.3;
}
.name {
  text-align: left;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  letter-spacing: 0.005em;
}
</style>

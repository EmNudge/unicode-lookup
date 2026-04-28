<script setup lang="ts">
import { computed } from "vue";
import { encodingMode } from "$stores";
import { getEncodings } from "$utils/char";

interface Props {
  codepoint: number;
}

const props = defineProps<Props>();

type EncodingType = "hex" | "bin" | "dec";
const encodingTypes: EncodingType[] = ["hex", "bin", "dec"];

function getNumber(num: number, encoding: EncodingType, length: number) {
  if (encoding === "hex") return `0x<b>${num.toString(16).padStart(length / 4, "0")}</b>`;
  if (encoding === "bin") return `0b<b>${num.toString(2).padStart(length, "0")}</b>`;
  return `<b>${String(num)}</b>`;
}

const encodings = computed(() => getEncodings(props.codepoint));

const encodingsTable = computed(() =>
  encodingMode.value === "dec"
    ? ([
        ["UTF-8", encodings.value.utf8, 8],
        ["UTF-16", encodings.value.utf16BE, 16],
      ] as [string, Uint8Array | Uint16Array, number][])
    : ([
        ["UTF-8", encodings.value.utf8, 8],
        ["UTF-16 BE", encodings.value.utf16BE, 16],
        ["UTF-16 LE", encodings.value.utf16LE, 16],
      ] as [string, Uint8Array | Uint16Array, number][]),
);

function setEncoding(encoding: EncodingType) {
  encodingMode.value = encoding;
}
</script>

<template>
  <div class="encoding-section">
    <div class="encoding-header">
      <h3>Encoding</h3>
      <div class="encoding-toggle">
        <button
          v-for="encoding in encodingTypes"
          :key="encoding"
          :class="{ active: encodingMode === encoding }"
          @click="setEncoding(encoding)"
        >
          {{ encoding }}
        </button>
      </div>
    </div>
    <div class="encoding-block">
      <div v-for="[name, bitSets, length] in encodingsTable" :key="name" class="encoding-line">
        <span class="encoding-label">{{ name }}</span>
        <span class="encoding-values">
          <span
            v-for="(bitSet, i) in Array.from(bitSets)"
            :key="i"
            v-html="getNumber(bitSet, encodingMode, length as number)"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.encoding-section {
  margin-top: var(--space-4);
}
.encoding-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}
h3 {
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: 400;
  letter-spacing: 0.01em;
}
.encoding-toggle {
  display: flex;
  gap: 2px;
  background: var(--color-bg-offset);
  border-radius: var(--radius-md);
  padding: 2px;
  border: 1px solid rgba(128, 128, 128, 0.1);
}
.encoding-toggle button {
  opacity: 0.5;
  cursor: pointer;
  padding: var(--space-1) var(--space-2);
  border: none;
  background: 0;
  margin: 0;
  font-weight: 500;
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
  transition:
    opacity var(--duration-fast),
    background var(--duration-fast);
}
.encoding-toggle button:hover {
  opacity: 0.8;
}
.encoding-toggle .active {
  opacity: 1;
  background-color: var(--color-bg-active);
}
.encoding-block {
  background: var(--color-bg-offset);
  border: 1px solid rgba(128, 128, 128, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--space-2) 0;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
}
.encoding-line {
  display: flex;
  padding: var(--space-1) var(--space-3);
  gap: var(--space-3);
}
.encoding-label {
  color: var(--color-text-secondary);
  min-width: 5.5em;
  flex-shrink: 0;
}
.encoding-values {
  color: var(--color-text);
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-1);
}
</style>

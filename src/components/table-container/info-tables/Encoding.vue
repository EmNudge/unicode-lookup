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
  <div>
    <br />
    <table class="encoding-table">
      <thead>
        <tr>
          <th class="title">Encoding</th>
          <th>
            <div class="encoding-type">
              <button
                v-for="encoding in encodingTypes"
                :key="encoding"
                :class="{ active: encodingMode === encoding }"
                @click="setEncoding(encoding)"
              >
                {{ encoding }}
              </button>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="[name, bitSets, length] in encodingsTable" :key="name">
          <td>{{ name }}</td>
          <td class="bit-sets">
            <span
              v-for="(bitSet, i) in Array.from(bitSets)"
              :key="i"
              v-html="getNumber(bitSet, encodingMode, length as number)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.bit-sets span {
  padding: 0 3px;
}
.title {
  color: var(--label-col);
  font-weight: bold;
}
td {
  padding: var(--space-2);
}
th:first-child {
  color: var(--primary-text);
  font-weight: 400;
  padding-right: var(--space-4);
}
tbody tr:nth-child(odd) {
  background-color: var(--bg-offset);
}
.encoding-type {
  display: flex;
}
.encoding-type button {
  opacity: 0.6;
  cursor: pointer;
  padding: var(--space-2);
  border: none;
  background: 0;
  margin: 0;
  font-weight: 600;
}
.encoding-type button:focus {
  outline: var(--border-width-2) solid var(--color-border-focus);
  outline-offset: var(--border-width-2);
}
.encoding-type .active {
  opacity: 0.95;
  background-color: var(--color-bg-active);
}
</style>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  modelValue?: number;
  type?: "dec" | "hex" | "bin";
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  type: "dec",
});

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

function parseHex(hex: string) {
  if (!/^[A-Fa-f0-9]+$/.test(hex)) return NaN;
  return parseInt(hex, 16);
}

function parseBin(bin: string) {
  if (!/^[01]+$/.test(bin)) return NaN;
  return parseInt(bin, 2);
}

function getValue(t: string, text: string | number) {
  if (t === "hex") return parseHex(String(text));
  if (t === "bin") return parseBin(String(text));
  return Number(text);
}

function getText(t: string, value: number) {
  if (t === "hex") return value.toString(16);
  if (t === "bin") return value.toString(2);
  return String(value);
}

function* cycle<T>(arr: T[]) {
  while (true) {
    yield* arr;
  }
}

const currText = ref<string | number>(props.modelValue ?? 0);
const errText = ref("");
const type = ref<"dec" | "hex" | "bin">(props.type ?? "dec");

const typeIter = cycle(["hex", "bin", "dec"] as const);

watch(
  [currText, type],
  ([text, t]) => {
    const newVal = getValue(t, text);
    if (Number.isNaN(newVal)) {
      errText.value = "Invalid input";
    } else {
      errText.value = "";
      emit("update:modelValue", newVal);
    }
  },
  { immediate: true },
);

function changeType() {
  const nextType = typeIter.next().value;
  if (nextType) {
    const currentVal = getValue(type.value, currText.value);
    type.value = nextType;
    if (!Number.isNaN(currentVal)) {
      currText.value = getText(nextType, currentVal);
    }
  }
}

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  currText.value = target.value;
}
</script>

<template>
  <div>
    <div>
      <input class="styled" style="--hue: 35" type="text" :value="currText" @input="handleInput" />
      <button class="styled" style="--hue: 35" @click="changeType">
        {{ type }}
      </button>
    </div>
    <p>{{ errText }}</p>
  </div>
</template>

<style scoped>
p {
  margin: 0;
  color: red;
}
</style>

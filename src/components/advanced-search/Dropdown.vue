<script setup lang="ts">
import { computed } from "vue";

interface Props {
  hue?: number;
  options?: string[];
  modelValue?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hue: 111,
  options: () => ["Dropdown"],
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const style = computed(() => `--hue: ${props.hue}`);

function handleChange(e: Event) {
  const target = e.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <select
    :disabled="props.disabled"
    class="styled"
    :style="style"
    :value="props.modelValue"
    @change="handleChange"
  >
    <option v-for="option in props.options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<style scoped>
select {
  box-shadow: none;
  cursor: pointer;
  font-weight: 400;
}
select:disabled {
  opacity: 0.6;
  cursor: auto;
}
</style>

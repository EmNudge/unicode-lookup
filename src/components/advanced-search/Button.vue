<script setup lang="ts">
import { computed } from "vue";

interface Props {
  hue?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hue: 170,
});

const emit = defineEmits<{
  click: [];
}>();

const style = computed(() => `--hue: ${props.hue}`);
const btnClass = computed(() => ["styled", props.disabled && "disabled"].filter(Boolean).join(" "));
</script>

<template>
  <button :class="btnClass" :style="style" :disabled="props.disabled" @click="emit('click')">
    <slot />
  </button>
</template>

<style scoped>
button {
  margin: 0;
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-lg);
  box-shadow: none;
  cursor: pointer;
  font-weight: 400;
}
button:active {
  transform: scale(0.97);
}
.disabled {
  border: 1px solid hsl(var(--hue), 40%, 75%);
  color: hsl(var(--hue), 40%, 75%);
  cursor: auto;
  opacity: 0.6;
}
</style>

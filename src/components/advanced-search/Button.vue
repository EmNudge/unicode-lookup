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
  padding: 5px 15px;
  border-radius: 4px;
  box-shadow: 0px 4px 3px 0px #00000017;
  cursor: pointer;
}
button:focus,
button:active {
  color: var(--hsl);
  border: 1px solid var(--hsl);
  background: hsl(var(--hue), 100%, 95%);
}
button:active {
  background: hsl(var(--hue), 70%, 95%);
  transform: scale(0.95);
}
.disabled {
  border: 1px solid hsl(var(--hue), 40%, 75%);
  color: hsl(var(--hue), 40%, 75%);
  cursor: auto;
}
</style>

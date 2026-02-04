<script setup lang="ts">
import { computed } from "vue";

type SizeValue = "sm" | "base" | "lg";

interface Props {
  modelValue?: boolean;
  disabled?: boolean;
  label?: string;
  size?: SizeValue;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  size: "base",
});

const emit = defineEmits<{
  "update:modelValue": [checked: boolean];
}>();

const trackClass = computed(() =>
  ["switch-track", `switch-track--${props.size}`, props.modelValue && "switch-track--checked"]
    .filter(Boolean)
    .join(" "),
);

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
}
</script>

<template>
  <label :class="['switch-label', props.disabled && 'switch-label--disabled']">
    <input
      type="checkbox"
      class="switch-input"
      :checked="props.modelValue"
      :disabled="props.disabled"
      @change="handleChange"
    />
    <span :class="trackClass">
      <span :class="['switch-thumb', `switch-thumb--${props.size}`]" />
    </span>
    <span v-if="props.label" class="switch-text">{{ props.label }}</span>
  </label>
</template>

<style scoped>
.switch-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
}
.switch-label--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.switch-track {
  position: relative;
  display: inline-block;
  background: var(--color-border);
  border-radius: var(--radius-full);
  transition: var(--transition-colors);
  flex-shrink: 0;
}
.switch-track--sm {
  width: 2rem;
  height: 1rem;
}
.switch-track--base {
  width: 2.5rem;
  height: 1.25rem;
}
.switch-track--lg {
  width: 3rem;
  height: 1.5rem;
}
.switch-input:focus-visible + .switch-track {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
.switch-track--checked {
  background: var(--color-primary);
}
.switch-thumb {
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  background: white;
  border-radius: var(--radius-full);
  transition: transform var(--duration-base) var(--ease-out);
  box-shadow: var(--shadow-xs);
}
.switch-thumb--sm {
  width: 0.75rem;
  height: 0.75rem;
}
.switch-thumb--base {
  width: 1rem;
  height: 1rem;
}
.switch-thumb--lg {
  width: 1.25rem;
  height: 1.25rem;
}
.switch-input:checked + .switch-track--sm .switch-thumb {
  transform: translateX(1rem);
}
.switch-input:checked + .switch-track--base .switch-thumb {
  transform: translateX(1.25rem);
}
.switch-input:checked + .switch-track--lg .switch-thumb {
  transform: translateX(1.5rem);
}
.switch-text {
  color: var(--color-text);
  font-size: var(--font-size-base);
}
</style>

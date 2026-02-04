<script setup lang="ts">
interface Props {
  value: string | number;
  name: string;
  modelValue?: string | number;
  disabled?: boolean;
  label?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();

function handleChange() {
  emit("update:modelValue", props.value);
}
</script>

<template>
  <label :class="['radio-label', props.disabled && 'radio-label--disabled']">
    <input
      type="radio"
      class="radio-input"
      :name="props.name"
      :value="props.value"
      :checked="props.modelValue === props.value"
      :disabled="props.disabled"
      @change="handleChange"
    />
    <span class="radio-box">
      <span class="radio-dot" />
    </span>
    <span v-if="props.label" class="radio-text">{{ props.label }}</span>
  </label>
</template>

<style scoped>
.radio-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;
}
.radio-label--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.radio-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: var(--border-width-2) solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-bg-input);
  transition: var(--transition-colors);
  flex-shrink: 0;
}
.radio-input:focus-visible + .radio-box {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
.radio-label:hover .radio-box {
  border-color: var(--color-primary);
}
.radio-input:checked ~ .radio-box {
  border-color: var(--color-primary);
}
.radio-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  transform: scale(0);
  transition: transform var(--duration-base) var(--ease-out);
}
.radio-input:checked ~ .radio-box .radio-dot {
  transform: scale(1);
}
.radio-text {
  color: var(--color-text);
  font-size: var(--font-size-base);
}
</style>

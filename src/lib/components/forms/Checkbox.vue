<script setup lang="ts">
import { computed, ref, watch } from "vue";

interface Props {
  modelValue?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string | boolean;
  indeterminate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits<{
  "update:modelValue": [checked: boolean];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const hasError = computed(() => (typeof props.error === "string" ? !!props.error : props.error));

watch(
  () => props.indeterminate,
  (val) => {
    if (inputRef.value) {
      inputRef.value.indeterminate = val ?? false;
    }
  },
  { immediate: true },
);

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
}
</script>

<template>
  <div class="checkbox-wrapper">
    <label :class="['checkbox-label', props.disabled && 'checkbox-label--disabled']">
      <input
        ref="inputRef"
        type="checkbox"
        class="checkbox-input"
        :checked="props.modelValue"
        :disabled="props.disabled"
        :aria-invalid="hasError"
        @change="handleChange"
      />
      <span :class="['checkbox-box', hasError && 'checkbox-box--error']">
        <svg
          v-if="props.modelValue || props.indeterminate"
          class="checkbox-icon"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            v-if="props.indeterminate"
            d="M4 8h8"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            v-else
            d="M3 8l3 3 7-7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span v-if="props.label" class="checkbox-text">{{ props.label }}</span>
    </label>
    <span v-if="typeof props.error === 'string' && props.error" class="checkbox-error">{{
      props.error
    }}</span>
  </div>
</template>

<style scoped>
.checkbox-wrapper {
  display: inline-flex;
  flex-direction: column;
  gap: var(--space-1);
}
.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;
}
.checkbox-label--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.checkbox-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: var(--border-width-2) solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-input);
  transition: var(--transition-colors);
  flex-shrink: 0;
}
.checkbox-input:focus-visible + .checkbox-box {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
.checkbox-input:checked + .checkbox-box {
  background: var(--color-primary);
  border-color: var(--color-primary);
}
.checkbox-input:indeterminate + .checkbox-box {
  background: var(--color-primary);
  border-color: var(--color-primary);
}
.checkbox-label:hover .checkbox-box:not(.checkbox-box--error) {
  border-color: var(--color-primary);
}
.checkbox-box--error {
  border-color: var(--color-error-border);
}
.checkbox-icon {
  width: 1rem;
  height: 1rem;
  color: white;
}
.checkbox-text {
  color: var(--color-text);
  font-size: var(--font-size-base);
}
.checkbox-error {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-left: calc(1.25rem + var(--space-2));
}
</style>

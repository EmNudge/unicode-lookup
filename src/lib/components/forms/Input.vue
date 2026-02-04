<script setup lang="ts">
import { computed, type InputHTMLAttributes } from "vue";

type TypeValue = "text" | "email" | "password" | "number" | "search" | "tel" | "url";
type SizeValue = "sm" | "base" | "lg";

interface Props {
  modelValue?: string;
  type?: TypeValue;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string | boolean;
  size?: SizeValue;
  fullWidth?: boolean;
  hue?: number;
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  size: "base",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  input: [e: Event];
  focus: [e: FocusEvent];
  blur: [e: FocusEvent];
}>();

const hasError = computed(() => (typeof props.error === "string" ? !!props.error : props.error));

const classes = computed(() =>
  [
    "input",
    props.hue !== undefined ? "styled" : "input--default",
    `input--${props.size}`,
    hasError.value && "input--error",
    props.fullWidth && "input--full-width",
    props.disabled && "input--disabled",
  ]
    .filter(Boolean)
    .join(" "),
);

const style = computed(() => (props.hue !== undefined ? `--hue: ${props.hue}` : undefined));

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
  emit("input", e);
}
</script>

<template>
  <div class="input-wrapper">
    <input
      :class="classes"
      :style="style"
      :value="props.modelValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :autocomplete="props.autocomplete"
      :aria-invalid="hasError"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <span v-if="typeof props.error === 'string' && props.error" class="input-error">{{
      props.error
    }}</span>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: inline-flex;
  flex-direction: column;
  gap: var(--space-1);
  width: auto;
}
.input-wrapper:has(.input--full-width) {
  width: 100%;
}
.input {
  margin: 0;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  border: var(--border-width-1) solid var(--color-border);
  background: var(--color-bg-input);
  color: var(--color-text);
  font-family: var(--font-family-base);
  transition: var(--transition-colors);
  box-sizing: border-box;
}
.input::placeholder {
  color: var(--color-text-tertiary);
  opacity: 0.6;
}
.input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: var(--shadow-input-focus);
}
.input--default:hover:not(:disabled):not(:focus) {
  border-color: var(--color-text-secondary);
}
.input--sm {
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-sm);
  height: var(--size-input-height-sm);
}
.input--base {
  height: var(--size-input-height-base);
}
.input--lg {
  padding: var(--space-3) var(--space-5);
  font-size: var(--font-size-lg);
  height: var(--size-input-height-lg);
}
.input--error {
  border-color: var(--color-error-border);
}
.input--error:focus {
  border-color: var(--color-error);
}
.input-error {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-top: var(--space-1);
}
.input--full-width {
  width: 100%;
}
.input:disabled,
.input--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--color-bg-offset);
}
.input.styled {
  color: var(--hsl);
  background: var(--hsl-bg);
  border-color: var(--hsl);
}
.input.styled:focus {
  border-color: var(--hsl);
  box-shadow: var(--shadow-input-focus);
}
</style>

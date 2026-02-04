<script setup lang="ts">
import { computed } from "vue";

type OptionValue = string | number;
type Option = { value: OptionValue; label: string };
type SizeValue = "sm" | "base" | "lg";

interface Props {
  modelValue?: string | number;
  options: Option[] | string[] | number[];
  placeholder?: string;
  disabled?: boolean;
  error?: string | boolean;
  size?: SizeValue;
  fullWidth?: boolean;
  hue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: "base",
});

const emit = defineEmits<{
  "update:modelValue": [value: OptionValue];
}>();

const normalizedOptions = computed(() =>
  props.options.map((opt) => {
    if (typeof opt === "object" && "value" in opt && "label" in opt) {
      return opt;
    }
    return { value: opt, label: String(opt) };
  }),
);

const hasError = computed(() => (typeof props.error === "string" ? !!props.error : props.error));

const classes = computed(() =>
  [
    "select",
    props.hue !== undefined ? "styled" : "select--default",
    `select--${props.size}`,
    hasError.value && "select--error",
    props.fullWidth && "select--full-width",
    props.disabled && "select--disabled",
  ]
    .filter(Boolean)
    .join(" "),
);

const style = computed(() => (props.hue !== undefined ? `--hue: ${props.hue}` : undefined));

function handleChange(e: Event) {
  const target = e.target as HTMLSelectElement;
  const selectedValue = target.value;

  if (props.options.length > 0 && typeof props.options[0] === "number") {
    emit("update:modelValue", Number(selectedValue));
  } else {
    emit("update:modelValue", selectedValue);
  }
}
</script>

<template>
  <div class="select-wrapper">
    <select
      :class="classes"
      :style="style"
      :value="props.modelValue"
      :disabled="props.disabled"
      :aria-invalid="hasError"
      @change="handleChange"
    >
      <option v-if="props.placeholder" value="" disabled :selected="props.modelValue === ''">
        {{ props.placeholder }}
      </option>
      <option v-for="option in normalizedOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span v-if="typeof props.error === 'string' && props.error" class="select-error">{{
      props.error
    }}</span>
  </div>
</template>

<style scoped>
.select-wrapper {
  display: inline-flex;
  flex-direction: column;
  gap: var(--space-1);
  width: auto;
}
.select {
  margin: 0;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  border: var(--border-width-1) solid var(--color-border);
  background: var(--color-bg-input);
  color: var(--color-text);
  font-family: var(--font-family-base);
  transition: var(--transition-colors);
  box-sizing: border-box;
  cursor: pointer;
}
.select:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: var(--shadow-input-focus);
}
.select--default:hover:not(:disabled):not(:focus) {
  border-color: var(--color-text-secondary);
}
.select--sm {
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-sm);
  height: var(--size-input-height-sm);
}
.select--base {
  height: var(--size-input-height-base);
}
.select--lg {
  padding: var(--space-3) var(--space-5);
  font-size: var(--font-size-lg);
  height: var(--size-input-height-lg);
}
.select--error {
  border-color: var(--color-error-border);
}
.select--error:focus {
  border-color: var(--color-error);
}
.select-error {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-top: var(--space-1);
}
.select--full-width {
  width: 100%;
}
.select:disabled,
.select--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--color-bg-offset);
}
.select.styled {
  color: var(--hsl);
  background: var(--hsl-bg);
  border-color: var(--hsl);
}
.select.styled:focus {
  border-color: var(--hsl);
  box-shadow: var(--shadow-input-focus);
}
option {
  background: var(--color-bg-input);
  color: var(--color-text);
}
</style>

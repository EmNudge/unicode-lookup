<script setup lang="ts">
import { computed } from "vue";

type ResizeValue = "none" | "vertical" | "horizontal" | "both";

interface Props {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string | boolean;
  rows?: number;
  resize?: ResizeValue;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  rows: 4,
  resize: "vertical",
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
    "textarea",
    hasError.value && "textarea--error",
    props.fullWidth && "textarea--full-width",
    props.disabled && "textarea--disabled",
    `textarea--resize-${props.resize}`,
  ]
    .filter(Boolean)
    .join(" "),
);

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
  emit("input", e);
}
</script>

<template>
  <div class="textarea-wrapper">
    <textarea
      :class="classes"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :rows="props.rows"
      :aria-invalid="hasError"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <span v-if="typeof props.error === 'string' && props.error" class="textarea-error">{{
      props.error
    }}</span>
  </div>
</template>

<style scoped>
.textarea-wrapper {
  display: inline-flex;
  flex-direction: column;
  gap: var(--space-1);
  width: auto;
}
.textarea {
  margin: 0;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: var(--border-width-1) solid var(--color-border);
  background: var(--color-bg-input);
  color: var(--color-text);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  transition: var(--transition-colors);
  box-sizing: border-box;
  min-height: 5rem;
}
.textarea::placeholder {
  color: var(--color-text-tertiary);
  opacity: 0.6;
}
.textarea:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: var(--shadow-input-focus);
}
.textarea:hover:not(:disabled):not(:focus) {
  border-color: var(--color-text-secondary);
}
.textarea--resize-none {
  resize: none;
}
.textarea--resize-vertical {
  resize: vertical;
}
.textarea--resize-horizontal {
  resize: horizontal;
}
.textarea--resize-both {
  resize: both;
}
.textarea--error {
  border-color: var(--color-error-border);
}
.textarea--error:focus {
  border-color: var(--color-error);
}
.textarea-error {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-top: var(--space-1);
}
.textarea--full-width {
  width: 100%;
}
.textarea:disabled,
.textarea--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--color-bg-offset);
}
</style>

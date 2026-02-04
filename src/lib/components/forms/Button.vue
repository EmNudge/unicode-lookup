<script setup lang="ts">
import { computed } from "vue";

type VariantValue = "primary" | "secondary" | "ghost" | "outline" | "danger";
type SizeValue = "sm" | "base" | "lg";
type TypeValue = "button" | "submit" | "reset";

interface Props {
  variant?: VariantValue;
  size?: SizeValue;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  hue?: number;
  type?: TypeValue;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "base",
  type: "button",
});

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();

const classes = computed(() =>
  [
    "btn",
    props.hue !== undefined ? "styled" : `btn--${props.variant}`,
    `btn--${props.size}`,
    props.fullWidth && "btn--full-width",
    (props.disabled || props.loading) && "btn--disabled",
  ]
    .filter(Boolean)
    .join(" "),
);

const style = computed(() => (props.hue !== undefined ? `--hue: ${props.hue}` : undefined));
</script>

<template>
  <button
    :class="classes"
    :style="style"
    :type="props.type"
    :disabled="props.disabled || props.loading"
    @click="emit('click', $event)"
  >
    <span v-if="props.loading" class="btn__spinner" />
    <span :class="props.loading ? 'btn__content btn__content--loading' : 'btn__content'">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.btn {
  margin: 0;
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-colors), var(--transition-transform);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  position: relative;
  border: var(--border-width-1) solid transparent;
}
.btn:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
.btn--primary {
  color: var(--color-primary);
  background: var(--color-primary-bg);
  border-color: var(--color-primary);
}
.btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
  filter: brightness(0.95);
}
.btn--primary:active:not(:disabled) {
  transform: scale(0.98);
}
.btn--secondary {
  color: var(--color-text);
  background: var(--color-bg-offset);
  border-color: var(--color-border);
}
.btn--secondary:hover:not(:disabled) {
  background: var(--color-bg-elevated);
  border-color: var(--color-text-secondary);
}
.btn--secondary:active:not(:disabled) {
  transform: scale(0.98);
}
.btn--ghost {
  color: var(--color-text-primary);
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}
.btn--ghost:hover:not(:disabled) {
  background: var(--color-bg-offset);
}
.btn--ghost:active:not(:disabled) {
  transform: scale(0.98);
}
.btn--outline {
  color: var(--color-primary);
  background: transparent;
  border-color: var(--color-primary);
  box-shadow: none;
}
.btn--outline:hover:not(:disabled) {
  background: var(--color-primary-bg);
}
.btn--outline:active:not(:disabled) {
  transform: scale(0.98);
}
.btn--danger {
  color: white;
  background: var(--color-error);
  border-color: var(--color-error);
}
.btn--danger:hover:not(:disabled) {
  filter: brightness(1.1);
}
.btn--danger:active:not(:disabled) {
  transform: scale(0.98);
}
.btn--sm {
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-sm);
}
.btn--lg {
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-lg);
}
.btn--full-width {
  width: 100%;
}
.btn:disabled,
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.btn__content--loading {
  opacity: 0.7;
}
.btn.styled {
  color: var(--hsl);
  background: var(--hsl-bg);
  border-color: var(--hsl);
}
.btn.styled:hover:not(:disabled) {
  filter: brightness(0.95);
}
.btn.styled:active:not(:disabled) {
  transform: scale(0.98);
}
</style>

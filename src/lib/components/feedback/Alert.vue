<script setup lang="ts">
import { computed } from "vue";

type VariantValue = "info" | "success" | "warning" | "error";

interface Props {
  variant?: VariantValue;
  title?: string;
  dismissible?: boolean;
  icon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "info",
  icon: true,
});

const emit = defineEmits<{
  close: [];
}>();

const icons: Record<VariantValue, string> = {
  info: "\u2139",
  success: "\u2713",
  warning: "\u26A0",
  error: "\u2715",
};
</script>

<template>
  <div :class="['alert', `alert--${props.variant}`]" role="alert">
    <div v-if="props.icon !== false" class="alert__icon">{{ icons[props.variant] }}</div>

    <div class="alert__content">
      <div v-if="props.title" class="alert__title">{{ props.title }}</div>
      <div class="alert__message">
        <slot />
      </div>
    </div>

    <button
      v-if="props.dismissible"
      class="alert__close"
      aria-label="Close"
      type="button"
      @click="emit('close')"
    >
      &#x2715;
    </button>
  </div>
</template>

<style scoped>
.alert {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: var(--border-width-1) solid;
}
.alert--info {
  background: var(--color-info-bg);
  color: var(--color-info);
  border-color: var(--color-info-border);
}
.alert--success {
  background: var(--color-success-bg);
  color: var(--color-success);
  border-color: var(--color-success-border);
}
.alert--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
  border-color: var(--color-warning-border);
}
.alert--error {
  background: var(--color-error-bg);
  color: var(--color-error);
  border-color: var(--color-error-border);
}
.alert__icon {
  flex-shrink: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}
.alert__content {
  flex: 1;
  min-width: 0;
}
.alert__title {
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-1);
}
.alert__message {
  font-size: var(--font-size-base);
}
.alert__close {
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity var(--duration-base);
  color: inherit;
  font-size: var(--font-size-lg);
  line-height: 1;
}
.alert__close:hover {
  opacity: 1;
}
</style>

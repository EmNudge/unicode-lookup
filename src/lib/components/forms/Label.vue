<script setup lang="ts">
import { computed } from "vue";

type SizeValue = "sm" | "base" | "lg";

interface Props {
  for?: string;
  required?: boolean;
  optional?: boolean;
  size?: SizeValue;
}

const props = withDefaults(defineProps<Props>(), {
  size: "base",
});

const classes = computed(() => ["label", `label--${props.size}`].join(" "));
</script>

<template>
  <label :for="props.for" :class="classes">
    <slot />
    <span
      v-if="props.required"
      class="label-indicator label-indicator--required"
      aria-label="required"
    >
      *
    </span>
    <span
      v-if="!props.required && props.optional"
      class="label-indicator label-indicator--optional"
      aria-label="optional"
    >
      (optional)
    </span>
  </label>
</template>

<style scoped>
.label {
  display: block;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-1);
}
.label--sm {
  font-size: var(--font-size-sm);
}
.label--base {
  font-size: var(--font-size-base);
}
.label--lg {
  font-size: var(--font-size-lg);
}
.label-indicator {
  margin-left: var(--space-1);
}
.label-indicator--required {
  color: var(--color-error);
}
.label-indicator--optional {
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-normal);
  font-size: var(--font-size-sm);
}
</style>

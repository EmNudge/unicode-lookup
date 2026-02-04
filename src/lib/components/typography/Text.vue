<script setup lang="ts">
import { computed } from "vue";

type AsValue = "p" | "span" | "div" | "label";
type SizeValue = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type WeightValue = "normal" | "medium" | "semibold" | "bold";
type ColorValue = "base" | "secondary" | "tertiary" | "primary" | "error" | "success";
type AlignValue = "left" | "center" | "right";

interface Props {
  as?: AsValue;
  size?: SizeValue;
  weight?: WeightValue;
  color?: ColorValue;
  align?: AlignValue;
  truncate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "p",
  size: "base",
  weight: "normal",
  color: "base",
  align: "left",
});

const classes = computed(() =>
  [
    "text",
    `text--size-${props.size}`,
    `text--weight-${props.weight}`,
    `text--color-${props.color}`,
    `text--align-${props.align}`,
    props.truncate && "text--truncate",
  ]
    .filter(Boolean)
    .join(" "),
);
</script>

<template>
  <component :is="props.as" :class="classes">
    <slot />
  </component>
</template>

<style scoped>
.text {
  margin: 0;
  font-family: var(--font-family-base);
  line-height: var(--line-height-normal);
}
.text--size-xs {
  font-size: var(--font-size-xs);
}
.text--size-sm {
  font-size: var(--font-size-sm);
}
.text--size-base {
  font-size: var(--font-size-base);
}
.text--size-lg {
  font-size: var(--font-size-lg);
}
.text--size-xl {
  font-size: var(--font-size-xl);
}
.text--size-2xl {
  font-size: var(--font-size-2xl);
}
.text--size-3xl {
  font-size: var(--font-size-3xl);
}
.text--size-4xl {
  font-size: var(--font-size-4xl);
}
.text--weight-normal {
  font-weight: var(--font-weight-normal);
}
.text--weight-medium {
  font-weight: var(--font-weight-medium);
}
.text--weight-semibold {
  font-weight: var(--font-weight-semibold);
}
.text--weight-bold {
  font-weight: var(--font-weight-bold);
}
.text--color-base {
  color: var(--color-text);
}
.text--color-secondary {
  color: var(--color-text-secondary);
}
.text--color-tertiary {
  color: var(--color-text-tertiary);
}
.text--color-primary {
  color: var(--color-text-primary);
}
.text--color-error {
  color: var(--color-error);
}
.text--color-success {
  color: var(--color-success);
}
.text--align-left {
  text-align: left;
}
.text--align-center {
  text-align: center;
}
.text--align-right {
  text-align: right;
}
.text--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

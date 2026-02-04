<script setup lang="ts">
import { computed } from "vue";

type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
type DirectionValue = "vertical" | "horizontal";
type AlignValue = "start" | "center" | "end" | "stretch";
type JustifyValue = "start" | "center" | "end" | "between" | "around" | "evenly";

interface Props {
  direction?: DirectionValue;
  spacing?: SpacingValue;
  align?: AlignValue;
  justify?: JustifyValue;
  wrap?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  direction: "vertical",
  spacing: 4,
  align: "stretch",
  justify: "start",
});

const classes = computed(() =>
  [
    "stack",
    `stack--${props.direction}`,
    `stack--spacing-${props.spacing}`,
    `stack--align-${props.align}`,
    `stack--justify-${props.justify}`,
    props.wrap && "stack--wrap",
  ]
    .filter(Boolean)
    .join(" "),
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style scoped>
.stack {
  display: flex;
}
.stack--vertical {
  flex-direction: column;
}
.stack--horizontal {
  flex-direction: row;
}
.stack--vertical.stack--spacing-0 > :not(:last-child) {
  margin-bottom: var(--space-0);
}
.stack--vertical.stack--spacing-1 > :not(:last-child) {
  margin-bottom: var(--space-1);
}
.stack--vertical.stack--spacing-2 > :not(:last-child) {
  margin-bottom: var(--space-2);
}
.stack--vertical.stack--spacing-3 > :not(:last-child) {
  margin-bottom: var(--space-3);
}
.stack--vertical.stack--spacing-4 > :not(:last-child) {
  margin-bottom: var(--space-4);
}
.stack--vertical.stack--spacing-5 > :not(:last-child) {
  margin-bottom: var(--space-5);
}
.stack--vertical.stack--spacing-6 > :not(:last-child) {
  margin-bottom: var(--space-6);
}
.stack--vertical.stack--spacing-8 > :not(:last-child) {
  margin-bottom: var(--space-8);
}
.stack--vertical.stack--spacing-10 > :not(:last-child) {
  margin-bottom: var(--space-10);
}
.stack--vertical.stack--spacing-12 > :not(:last-child) {
  margin-bottom: var(--space-12);
}
.stack--horizontal.stack--spacing-0 > :not(:last-child) {
  margin-right: var(--space-0);
}
.stack--horizontal.stack--spacing-1 > :not(:last-child) {
  margin-right: var(--space-1);
}
.stack--horizontal.stack--spacing-2 > :not(:last-child) {
  margin-right: var(--space-2);
}
.stack--horizontal.stack--spacing-3 > :not(:last-child) {
  margin-right: var(--space-3);
}
.stack--horizontal.stack--spacing-4 > :not(:last-child) {
  margin-right: var(--space-4);
}
.stack--horizontal.stack--spacing-5 > :not(:last-child) {
  margin-right: var(--space-5);
}
.stack--horizontal.stack--spacing-6 > :not(:last-child) {
  margin-right: var(--space-6);
}
.stack--horizontal.stack--spacing-8 > :not(:last-child) {
  margin-right: var(--space-8);
}
.stack--horizontal.stack--spacing-10 > :not(:last-child) {
  margin-right: var(--space-10);
}
.stack--horizontal.stack--spacing-12 > :not(:last-child) {
  margin-right: var(--space-12);
}
.stack--align-start {
  align-items: flex-start;
}
.stack--align-center {
  align-items: center;
}
.stack--align-end {
  align-items: flex-end;
}
.stack--align-stretch {
  align-items: stretch;
}
.stack--justify-start {
  justify-content: flex-start;
}
.stack--justify-center {
  justify-content: center;
}
.stack--justify-end {
  justify-content: flex-end;
}
.stack--justify-between {
  justify-content: space-between;
}
.stack--justify-around {
  justify-content: space-around;
}
.stack--justify-evenly {
  justify-content: space-evenly;
}
.stack--wrap {
  flex-wrap: wrap;
}
</style>

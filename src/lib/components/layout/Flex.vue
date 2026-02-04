<script setup lang="ts">
import { computed } from "vue";

type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
type DirectionValue = "row" | "column" | "row-reverse" | "column-reverse";
type AlignValue = "start" | "center" | "end" | "stretch" | "baseline";
type JustifyValue = "start" | "center" | "end" | "between" | "around" | "evenly";
type WrapValue = boolean | "reverse";

interface Props {
  direction?: DirectionValue;
  align?: AlignValue;
  justify?: JustifyValue;
  wrap?: WrapValue;
  gap?: SpacingValue;
}

const props = withDefaults(defineProps<Props>(), {
  direction: "row",
  align: "start",
  justify: "start",
  gap: 0,
});

const classes = computed(() =>
  [
    "flex",
    `flex--direction-${props.direction}`,
    `flex--align-${props.align}`,
    `flex--justify-${props.justify}`,
    props.wrap && (props.wrap === "reverse" ? "flex--wrap-reverse" : "flex--wrap"),
    `flex--gap-${props.gap}`,
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
.flex {
  display: flex;
}
.flex--direction-row {
  flex-direction: row;
}
.flex--direction-column {
  flex-direction: column;
}
.flex--direction-row-reverse {
  flex-direction: row-reverse;
}
.flex--direction-column-reverse {
  flex-direction: column-reverse;
}
.flex--align-start {
  align-items: flex-start;
}
.flex--align-center {
  align-items: center;
}
.flex--align-end {
  align-items: flex-end;
}
.flex--align-stretch {
  align-items: stretch;
}
.flex--align-baseline {
  align-items: baseline;
}
.flex--justify-start {
  justify-content: flex-start;
}
.flex--justify-center {
  justify-content: center;
}
.flex--justify-end {
  justify-content: flex-end;
}
.flex--justify-between {
  justify-content: space-between;
}
.flex--justify-around {
  justify-content: space-around;
}
.flex--justify-evenly {
  justify-content: space-evenly;
}
.flex--wrap {
  flex-wrap: wrap;
}
.flex--wrap-reverse {
  flex-wrap: wrap-reverse;
}
.flex--gap-0 {
  gap: var(--space-0);
}
.flex--gap-1 {
  gap: var(--space-1);
}
.flex--gap-2 {
  gap: var(--space-2);
}
.flex--gap-3 {
  gap: var(--space-3);
}
.flex--gap-4 {
  gap: var(--space-4);
}
.flex--gap-5 {
  gap: var(--space-5);
}
.flex--gap-6 {
  gap: var(--space-6);
}
.flex--gap-8 {
  gap: var(--space-8);
}
.flex--gap-10 {
  gap: var(--space-10);
}
.flex--gap-12 {
  gap: var(--space-12);
}
</style>

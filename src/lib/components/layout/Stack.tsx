import { createMemo, type JSX } from "solid-js";
import { css } from "solid-styled";

type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
type DirectionValue = "vertical" | "horizontal";
type AlignValue = "start" | "center" | "end" | "stretch";
type JustifyValue = "start" | "center" | "end" | "between" | "around" | "evenly";

interface StackProps {
  direction?: DirectionValue;
  spacing?: SpacingValue;
  align?: AlignValue;
  justify?: JustifyValue;
  wrap?: boolean;
  children?: JSX.Element;
}

export function Stack(props: StackProps) {
  const classes = createMemo(() =>
    [
      "stack",
      `stack--${props.direction ?? "vertical"}`,
      `stack--spacing-${props.spacing ?? 4}`,
      `stack--align-${props.align ?? "stretch"}`,
      `stack--justify-${props.justify ?? "start"}`,
      props.wrap && "stack--wrap",
    ]
      .filter(Boolean)
      .join(" "),
  );

  css`
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
  `;

  return <div class={classes()}>{props.children}</div>;
}

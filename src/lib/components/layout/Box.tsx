import { createMemo, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { css } from "solid-styled";

type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;
type BgValue = "base" | "offset" | "elevated" | "primary" | "input";
type RadiusValue = "none" | "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "full";
type ShadowValue = "none" | "xs" | "sm" | "base" | "md" | "lg" | "xl";

interface BoxProps {
  as?: keyof JSX.IntrinsicElements;
  padding?: SpacingValue;
  paddingX?: SpacingValue;
  paddingY?: SpacingValue;
  margin?: SpacingValue;
  marginX?: SpacingValue;
  marginY?: SpacingValue;
  bg?: BgValue;
  borderRadius?: RadiusValue;
  shadow?: ShadowValue;
  children?: JSX.Element;
}

export function Box(props: BoxProps) {
  const classes = createMemo(() =>
    [
      "box",
      props.padding !== undefined && `box--p-${props.padding}`,
      props.paddingX !== undefined && `box--px-${props.paddingX}`,
      props.paddingY !== undefined && `box--py-${props.paddingY}`,
      props.margin !== undefined && `box--m-${props.margin}`,
      props.marginX !== undefined && `box--mx-${props.marginX}`,
      props.marginY !== undefined && `box--my-${props.marginY}`,
      props.bg && `box--bg-${props.bg}`,
      props.borderRadius && `box--radius-${props.borderRadius}`,
      props.shadow && `box--shadow-${props.shadow}`,
    ]
      .filter(Boolean)
      .join(" "),
  );

  css`
    .box {
      box-sizing: border-box;
    }
    .box--p-0 {
      padding: var(--space-0);
    }
    .box--p-1 {
      padding: var(--space-1);
    }
    .box--p-2 {
      padding: var(--space-2);
    }
    .box--p-3 {
      padding: var(--space-3);
    }
    .box--p-4 {
      padding: var(--space-4);
    }
    .box--p-5 {
      padding: var(--space-5);
    }
    .box--p-6 {
      padding: var(--space-6);
    }
    .box--p-8 {
      padding: var(--space-8);
    }
    .box--p-10 {
      padding: var(--space-10);
    }
    .box--p-12 {
      padding: var(--space-12);
    }
    .box--p-16 {
      padding: var(--space-16);
    }
    .box--p-20 {
      padding: var(--space-20);
    }
    .box--px-0 {
      padding-left: var(--space-0);
      padding-right: var(--space-0);
    }
    .box--px-1 {
      padding-left: var(--space-1);
      padding-right: var(--space-1);
    }
    .box--px-2 {
      padding-left: var(--space-2);
      padding-right: var(--space-2);
    }
    .box--px-3 {
      padding-left: var(--space-3);
      padding-right: var(--space-3);
    }
    .box--px-4 {
      padding-left: var(--space-4);
      padding-right: var(--space-4);
    }
    .box--px-5 {
      padding-left: var(--space-5);
      padding-right: var(--space-5);
    }
    .box--px-6 {
      padding-left: var(--space-6);
      padding-right: var(--space-6);
    }
    .box--px-8 {
      padding-left: var(--space-8);
      padding-right: var(--space-8);
    }
    .box--px-10 {
      padding-left: var(--space-10);
      padding-right: var(--space-10);
    }
    .box--px-12 {
      padding-left: var(--space-12);
      padding-right: var(--space-12);
    }
    .box--px-16 {
      padding-left: var(--space-16);
      padding-right: var(--space-16);
    }
    .box--px-20 {
      padding-left: var(--space-20);
      padding-right: var(--space-20);
    }
    .box--py-0 {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
    }
    .box--py-1 {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
    }
    .box--py-2 {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
    }
    .box--py-3 {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
    }
    .box--py-4 {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
    }
    .box--py-5 {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
    }
    .box--py-6 {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
    }
    .box--py-8 {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
    }
    .box--py-10 {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
    }
    .box--py-12 {
      padding-top: var(--space-12);
      padding-bottom: var(--space-12);
    }
    .box--py-16 {
      padding-top: var(--space-16);
      padding-bottom: var(--space-16);
    }
    .box--py-20 {
      padding-top: var(--space-20);
      padding-bottom: var(--space-20);
    }
    .box--m-0 {
      margin: var(--space-0);
    }
    .box--m-1 {
      margin: var(--space-1);
    }
    .box--m-2 {
      margin: var(--space-2);
    }
    .box--m-3 {
      margin: var(--space-3);
    }
    .box--m-4 {
      margin: var(--space-4);
    }
    .box--m-5 {
      margin: var(--space-5);
    }
    .box--m-6 {
      margin: var(--space-6);
    }
    .box--m-8 {
      margin: var(--space-8);
    }
    .box--m-10 {
      margin: var(--space-10);
    }
    .box--m-12 {
      margin: var(--space-12);
    }
    .box--m-16 {
      margin: var(--space-16);
    }
    .box--m-20 {
      margin: var(--space-20);
    }
    .box--mx-0 {
      margin-left: var(--space-0);
      margin-right: var(--space-0);
    }
    .box--mx-1 {
      margin-left: var(--space-1);
      margin-right: var(--space-1);
    }
    .box--mx-2 {
      margin-left: var(--space-2);
      margin-right: var(--space-2);
    }
    .box--mx-3 {
      margin-left: var(--space-3);
      margin-right: var(--space-3);
    }
    .box--mx-4 {
      margin-left: var(--space-4);
      margin-right: var(--space-4);
    }
    .box--mx-5 {
      margin-left: var(--space-5);
      margin-right: var(--space-5);
    }
    .box--mx-6 {
      margin-left: var(--space-6);
      margin-right: var(--space-6);
    }
    .box--mx-8 {
      margin-left: var(--space-8);
      margin-right: var(--space-8);
    }
    .box--mx-10 {
      margin-left: var(--space-10);
      margin-right: var(--space-10);
    }
    .box--mx-12 {
      margin-left: var(--space-12);
      margin-right: var(--space-12);
    }
    .box--mx-16 {
      margin-left: var(--space-16);
      margin-right: var(--space-16);
    }
    .box--mx-20 {
      margin-left: var(--space-20);
      margin-right: var(--space-20);
    }
    .box--my-0 {
      margin-top: var(--space-0);
      margin-bottom: var(--space-0);
    }
    .box--my-1 {
      margin-top: var(--space-1);
      margin-bottom: var(--space-1);
    }
    .box--my-2 {
      margin-top: var(--space-2);
      margin-bottom: var(--space-2);
    }
    .box--my-3 {
      margin-top: var(--space-3);
      margin-bottom: var(--space-3);
    }
    .box--my-4 {
      margin-top: var(--space-4);
      margin-bottom: var(--space-4);
    }
    .box--my-5 {
      margin-top: var(--space-5);
      margin-bottom: var(--space-5);
    }
    .box--my-6 {
      margin-top: var(--space-6);
      margin-bottom: var(--space-6);
    }
    .box--my-8 {
      margin-top: var(--space-8);
      margin-bottom: var(--space-8);
    }
    .box--my-10 {
      margin-top: var(--space-10);
      margin-bottom: var(--space-10);
    }
    .box--my-12 {
      margin-top: var(--space-12);
      margin-bottom: var(--space-12);
    }
    .box--my-16 {
      margin-top: var(--space-16);
      margin-bottom: var(--space-16);
    }
    .box--my-20 {
      margin-top: var(--space-20);
      margin-bottom: var(--space-20);
    }
    .box--bg-base {
      background: var(--color-bg);
    }
    .box--bg-offset {
      background: var(--color-bg-offset);
    }
    .box--bg-elevated {
      background: var(--color-bg-elevated);
    }
    .box--bg-primary {
      background: var(--color-primary-bg);
    }
    .box--bg-input {
      background: var(--color-bg-input);
    }
    .box--radius-none {
      border-radius: var(--radius-none);
    }
    .box--radius-sm {
      border-radius: var(--radius-sm);
    }
    .box--radius-base {
      border-radius: var(--radius-base);
    }
    .box--radius-md {
      border-radius: var(--radius-md);
    }
    .box--radius-lg {
      border-radius: var(--radius-lg);
    }
    .box--radius-xl {
      border-radius: var(--radius-xl);
    }
    .box--radius-2xl {
      border-radius: var(--radius-2xl);
    }
    .box--radius-full {
      border-radius: var(--radius-full);
    }
    .box--shadow-none {
      box-shadow: none;
    }
    .box--shadow-xs {
      box-shadow: var(--shadow-xs);
    }
    .box--shadow-sm {
      box-shadow: var(--shadow-sm);
    }
    .box--shadow-base {
      box-shadow: var(--shadow-base);
    }
    .box--shadow-md {
      box-shadow: var(--shadow-md);
    }
    .box--shadow-lg {
      box-shadow: var(--shadow-lg);
    }
    .box--shadow-xl {
      box-shadow: var(--shadow-xl);
    }
  `;

  return (
    <Dynamic component={props.as ?? "div"} class={classes()}>
      {props.children}
    </Dynamic>
  );
}

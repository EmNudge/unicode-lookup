import { createMemo, Show, type JSX } from "solid-js";
import { css } from "solid-styled";

type SizeValue = "sm" | "base" | "lg";

interface LabelProps {
  for?: string;
  required?: boolean;
  optional?: boolean;
  size?: SizeValue;
  children?: JSX.Element;
}

export function Label(props: LabelProps) {
  const classes = createMemo(() => ["label", `label--${props.size ?? "base"}`].join(" "));

  css`
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
  `;

  return (
    <label for={props.for} class={classes()}>
      {props.children}
      <Show when={props.required}>
        <span class="label-indicator label-indicator--required" aria-label="required">
          *
        </span>
      </Show>
      <Show when={!props.required && props.optional}>
        <span class="label-indicator label-indicator--optional" aria-label="optional">
          (optional)
        </span>
      </Show>
    </label>
  );
}

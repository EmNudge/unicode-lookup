import { createMemo } from "solid-js";
import { css } from "solid-styled";

type SizeValue = "sm" | "base" | "lg" | "xl";
type ColorValue = "primary" | "white" | "current";

interface SpinnerProps {
  size?: SizeValue;
  color?: ColorValue;
}

export function Spinner(props: SpinnerProps) {
  const classes = createMemo(() =>
    ["spinner", `spinner--${props.size ?? "base"}`, `spinner--${props.color ?? "primary"}`].join(
      " ",
    ),
  );

  css`
    .spinner {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .spinner__circle {
      border-radius: 50%;
      border-style: solid;
      border-right-color: transparent;
      animation: spin 0.6s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .spinner--sm .spinner__circle {
      width: 1rem;
      height: 1rem;
      border-width: 2px;
    }
    .spinner--base .spinner__circle {
      width: 1.5rem;
      height: 1.5rem;
      border-width: 2px;
    }
    .spinner--lg .spinner__circle {
      width: 2rem;
      height: 2rem;
      border-width: 3px;
    }
    .spinner--xl .spinner__circle {
      width: 3rem;
      height: 3rem;
      border-width: 4px;
    }
    .spinner--primary .spinner__circle {
      border-color: var(--color-primary);
      border-right-color: transparent;
    }
    .spinner--white .spinner__circle {
      border-color: white;
      border-right-color: transparent;
    }
    .spinner--current .spinner__circle {
      border-color: currentColor;
      border-right-color: transparent;
    }
  `;

  return (
    <div class={classes()} role="status" aria-label="Loading">
      <div class="spinner__circle" />
    </div>
  );
}

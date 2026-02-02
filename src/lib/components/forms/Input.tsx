import { createMemo, Show } from "solid-js";
import { css } from "solid-styled";

type TypeValue = "text" | "email" | "password" | "number" | "search" | "tel" | "url";
type SizeValue = "sm" | "base" | "lg";

interface InputProps {
  value?: string;
  type?: TypeValue;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string | boolean;
  size?: SizeValue;
  fullWidth?: boolean;
  hue?: number;
  autocomplete?: string;
  onInput?: (e: InputEvent & { currentTarget: HTMLInputElement }) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (value: string) => void;
  ref?: (el: HTMLInputElement) => void;
}

export function Input(props: InputProps) {
  const hasError = createMemo(() =>
    typeof props.error === "string" ? !!props.error : props.error,
  );

  const classes = createMemo(() =>
    [
      "input",
      props.hue !== undefined ? "styled" : "input--default",
      `input--${props.size ?? "base"}`,
      hasError() && "input--error",
      props.fullWidth && "input--full-width",
      props.disabled && "input--disabled",
    ]
      .filter(Boolean)
      .join(" "),
  );

  const style = createMemo(() => (props.hue !== undefined ? `--hue: ${props.hue}` : undefined));

  css`
    .input-wrapper {
      display: inline-flex;
      flex-direction: column;
      gap: var(--space-1);
      width: auto;
    }
    .input {
      margin: 0;
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-md);
      border: var(--border-width-1) solid var(--color-border);
      background: var(--color-bg-input);
      color: var(--color-text);
      font-family: var(--font-family-base);
      transition: var(--transition-colors);
      box-sizing: border-box;
    }
    .input::placeholder {
      color: var(--color-text-tertiary);
      opacity: 0.6;
    }
    .input:focus {
      outline: none;
      border-color: var(--color-border-focus);
      box-shadow: var(--shadow-input-focus);
    }
    .input--default:hover:not(:disabled):not(:focus) {
      border-color: var(--color-text-secondary);
    }
    .input--sm {
      padding: var(--space-1) var(--space-3);
      font-size: var(--font-size-sm);
      height: var(--size-input-height-sm);
    }
    .input--base {
      height: var(--size-input-height-base);
    }
    .input--lg {
      padding: var(--space-3) var(--space-5);
      font-size: var(--font-size-lg);
      height: var(--size-input-height-lg);
    }
    .input--error {
      border-color: var(--color-error-border);
    }
    .input--error:focus {
      border-color: var(--color-error);
    }
    .input-error {
      font-size: var(--font-size-sm);
      color: var(--color-error);
      margin-top: var(--space-1);
    }
    .input--full-width {
      width: 100%;
    }
    .input:disabled,
    .input--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--color-bg-offset);
    }
    .input.styled {
      color: var(--hsl);
      background: var(--hsl-bg);
      border-color: var(--hsl);
    }
    .input.styled:focus {
      border-color: var(--hsl);
      box-shadow: var(--shadow-input-focus);
    }
  `;

  return (
    <div class="input-wrapper">
      <input
        ref={props.ref}
        class={classes()}
        style={style()}
        value={props.value ?? ""}
        type={props.type ?? "text"}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readonly={props.readonly}
        autocomplete={props.autocomplete}
        onInput={(e) => {
          props.onInput?.(e);
          props.onChange?.(e.currentTarget.value);
        }}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        aria-invalid={hasError()}
      />
      <Show when={typeof props.error === "string" && props.error}>
        <span class="input-error">{props.error as string}</span>
      </Show>
    </div>
  );
}

import { createMemo, Show, For } from "solid-js";
import { css } from "solid-styled";

type OptionValue = string | number;
type Option = { value: OptionValue; label: string };
type SizeValue = "sm" | "base" | "lg";

interface SelectProps {
  value?: string | number;
  options: Option[] | string[] | number[];
  placeholder?: string;
  disabled?: boolean;
  error?: string | boolean;
  size?: SizeValue;
  fullWidth?: boolean;
  hue?: number;
  onChange?: (value: OptionValue) => void;
}

export function Select(props: SelectProps) {
  const normalizedOptions = createMemo(() =>
    props.options.map((opt) => {
      if (typeof opt === "object" && "value" in opt && "label" in opt) {
        return opt;
      }
      return { value: opt, label: String(opt) };
    }),
  );

  const hasError = createMemo(() =>
    typeof props.error === "string" ? !!props.error : props.error,
  );

  const classes = createMemo(() =>
    [
      "select",
      props.hue !== undefined ? "styled" : "select--default",
      `select--${props.size ?? "base"}`,
      hasError() && "select--error",
      props.fullWidth && "select--full-width",
      props.disabled && "select--disabled",
    ]
      .filter(Boolean)
      .join(" "),
  );

  const style = createMemo(() => (props.hue !== undefined ? `--hue: ${props.hue}` : undefined));

  function handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const selectedValue = target.value;

    if (props.options.length > 0 && typeof props.options[0] === "number") {
      props.onChange?.(Number(selectedValue));
    } else {
      props.onChange?.(selectedValue);
    }
  }

  css`
    .select-wrapper {
      display: inline-flex;
      flex-direction: column;
      gap: var(--space-1);
      width: auto;
    }
    .select {
      margin: 0;
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-md);
      border: var(--border-width-1) solid var(--color-border);
      background: var(--color-bg-input);
      color: var(--color-text);
      font-family: var(--font-family-base);
      transition: var(--transition-colors);
      box-sizing: border-box;
      cursor: pointer;
    }
    .select:focus {
      outline: none;
      border-color: var(--color-border-focus);
      box-shadow: var(--shadow-input-focus);
    }
    .select--default:hover:not(:disabled):not(:focus) {
      border-color: var(--color-text-secondary);
    }
    .select--sm {
      padding: var(--space-1) var(--space-3);
      font-size: var(--font-size-sm);
      height: var(--size-input-height-sm);
    }
    .select--base {
      height: var(--size-input-height-base);
    }
    .select--lg {
      padding: var(--space-3) var(--space-5);
      font-size: var(--font-size-lg);
      height: var(--size-input-height-lg);
    }
    .select--error {
      border-color: var(--color-error-border);
    }
    .select--error:focus {
      border-color: var(--color-error);
    }
    .select-error {
      font-size: var(--font-size-sm);
      color: var(--color-error);
      margin-top: var(--space-1);
    }
    .select--full-width {
      width: 100%;
    }
    .select:disabled,
    .select--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--color-bg-offset);
    }
    .select.styled {
      color: var(--hsl);
      background: var(--hsl-bg);
      border-color: var(--hsl);
    }
    .select.styled:focus {
      border-color: var(--hsl);
      box-shadow: var(--shadow-input-focus);
    }
    option {
      background: var(--color-bg-input);
      color: var(--color-text);
    }
  `;

  return (
    <div class="select-wrapper">
      <select
        class={classes()}
        style={style()}
        value={props.value}
        disabled={props.disabled}
        onChange={handleChange}
        aria-invalid={hasError()}
      >
        <Show when={props.placeholder}>
          <option value="" disabled selected={props.value === ""}>
            {props.placeholder}
          </option>
        </Show>
        <For each={normalizedOptions()}>
          {(option) => <option value={option.value}>{option.label}</option>}
        </For>
      </select>
      <Show when={typeof props.error === "string" && props.error}>
        <span class="select-error">{props.error as string}</span>
      </Show>
    </div>
  );
}

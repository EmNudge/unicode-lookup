import { createMemo, Show } from "solid-js";
import { css } from "solid-styled";

type ResizeValue = "none" | "vertical" | "horizontal" | "both";

interface TextAreaProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string | boolean;
  rows?: number;
  resize?: ResizeValue;
  fullWidth?: boolean;
  onInput?: (e: InputEvent & { currentTarget: HTMLTextAreaElement }) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (value: string) => void;
}

export function TextArea(props: TextAreaProps) {
  const hasError = createMemo(() =>
    typeof props.error === "string" ? !!props.error : props.error,
  );

  const classes = createMemo(() =>
    [
      "textarea",
      hasError() && "textarea--error",
      props.fullWidth && "textarea--full-width",
      props.disabled && "textarea--disabled",
      `textarea--resize-${props.resize ?? "vertical"}`,
    ]
      .filter(Boolean)
      .join(" "),
  );

  css`
    .textarea-wrapper {
      display: inline-flex;
      flex-direction: column;
      gap: var(--space-1);
      width: auto;
    }
    .textarea {
      margin: 0;
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-md);
      border: var(--border-width-1) solid var(--color-border);
      background: var(--color-bg-input);
      color: var(--color-text);
      font-family: var(--font-family-base);
      font-size: var(--font-size-base);
      line-height: var(--line-height-normal);
      transition: var(--transition-colors);
      box-sizing: border-box;
      min-height: 5rem;
    }
    .textarea::placeholder {
      color: var(--color-text-tertiary);
      opacity: 0.6;
    }
    .textarea:focus {
      outline: none;
      border-color: var(--color-border-focus);
      box-shadow: var(--shadow-input-focus);
    }
    .textarea:hover:not(:disabled):not(:focus) {
      border-color: var(--color-text-secondary);
    }
    .textarea--resize-none {
      resize: none;
    }
    .textarea--resize-vertical {
      resize: vertical;
    }
    .textarea--resize-horizontal {
      resize: horizontal;
    }
    .textarea--resize-both {
      resize: both;
    }
    .textarea--error {
      border-color: var(--color-error-border);
    }
    .textarea--error:focus {
      border-color: var(--color-error);
    }
    .textarea-error {
      font-size: var(--font-size-sm);
      color: var(--color-error);
      margin-top: var(--space-1);
    }
    .textarea--full-width {
      width: 100%;
    }
    .textarea:disabled,
    .textarea--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--color-bg-offset);
    }
  `;

  return (
    <div class="textarea-wrapper">
      <textarea
        class={classes()}
        value={props.value ?? ""}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readonly={props.readonly}
        rows={props.rows ?? 4}
        onInput={(e) => {
          props.onInput?.(e);
          props.onChange?.(e.currentTarget.value);
        }}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        aria-invalid={hasError()}
      />
      <Show when={typeof props.error === "string" && props.error}>
        <span class="textarea-error">{props.error as string}</span>
      </Show>
    </div>
  );
}

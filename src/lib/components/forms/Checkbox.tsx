import { createMemo, createEffect, Show } from "solid-js";
import { css } from "solid-styled";

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string | boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox(props: CheckboxProps) {
  let inputElement: HTMLInputElement | undefined;

  const hasError = createMemo(() =>
    typeof props.error === "string" ? !!props.error : props.error,
  );

  createEffect(() => {
    if (inputElement) {
      inputElement.indeterminate = props.indeterminate ?? false;
    }
  });

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    props.onChange?.(target.checked);
  }

  css`
    .checkbox-wrapper {
      display: inline-flex;
      flex-direction: column;
      gap: var(--space-1);
    }
    .checkbox-label {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      cursor: pointer;
      user-select: none;
    }
    .checkbox-label--disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .checkbox-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    .checkbox-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border: var(--border-width-2) solid var(--color-border);
      border-radius: var(--radius-sm);
      background: var(--color-bg-input);
      transition: var(--transition-colors);
      flex-shrink: 0;
    }
    .checkbox-input:focus-visible + .checkbox-box {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }
    .checkbox-input:checked + .checkbox-box {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }
    .checkbox-input:indeterminate + .checkbox-box {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }
    .checkbox-label:hover .checkbox-box:not(.checkbox-box--error) {
      border-color: var(--color-primary);
    }
    .checkbox-box--error {
      border-color: var(--color-error-border);
    }
    .checkbox-icon {
      width: 1rem;
      height: 1rem;
      color: white;
    }
    .checkbox-text {
      color: var(--color-text);
      font-size: var(--font-size-base);
    }
    .checkbox-error {
      font-size: var(--font-size-sm);
      color: var(--color-error);
      margin-left: calc(1.25rem + var(--space-2));
    }
  `;

  return (
    <div class="checkbox-wrapper">
      <label class={`checkbox-label ${props.disabled ? "checkbox-label--disabled" : ""}`}>
        <input
          ref={inputElement}
          type="checkbox"
          class="checkbox-input"
          checked={props.checked}
          disabled={props.disabled}
          onChange={handleChange}
          aria-invalid={hasError()}
        />
        <span class={`checkbox-box ${hasError() ? "checkbox-box--error" : ""}`}>
          <Show when={props.checked || props.indeterminate}>
            <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
              <Show
                when={props.indeterminate}
                fallback={
                  <path
                    d="M3 8l3 3 7-7"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                }
              >
                <path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </Show>
            </svg>
          </Show>
        </span>
        <Show when={props.label}>
          <span class="checkbox-text">{props.label}</span>
        </Show>
      </label>
      <Show when={typeof props.error === "string" && props.error}>
        <span class="checkbox-error">{props.error as string}</span>
      </Show>
    </div>
  );
}

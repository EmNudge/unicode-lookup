import { Show } from "solid-js";
import { css } from "solid-styled";

interface RadioProps {
  value: string | number;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (value: string | number) => void;
}

export function Radio(props: RadioProps) {
  function handleChange() {
    props.onChange?.(props.value);
  }

  css`
    .radio-label {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      cursor: pointer;
      user-select: none;
    }
    .radio-label--disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .radio-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    .radio-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border: var(--border-width-2) solid var(--color-border);
      border-radius: var(--radius-full);
      background: var(--color-bg-input);
      transition: var(--transition-colors);
      flex-shrink: 0;
    }
    .radio-input:focus-visible + .radio-box {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }
    .radio-label:hover .radio-box {
      border-color: var(--color-primary);
    }
    .radio-input:checked ~ .radio-box {
      border-color: var(--color-primary);
    }
    .radio-dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: var(--radius-full);
      background: var(--color-primary);
      transform: scale(0);
      transition: transform var(--duration-base) var(--ease-out);
    }
    .radio-input:checked ~ .radio-box .radio-dot {
      transform: scale(1);
    }
    .radio-text {
      color: var(--color-text);
      font-size: var(--font-size-base);
    }
  `;

  return (
    <label class={`radio-label ${props.disabled ? "radio-label--disabled" : ""}`}>
      <input
        type="radio"
        class="radio-input"
        name={props.name}
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        onChange={handleChange}
      />
      <span class="radio-box">
        <span class="radio-dot" />
      </span>
      <Show when={props.label}>
        <span class="radio-text">{props.label}</span>
      </Show>
    </label>
  );
}

import { Show, type JSX } from "solid-js";
import { css } from "solid-styled";

type VariantValue = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: VariantValue;
  title?: string;
  dismissible?: boolean;
  icon?: boolean;
  children?: JSX.Element;
  onClose?: () => void;
}

const icons: Record<VariantValue, string> = {
  info: "\u2139",
  success: "\u2713",
  warning: "\u26A0",
  error: "\u2715",
};

export function Alert(props: AlertProps) {
  const variant = () => props.variant ?? "info";

  css`
    .alert {
      display: flex;
      gap: var(--space-3);
      padding: var(--space-4);
      border-radius: var(--radius-md);
      border: var(--border-width-1) solid;
    }
    .alert--info {
      background: var(--color-info-bg);
      color: var(--color-info);
      border-color: var(--color-info-border);
    }
    .alert--success {
      background: var(--color-success-bg);
      color: var(--color-success);
      border-color: var(--color-success-border);
    }
    .alert--warning {
      background: var(--color-warning-bg);
      color: var(--color-warning);
      border-color: var(--color-warning-border);
    }
    .alert--error {
      background: var(--color-error-bg);
      color: var(--color-error);
      border-color: var(--color-error-border);
    }
    .alert__icon {
      flex-shrink: 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
    }
    .alert__content {
      flex: 1;
      min-width: 0;
    }
    .alert__title {
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--space-1);
    }
    .alert__message {
      font-size: var(--font-size-base);
    }
    .alert__close {
      flex-shrink: 0;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity var(--duration-base);
      color: inherit;
      font-size: var(--font-size-lg);
      line-height: 1;
    }
    .alert__close:hover {
      opacity: 1;
    }
  `;

  return (
    <div class={`alert alert--${variant()}`} role="alert">
      <Show when={props.icon !== false}>
        <div class="alert__icon">{icons[variant()]}</div>
      </Show>

      <div class="alert__content">
        <Show when={props.title}>
          <div class="alert__title">{props.title}</div>
        </Show>
        <div class="alert__message">{props.children}</div>
      </div>

      <Show when={props.dismissible}>
        <button class="alert__close" onClick={props.onClose} aria-label="Close" type="button">
          {"\u2715"}
        </button>
      </Show>
    </div>
  );
}

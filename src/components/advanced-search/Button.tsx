import { type JSX } from "solid-js";
import { css } from "solid-styled";

interface ButtonProps {
  hue?: number;
  disabled?: boolean;
  onClick?: () => void;
  children?: JSX.Element;
}

export function Button(props: ButtonProps) {
  css`
    button {
      margin: 0;
      padding: 5px 15px;
      border-radius: 4px;
      box-shadow: 0px 4px 3px 0px #00000017;
      cursor: pointer;
    }
    button:focus,
    button:active {
      color: var(--hsl);
      border: 1px solid var(--hsl);
      background: hsl(var(--hue), 100%, 95%);
    }
    button:active {
      background: hsl(var(--hue), 70%, 95%);
      transform: scale(0.95);
    }
    .disabled {
      border: 1px solid hsl(var(--hue), 40%, 75%);
      color: hsl(var(--hue), 40%, 75%);
      cursor: auto;
    }
  `;

  return (
    <button
      onClick={props.onClick}
      class={`styled ${props.disabled ? "disabled" : ""}`}
      style={`--hue: ${props.hue ?? 170}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

import { For } from "solid-js";
import { css } from "solid-styled";

interface DropdownProps {
  hue?: number;
  options?: string[];
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function Dropdown(props: DropdownProps) {
  css`
    select {
      box-shadow: 0px 4px 3px 0px #00000017;
      cursor: pointer;
    }
    select:focus {
      outline: none;
    }
    select:disabled {
      opacity: 1;
      filter: brightness(95%);
      cursor: auto;
    }
  `;

  return (
    <select
      disabled={props.disabled}
      class="styled"
      style={`--hue: ${props.hue ?? 111}`}
      value={props.value}
      onChange={(e) => props.onChange?.(e.currentTarget.value)}
    >
      <For each={props.options ?? ["Dropdown"]}>{(option) => <option>{option}</option>}</For>
    </select>
  );
}

import { createSignal, createEffect, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import { css } from "solid-styled";
import { CloseIcon } from "$icons/close";
import { Select } from "$lib/components";
import { boxTypeMap } from "./box-types";

interface BoxContentProps {
  name: string;
  data: any;
  hue?: number;
  onClose?: () => void;
  onNameChange?: (name: string) => void;
  onDataChange?: (data: any) => void;
}

export function BoxContent(props: BoxContentProps) {
  const [localName, setLocalName] = createSignal(props.name);

  const componentNames = createMemo(() => [...boxTypeMap.keys()]);
  const component = createMemo(() => boxTypeMap.get(localName()));

  createEffect(() => {
    props.onNameChange?.(localName());
    props.onDataChange?.(undefined);
  });

  css`
    .content {
      padding: 40px;
      display: grid;
      justify-content: center;
      margin-top: -1px;
      position: relative;
    }
    button {
      position: absolute;
      top: 5px;
      right: 10px;
      background: none;
      border: none;
      font-size: 2em;
      padding: 3px;
      line-height: 0.8em;
      margin: 0;
      z-index: 2;
      cursor: pointer;
    }
    hr {
      margin: 10px -40px;
      opacity: 0.4;
    }
  `;

  return (
    <div class="content styled" style={`--hue: ${props.hue ?? 200}`}>
      <button onClick={props.onClose}>
        <CloseIcon />
      </button>

      <Select
        options={componentNames()}
        value={localName()}
        onChange={(v) => setLocalName(String(v))}
        hue={35}
      />

      <hr />

      <Dynamic component={component()} data={props.data} onDataChange={props.onDataChange} />
    </div>
  );
}

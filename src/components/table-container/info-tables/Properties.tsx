import { For } from "solid-js";
import { css } from "solid-styled";

interface PropertiesProps {
  properties: string[];
}

export function Properties(props: PropertiesProps) {
  css`
    h3 {
      padding-bottom: 6px;
      color: var(--primary-text);
      font-size: 1rem;
      font-weight: 400;
    }
    .properties {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      text-align: left;
    }
    .properties span {
      background: var(--bg-offset);
      padding: 2px 8px;
      border-radius: 4px;
    }
  `;

  return (
    <>
      <h3>Properties</h3>
      <div class="properties">
        <For each={props.properties}>{(property) => <span>{property}</span>}</For>
      </div>
    </>
  );
}

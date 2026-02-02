import { createMemo, Show, For } from "solid-js";
import type { UnicodeMapData } from "@emnudge/unicode-query";

interface NumberEquivProps {
  digitEquiv: UnicodeMapData["digitEquiv"];
  numericEquiv: UnicodeMapData["numericEquiv"];
  decimalEquiv: UnicodeMapData["decimalEquiv"];
}

export function NumberEquiv(props: NumberEquivProps) {
  const numberMappings = createMemo(() =>
    Object.entries({
      digitEquiv: props.digitEquiv,
      numericEquiv: props.numericEquiv,
      decimalEquiv: props.decimalEquiv,
    }).filter(([, v]) => v),
  );

  return (
    <Show when={numberMappings().length}>
      <br />
      <table>
        <thead>
          <tr>
            <th class="title" colspan="2">
              Number Equivalent
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={numberMappings()}>
            {([key, value]) => (
              <tr>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Show>
  );
}

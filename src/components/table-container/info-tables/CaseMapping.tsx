import { createMemo, Show, For } from "solid-js";
import type { UnicodeMapData } from "@emnudge/unicode-query";

interface CaseMappingProps {
  titlecaseMapping: UnicodeMapData["titlecaseMapping"];
  uppercaseMapping: UnicodeMapData["uppercaseMapping"];
  lowercaseMapping: UnicodeMapData["lowercaseMapping"];
}

export function CaseMapping(props: CaseMappingProps) {
  const caseMappings = createMemo(
    () =>
      Object.entries({
        titlecaseMapping: props.titlecaseMapping,
        uppercaseMapping: props.uppercaseMapping,
        lowercaseMapping: props.lowercaseMapping,
      }).filter(([, v]) => v) as [string, number][],
  );

  return (
    <Show when={caseMappings().length}>
      <br />
      <table>
        <thead>
          <tr>
            <th class="title" colspan="2">
              Case Mapping
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={caseMappings()}>
            {([key, value]) => (
              <tr>
                <td>{key}</td>
                <td>{String.fromCodePoint(value)}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Show>
  );
}

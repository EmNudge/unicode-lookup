import { For } from "solid-js";
import { css } from "solid-styled";

interface HtmlEntitiesProps {
  names: string[];
  codepoint: number;
}

export function HtmlEntities(props: HtmlEntitiesProps) {
  css`
    th {
      text-align: left;
      color: var(--primary-text);
      font-weight: 400;
      padding-bottom: 6px;
    }
    tbody tr:nth-child(odd) {
      background-color: var(--bg-offset);
    }
    td {
      padding: 6px;
    }
    td:first-child {
      padding-right: 30px;
    }
  `;

  return (
    <>
      <br />
      <table>
        <thead>
          <tr>
            <th class="title" colspan="2">
              Html Entities
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={props.names}>
            {(name) => (
              <tr>
                <td>Named</td>
                <td>&{name};</td>
              </tr>
            )}
          </For>
          <tr>
            <td>Hex</td>
            <td>&#x{props.codepoint.toString(16).padStart(5, "0")};</td>
          </tr>
          <tr>
            <td>Dec</td>
            <td>&#{props.codepoint};</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

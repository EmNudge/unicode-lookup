import { createMemo, For } from "solid-js";
import { css } from "solid-styled";
import { encodingModeSig, setEncodingModeSig } from "$stores";
import { getEncodings } from "$utils/char";

interface EncodingProps {
  codepoint: number;
}

type EncodingType = "hex" | "bin" | "dec";
const encodingTypes: EncodingType[] = ["hex", "bin", "dec"];

function getNumber(num: number, encoding: EncodingType, length: number) {
  if (encoding === "hex") return `0x<b>${num.toString(16).padStart(length / 4, "0")}</b>`;
  if (encoding === "bin") return `0b<b>${num.toString(2).padStart(length, "0")}</b>`;
  return `<b>${String(num)}</b>`;
}

export function Encoding(props: EncodingProps) {
  const encodings = createMemo(() => getEncodings(props.codepoint));

  const encodingsTable = createMemo(() =>
    encodingModeSig() === "dec"
      ? ([
          ["UTF-8", encodings().utf8, 8],
          ["UTF-16", encodings().utf16BE, 16],
        ] as [string, Uint8Array | Uint16Array, number][])
      : ([
          ["UTF-8", encodings().utf8, 8],
          ["UTF-16 BE", encodings().utf16BE, 16],
          ["UTF-16 LE", encodings().utf16LE, 16],
        ] as [string, Uint8Array | Uint16Array, number][]),
  );

  css`
    .bit-sets span {
      padding: 0 3px;
    }
    .title {
      color: var(--label-col);
      font-weight: bold;
    }
    td {
      padding: 5px;
    }
    th:first-child {
      color: var(--primary-text);
      font-weight: 400;
      padding-right: 1rem;
    }
    tbody tr:nth-child(odd) {
      background-color: var(--bg-offset);
    }
    .encoding-type {
      display: flex;
    }
    .encoding-type button {
      opacity: 0.6;
      cursor: pointer;
      padding: 6px;
      border: none;
      background: 0;
      margin: 0;
      font-weight: 600;
    }
    .encoding-type button:focus {
      outline: 1px solid rgba(0, 0, 255, 0.443);
    }
    .encoding-type .active {
      opacity: 0.95;
      background-color: rgba(128, 128, 128, 0.097);
    }
  `;

  return (
    <>
      <br />
      <table class="encoding-table">
        <thead>
          <tr>
            <th class="title">Encoding</th>
            <th>
              <div class="encoding-type">
                <For each={encodingTypes}>
                  {(encoding) => (
                    <button
                      class={encodingModeSig() === encoding ? "active" : ""}
                      onClick={() => setEncodingModeSig(encoding)}
                    >
                      {encoding}
                    </button>
                  )}
                </For>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <For each={encodingsTable()}>
            {([name, bitSets, length]) => (
              <tr>
                <td>{name}</td>
                <td class="bit-sets">
                  <For each={Array.from(bitSets)}>
                    {(bitSet) => (
                      <span innerHTML={getNumber(bitSet, encodingModeSig(), length as number)} />
                    )}
                  </For>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </>
  );
}

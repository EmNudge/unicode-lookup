import { createMemo, For } from "solid-js";
import { css } from "solid-styled";
import {
  getPropertiesForChar,
  getPlaneForCodepoint,
  getCodepointBlock,
  Category,
  getDecompFromStr,
  BidiClassMap,
} from "$utils/unicode";
import { blockLookupSig, symbolHtmlNamesMapSig } from "$stores";

import { CaseMapping } from "./info-tables/CaseMapping";
import { Encoding } from "./info-tables/Encoding";
import { NumberEquiv } from "./info-tables/NumberEquiv";
import { HtmlEntities } from "./info-tables/HtmlEntities";
import { Properties } from "./info-tables/Properties";
import type { UnicodeMapData } from "@emnudge/unicode-query";

interface InfoContainerProps {
  codepoint: number;
  name: string;
  info: UnicodeMapData;
}

export function InfoContainer(props: InfoContainerProps) {
  const category = createMemo(
    () => `${props.info.category} (${Category[props.info.category as keyof typeof Category]})`,
  );
  const charBlock = createMemo(() => getCodepointBlock(blockLookupSig(), props.codepoint));
  const planeData = createMemo(() => getPlaneForCodepoint(props.codepoint));

  const decomposition = createMemo(() =>
    props.info.decompositionStr ? getDecompFromStr(props.info.decompositionStr) : null,
  );
  const decompText = createMemo(() =>
    decomposition() != null
      ? `<${decomposition()!.type}> ${decomposition()!.codepoints.join(" ")}`
      : "",
  );

  const baseInfo = createMemo(
    () =>
      [
        ["Bidi Class", `${props.info.bidiClass} (${BidiClassMap.get(props.info.bidiClass)})`],
        !!props.info.oldName &&
          props.info.oldName !== props.name && ["Old Name", props.info.oldName],
        ["Codepoint", props.codepoint],
        ["Category", category()],
        !!decompText() && ["Decomposition", decompText()],
        [
          "Plane",
          planeData().name
            ? `${planeData().name} (Plane ${planeData().number}) `
            : `Plane ${planeData().number}`,
        ],
        ["Block", `${charBlock().name} (Range ${charBlock().range[0]}-${charBlock().range[1]}) `],
      ].filter(Boolean) as [string, string][],
  );

  const properties = createMemo(() => getPropertiesForChar(String.fromCodePoint(props.codepoint)));

  const htmlEntityNames = createMemo(() => symbolHtmlNamesMapSig().get(props.codepoint) ?? []);

  css`
    div.container {
      border-radius: 8px;
      padding: 20px;
    }
    .basic-info {
      display: grid;
    }
    td {
      padding: 5px;
    }
    td:nth-child(1) {
      font-weight: bold;
    }
    tr:nth-child(odd) {
      background-color: var(--bg-offset);
    }
    h1 {
      text-align: center;
    }
    .display-box {
      background-color: var(--bg-offset);
      height: 64px;
      width: 64px;
      font-size: 3em;
      border: 1px solid grey;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 12px 0;
    }
    header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;

  return (
    <div class="container" style={`--item-num: ${Math.ceil(properties().length / 2)}`}>
      <header>
        <h1>{props.name}</h1>
        <div class="display-box">
          <span>{String.fromCodePoint(props.codepoint)}</span>
        </div>
      </header>
      <table class="basic-info">
        <tbody>
          <For each={baseInfo()}>
            {([name, value]) => (
              <tr>
                <td>{name}</td>
                <td>{value}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>

      <HtmlEntities codepoint={props.codepoint} names={htmlEntityNames()} />
      <CaseMapping
        lowercaseMapping={props.info.lowercaseMapping}
        titlecaseMapping={props.info.titlecaseMapping}
        uppercaseMapping={props.info.uppercaseMapping}
      />
      <NumberEquiv
        digitEquiv={props.info.digitEquiv}
        numericEquiv={props.info.numericEquiv}
        decimalEquiv={props.info.decimalEquiv}
      />
      <Encoding codepoint={props.codepoint} />

      <br />
      <Properties properties={properties()} />
    </div>
  );
}

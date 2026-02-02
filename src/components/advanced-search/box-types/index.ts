import { BidiClass } from "./BidiClass";
import { CodepointRange } from "./CodepointRange";
import { NameIncludes } from "./NameIncludes";
import { RegexMatch } from "./RegexMatch";
import { UnicodeBlock } from "./UnicodeBlock";
import { UnicodePlane } from "./UnicodePlane";
import { UnicodeProperty } from "./UnicodeProperty";
import type { Component } from "solid-js";

const entries: [string, Component<{ data?: any; onDataChange?: (data: any) => void }>][] = [
  ["Codepoint Range", CodepointRange],
  ["Name Includes", NameIncludes],
  ["Regex Match", RegexMatch],
  ["Unicode Property", UnicodeProperty],
  ["Unicode Plane", UnicodePlane],
  ["Unicode Block", UnicodeBlock],
  ["Bidi Class", BidiClass],
];

export const boxTypeMap = new Map(entries);

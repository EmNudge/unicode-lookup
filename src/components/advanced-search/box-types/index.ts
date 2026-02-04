import BidiClass from "./BidiClass.vue";
import CodepointRange from "./CodepointRange.vue";
import NameIncludes from "./NameIncludes.vue";
import RegexMatch from "./RegexMatch.vue";
import UnicodeBlock from "./UnicodeBlock.vue";
import UnicodePlane from "./UnicodePlane.vue";
import UnicodeProperty from "./UnicodeProperty.vue";
import type { Component } from "vue";

const entries: [string, Component][] = [
  ["Codepoint Range", CodepointRange],
  ["Name Includes", NameIncludes],
  ["Regex Match", RegexMatch],
  ["Unicode Property", UnicodeProperty],
  ["Unicode Plane", UnicodePlane],
  ["Unicode Block", UnicodeBlock],
  ["Bidi Class", BidiClass],
];

export const boxTypeMap = new Map(entries);

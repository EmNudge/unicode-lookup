type UnicodeData = Map<number, UnicodeCharInfo>;

type FilterData =
  | { type: "character"; value: RegExp }
  | { type: "name"; value: RegExp | string }
  | { type: "range"; value: [number, number] }
  | { type: "bidi"; value: BidiClass };

export type Filter = FilterData & { negated?: boolean };

export type UnicodeData = Map<number, UnicodeCharInfo>;


export type BidiClass =
  | "L" | "R" | "AL" | "EN" | "ES" | "ET" | "AN" | "CS" | "NSM" | "BN" | "B" | "S" | "WS" | "ON"
  | "LRE" | "LRO" | "RLE" | "RLO" | "PDF" | "LRI" | "RLI" | "FSI" | "PDI"

export interface UnicodeCharInfo {
  codepoint: number;
  name: string;
  category: string;
  combiningClass: number;
  bidiClass: BidiClass;
  decomposition: {
    type: string;
    codepoints: number[];
  } | null;
  numberEquivalent: {
    decimal: number | null;
    digit: number | null;
    numeric: string | null;
  };
  isBidiMirrored: boolean;
  caseMapping: {
    uppercase: number | null,
    lowercase: number | null,
    titlecase: number | null,
  };
  htmlEntityNames: string[];
  oldName: string | null;
}
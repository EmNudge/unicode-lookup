import { filter, map, pipe, collect } from '../utils/iterable'
import { parseBlocks } from '../utils/unicode';

export async function getUnicodeBlockMap() {
  const res = await fetch('/UnicodeBlocks.txt');
  const text = await res.text();

  const blocks = parseBlocks(text);
  const blocksMap = new Map();
  for (const block of blocks) {
    blocksMap.set(block.name, block.range);
  }

  return blocksMap;
}

export async function getUnicodeMap() {
  const res = await fetch('/UnicodeData.txt');
  const text = await res.text();

  const unicodeArr: [number, UnicodeCharInfo][] = pipe(
    filter(line => line.trim()),
    map(line => getUnicodeData(line)),
    map(data => [data.codepoint, data]),
    collect,
  )(text.split('\n'));
  console.log(unicodeArr)

  return new Map<number, UnicodeCharInfo>(unicodeArr);
}

function getDecompFromStr(decomp: string) {
  const res = decomp.match(/<([a-zA-Z]+)> ([A-Z0-9 ]+)/);
  if (!res) return null;

  const { 1: type, 2: codepointsStr } = res;
  const codepoints = codepointsStr.split(' ').map(codepoint => {
    return parseInt(codepoint.trim(), 16);
  });

  return { type, codepoints };
}

export const BidiClassMap = new Map<BidiClass, string>([
  ['L', 'Left-to-Right'],
  ['R', 'Right-to-Left'],
  ['AL', 'Arabic Letter'],
  ['EN', 'European Number'],
  ['ES', 'European Separator'],
  ['ET', 'European Number Terminator'],
  ['AN', 'Arabic Number'],
  ['CS', 'Common Number Separator'],
  ['NSM', 'Nonspacing Mark'],
  ['BN', 'Boundary Neutral'],
  ['B', 'Paragraph Separator'],
  ['S', 'Segment Separator'],
  ['WS', 'Whitespace'],
  ['ON', 'Other Neutrals'],
  ['LRE', 'Left-to-Right Embedding'],
  ['LRO', 'Left-to-Right Override'],
  ['RLE', 'Right-to-Left Embedding'],
  ['RLO', 'Right-to-Left Override'],
  ['PDF', 'Pop Directional Format'],
  ['LRI', 'Left-to-Right Isolate'],
  ['RLI', 'Right-to-Left Isolate'],
  ['FSI', 'First Strong Isolate'],
  ['PDI', 'Pop Directional Isolate']
]);

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
  oldName: string | null;
}

function getUnicodeData(line: string): UnicodeCharInfo {
  let [
    codepointStr, label, category, combiningClass, bidiClass,
    decompositionStr, decimalEquiv, digitEquiv, numericEquiv,
    bidiMirrored, oldName, /* isoComment */,
    uppercaseMapping, lowercaseMapping, titlecaseMapping
  ] = line.split(';');

  const codepoint = parseInt(codepointStr, 16);
  const name = label.includes('<') && oldName ? oldName : label;
  const isBidiMirrored = bidiMirrored === 'Y';

  const caseMapping = {
    uppercase: uppercaseMapping ? parseInt(uppercaseMapping, 16) : null,
    lowercase: lowercaseMapping ? parseInt(uppercaseMapping, 16) : null,
    titlecase: titlecaseMapping ? parseInt(uppercaseMapping, 16) : null,
  };
  const numberEquivalent = {
    decimal: decimalEquiv ? Number(decimalEquiv) : null,
    digit: digitEquiv ? Number(digitEquiv) : null,
    numeric: numericEquiv || null,
  }

  const decomposition = getDecompFromStr(decompositionStr);

  return {
    codepoint, name, category,
    combiningClass: Number(combiningClass),
    bidiClass: bidiClass as BidiClass, decomposition, numberEquivalent,
    isBidiMirrored,
    caseMapping,
    oldName: oldName || null,
  }
}
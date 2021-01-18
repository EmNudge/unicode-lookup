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

export interface UnicodeCharInfo {
  codepoint: number;
  name: string;
  category: string;
  combiningClass: number;
  bidiClass: string;
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
    uppercase: string | null,
    lowercase: string | null,
    titlecase: string | null,
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
    uppercase: uppercaseMapping || null,
    lowercase: lowercaseMapping || null,
    titlecase: titlecaseMapping || null,
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
    bidiClass, decomposition, numberEquivalent,
    isBidiMirrored, 
    caseMapping,
    oldName: oldName || null, 
  }
}
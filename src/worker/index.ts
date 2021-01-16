import { getUnicodeTable, getUnicodeBlockMap } from './retrieval';
import * as Comlink from 'comlink';
import type { BoxSet } from '../stores';
import { getIter } from './getIterFromQuery';

// Massive hashmap of all codepoints to their name
let unicodeMap = new Map<number, string>();
// As not to take up space, we don't expand ranges and instead stick them here
let unicodeRangesMap = new Map<number[], string>();
// maps a block name onto a codepoint range
export let unicodeBlocksMap = new Map<string, [number, number]>();

class Querier {
  queryId: Symbol;

  async loadTable() {
    if (!unicodeMap.size) {
      // this also sets unicode locally
      const payload = await getUnicodeTable();
      unicodeMap = payload.unicodeMap;
      unicodeRangesMap = payload.unicodeRangesMap;
    }

    if (!unicodeBlocksMap.size) {
      unicodeBlocksMap = await getUnicodeBlockMap();
    }

    return { unicodeMap, unicodeRangesMap };
  }

  async query(itersArr: BoxSet[], resultsNum: number) {
    const arr = [];
    let index = 0;

    for (const item of getIter(itersArr, unicodeMap)) {
      arr.push(item);
      if (++index > resultsNum) break;
    }

    return arr;
  }
}

Comlink.expose(Querier);

// UnicodeData parsing, if need be in the future

// abstracting some stuff because of how much there is to parse
// http://unicode.org/reports/tr44/#UnicodeData.txt
// Not sure how to implement this, but here is the chart of category names:
// http://unicode.org/reports/tr44/#General_Category_Values
function parseLine(line: string) {
  const [
    hex, name, category, combiningClass, bidiClass, 
    decomp, numDec, numDigit, numNumeric, bidiMirrrored,,, // skipping 2 obsolete properties
    uppercase, lowercase, titlecase
  ] = line.split(';');
  return {
    codePoint: parseInt(hex, 16),
    name,
    category,
    // unfinished
  }
}
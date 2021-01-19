import { getUnicodeBlockMap, getUnicodeMap } from './retrieval';
import type { UnicodeCharInfo } from './retrieval';

import * as Comlink from 'comlink';
import type { BoxSet } from '../stores';
import { getIter } from './getIterFromQuery';

// maps a block name onto a codepoint range
export let unicodeBlocksMap = new Map<string, [number, number]>();
let unicodeDataMap = new Map<number, UnicodeCharInfo>()
class Querier {
  queryId: Symbol;

  async loadTable() {
    if (!unicodeBlocksMap.size) {
      unicodeBlocksMap = await getUnicodeBlockMap();
    }

    if (!unicodeDataMap.size) {
      unicodeDataMap = await getUnicodeMap();
    }

    return { unicodeDataMap };
  }

  async query(itersArr: BoxSet[]) {
    const iter = getIter(itersArr, unicodeDataMap);
    return [...iter];
  }
}

Comlink.expose(Querier);
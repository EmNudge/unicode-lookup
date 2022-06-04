import { getUnicodeBlockMap, getUnicodeMap } from './retrieval';
import type { UnicodeCharInfo } from './retrieval';

import type { BoxSet } from '../stores';
import { getIter } from './getIterFromQuery';

// maps a block name onto a codepoint range
export let unicodeBlocksMap = new Map<string, [number, number]>();
let unicodeDataMap = new Map<number, UnicodeCharInfo>();

const loadTable = async () => {
  if (!unicodeBlocksMap.size) {
    unicodeBlocksMap = await getUnicodeBlockMap();
  }

  if (!unicodeDataMap.size) {
    unicodeDataMap = await getUnicodeMap();
  }

  return { unicodeDataMap };
}

const query = async (itersArr: BoxSet[]) => {
  const iter = getIter(itersArr, unicodeDataMap);
  return [...iter];
}

addEventListener('message', async e => {
  const { name, id, payload } = e.data as { name: string, id: string, payload: any }

  if (name === 'loadTable') {
    self.postMessage({ 
      id, 
      payload: await loadTable()
    });
  } else if (name === 'query') {
    self.postMessage({ 
      id, 
      payload: await query(payload)
    });
  }
});
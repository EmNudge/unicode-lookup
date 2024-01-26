import { getUnicodeBlockMap, getUnicodeMap } from './retrieval';

import type { BoxSet } from '../stores';
import { shouldYieldCodepoint } from './getIterFromQuery';
import type { UnicodeCharInfo } from '$utils/types';
import { simpleQuery } from './simpleQuery';

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
};

type Message =
	| { name: 'loadTable'; id: string }
	| { name: 'query'; id: string; payload: BoxSet[] }
	| { name: 'simple-query'; id: string; payload: string };

type MessageResponse =
	| {
			unicodeDataMap: Map<number, UnicodeCharInfo>;
	  }
	| [number, UnicodeCharInfo][]
	| void;

const handleMessage = async (message: Message): Promise<MessageResponse> => {
	const { name } = message;

	if (name === 'loadTable') {
		return await loadTable();
	}
  
  if (name === 'query') {
		return [...unicodeDataMap.entries()].filter((unicode) =>
			shouldYieldCodepoint(message.payload, unicode)
		);
	} 
  
  if (name === 'simple-query') {
		return simpleQuery(unicodeDataMap, message.payload).map((data) => [data.codepoint, data]);
	}
};

addEventListener('message', async (e: { data: Message }) => {
  self.postMessage({
    id: e.data.id,
    payload: await handleMessage(e.data)
  });
});

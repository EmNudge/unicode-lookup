import { getUnicodeBlockMap, getUnicodeMap } from './retrieval';

import type {
	UnicodeCharInfo,
	WorkerMessage,
	WorkerMessageResponse,
} from '$utils/types';
import { advancedQuery } from './advancedQuery';
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

const handleMessage = async (
	message: WorkerMessage,
): Promise<WorkerMessageResponse> => {
	const { name } = message;

	if (name === 'loadTable') {
		return await loadTable();
	}

	if (name === 'simple-query') {
		return simpleQuery(unicodeDataMap, message.payload).map((data) => [
			data.codepoint,
			data,
		]);
	}

	if (name === 'advanced-query') {
		return advancedQuery(unicodeDataMap, message.payload).map((data) => [
			data.codepoint,
			data,
		]);
	}
};

addEventListener('message', async (e: { data: WorkerMessage }) => {
	self.postMessage({
		id: e.data.id,
		payload: await handleMessage(e.data),
	});
});

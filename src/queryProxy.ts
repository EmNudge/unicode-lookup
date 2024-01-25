import { 
	resultsStore, currentQueryStore, workerStore, 
	workerIsReadyStore, blockLookupStore, hasFirstLoadedStore
} from './stores';
import { BoxSetType } from './stores';
import type { BoxSet } from './stores';
import { parseBlocks } from './utils/unicode';

import { get } from 'svelte/store';

import QueryWorker from './worker?worker';
import { sendMessage } from '$utils/worker';
import type { UnicodeCharInfo } from './worker/retrieval';

currentQueryStore.subscribe(async val => {
	if (!val.length) return;
	
	const workerIsReady = get(workerIsReadyStore);
	if (!workerIsReady) return;

	const results = await sendMessage(get(workerStore)!, 'query', val) as [number, UnicodeCharInfo][];

	const hasFirstLoaded = get(hasFirstLoadedStore);
	if (!hasFirstLoaded) hasFirstLoadedStore.set(true);

	resultsStore.set(results);
});

async function fetchBlocks() {
	const res = await fetch('/UnicodeBlocks.txt');
	const text = await res.text();
	const blocks = parseBlocks(text);
	blockLookupStore.set(blocks);
}
fetchBlocks();

const worker = new QueryWorker();
workerStore.set(worker);
sendMessage(worker, 'loadTable').then(() => {
	const getAllQuery: BoxSet[] = [{ 
		type: BoxSetType.Require,
		boxes: [
			{ name: 'Name Includes', data: '' }
		],
	}];
	
	workerIsReadyStore.set(true);
	currentQueryStore.set(getAllQuery);
});

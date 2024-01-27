import {
	workerStore,
	workerIsReadyStore,
	blockLookupStore,
	hasFirstLoadedStore,
} from './stores';
import { parseBlocks } from './utils/unicode';

import QueryWorker from './worker?worker';
import { sendMessage } from '$utils/worker';

async function fetchBlocks() {
	const res = await fetch('/UnicodeBlocks.txt');
	const text = await res.text();
	const blocks = parseBlocks(text);
	blockLookupStore.set(blocks);
}
fetchBlocks();

const worker = new QueryWorker();
workerStore.set(worker);
sendMessage(worker, { name: 'loadTable' }).then(() => {
	hasFirstLoadedStore.set(true);
	workerIsReadyStore.set(true);
});

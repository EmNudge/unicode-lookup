import {
	blockLookupStore,
	hasFirstLoadedStore,
	symbolHtmlNamesMap,
	workerIsReadyStore,
	workerStore,
} from './stores';
import { parseBlocks } from './utils/unicode';

import { sendMessage } from '$utils/worker';
import QueryWorker from './worker?worker';

async function fetchBlocks() {
	const res = await fetch('/UnicodeBlocks.txt');
	const text = await res.text();
	const blocks = parseBlocks(text);
	blockLookupStore.set(blocks);
}
fetchBlocks();

async function fetchSymbolHtmlNamesMap() {
	const text = await fetch('/SymbolHtmlNames.txt').then(res => res.text());

	const symbolNamesMap = text.split('\n').map((line) => {
		const [numStr, names] = line.split(';');
		return [parseInt(numStr, 16), names.split(',')] as [number, string[]];
	});

	symbolHtmlNamesMap.set(new Map(symbolNamesMap));
}
fetchSymbolHtmlNamesMap();

const worker = new QueryWorker();
workerStore.set(worker);
sendMessage(worker, { name: 'loadTable' }).then(() => {
	hasFirstLoadedStore.set(true);
	workerIsReadyStore.set(true);
});

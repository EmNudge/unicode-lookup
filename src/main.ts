import App from './App.svelte';
import { 
	resultsStore, currentQueryStore, workerStore, 
	workerIsReadyStore, resultsNumStore, blockLookupStore 
} from './stores';
import { parseBlocks } from './utils/unicode';

import { get } from 'svelte/store';
import * as Comlink from 'comlink';

// if('serviceWorker' in navigator) {
// 	navigator.serviceWorker
// 		.register('/pwa-worker.js')
// 		.then(() => console.log('Service Worker Registered'));
// }

currentQueryStore.subscribe(async val => {
	if (!val.length) return;
	
	const workerIsReady = get(workerIsReadyStore);
	if (!workerIsReady) return;

	const results = await get(workerStore).query(val, get(resultsNumStore));
	resultsStore.set(results);
});

async function fetchBlocks() {
	const res = await fetch('/UnicodeBlocks.txt');
	const text = await res.text();
	const blocks = parseBlocks(text);
	blockLookupStore.set(blocks);
}
fetchBlocks();

const ComWorker = Comlink.wrap(new Worker('./worker.js'));
// @ts-ignore
new ComWorker().then(async worker => {
	workerStore.set(worker);
	
	await worker.loadTable();

	workerIsReadyStore.set(true);
});

const app = new App({ target: document.body });

export default app;
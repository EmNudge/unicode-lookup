import App from './App.svelte';
import { resultsStore, currentQueryStore, workerStore, workerIsReadyStore } from './stores';
import { get } from 'svelte/store';
import * as Comlink from 'comlink';

// if('serviceWorker' in navigator) {
// 	navigator.serviceWorker
// 		.register('/pwa-worker.js')
// 		.then(() => console.log('Service Worker Registered'));
// }

currentQueryStore.subscribe(async val => {
	if (val === null) return;
	
	const workerIsReady = get(workerIsReadyStore);
	if (!workerIsReady) return;

	const results = await get(workerStore).query(val);
	resultsStore.set(results);
});

const ComWorker = Comlink.wrap(new Worker('./worker.js'));
// @ts-ignore
new ComWorker().then(async worker => {
	workerStore.set(worker);
	
	await worker.loadTable();

	workerIsReadyStore.set(true);
});

const app = new App({ target: document.body });

export default app;
import App from './App.svelte';
import { resultsStore, workerStore } from './stores';

const worker = new Worker('./worker.js');
workerStore.set(worker);

worker.postMessage({ type: 'retrieve-table'});
worker.addEventListener('message', ({ data }) => {
	const { type, payload } = data;

	if (type === 'retrieve-table') {
		console.log(payload);
		return;
	}
	if (type === 'query') {
		resultsStore.set(payload);
		console.log(payload);
		return;	
	}
});

const app = new App({	target: document.body });

export default app;
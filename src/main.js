import App from './App.svelte';
import { resultsStore, exactMatchStore, workerStore, workerIsReadyStore } from './stores';
import { loadChars } from './utils/worker'

const worker = new Worker('./worker.js');
workerStore.set(worker);

loadChars().then(() => workerIsReadyStore.set(true));

worker.addEventListener('message', ({ data }) => {
	const { type, payload } = data;
	console.log(data)

	if (type !== 'query') return;

	const { exactMatch, matches } = payload;
	resultsStore.set(matches);
	exactMatchStore.set(exactMatch);
});

const app = new App({ target: document.body });

export default app;
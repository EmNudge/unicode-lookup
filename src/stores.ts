import { writable } from 'svelte/store'

export const resultsStore = writable([]);
export const exactMatchStore = writable(null);

export const workerStore = writable(null);

export const workerIsReadyStore = writable(false);
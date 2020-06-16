import { writable } from 'svelte/store'

export const resultsStore = writable([]);
export const workerStore = writable(null);
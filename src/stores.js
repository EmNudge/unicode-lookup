import { writable } from 'svelte/store'

export const resultsStore = writable([]);
export const workerStore = writable(null);

export const popoverStore = writable({ x: 0, y: 0, content: 'Copied' });
export const showPopoverStore = writable(false);
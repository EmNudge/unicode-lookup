import { writable, derived, get } from 'svelte/store';
import type { UnicodeCharInfo, WorkerMessageWithoutId } from '$utils/types';
import { sendMessage } from '$utils/worker';
import { boxesStore, convertBoxSetToFilters } from './advancedSearch';

export const workerStore = writable<Worker | null>(null);

export const workerIsReadyStore = writable(false);
export const hasFirstLoadedStore = writable(false);

// which type of search is currently in use
export const searchModeStore = writable<'simple' | 'advanced'>('simple');
// stores for searches. We want them to persist even when they're not visible
export const easySearchStore = writable<string>('');
export const advancedSearchStore = derived((boxesStore), boxSets => convertBoxSetToFilters(boxSets));

export const resultsStore = derived(
	[easySearchStore, advancedSearchStore, workerIsReadyStore, workerStore, searchModeStore],
	([text, filters, workerIsReady, worker, searchMode], set) => {
		if (!workerIsReady || !worker) return;

		const message: WorkerMessageWithoutId =
			searchMode === 'simple'
				? { name: 'simple-query', payload: text }
				: { name: 'advanced-query', payload: filters };

		sendMessage(worker, message).then((results) => {
			const hasFirstLoaded = get(hasFirstLoadedStore);
			if (!hasFirstLoaded) hasFirstLoadedStore.set(true);

			set(results as [number, UnicodeCharInfo][]);
		});
	},
	[] as [number, UnicodeCharInfo][]
);

export type Pattern = { exclude: boolean; category: string };
export const categorySearchStore = writable<Pattern[]>([]);

export const activeIndex = writable(-1);
resultsStore.subscribe(() => activeIndex.set(-1));

export const selectedCodepoint = derived(
	[activeIndex, resultsStore],
	([activeIndex, results]) => results?.[activeIndex]?.[1]
);

export const copiedCodepoint = writable(-1);

export type Block = { range: [number, number]; name: string };
export const blockLookupStore = writable<Block[]>([]);

export const encodingMode = writable<'hex' | 'bin' | 'dec'>('hex');

// advanced search data
export * from './advancedSearch';

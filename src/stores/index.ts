import { writable } from 'svelte/store';
import type { BoxSet } from './advancedSearch';

// which type of search is currently in use
export enum SearchMode {
  SimpleSearch,
  AdvancedSearch,
}
export const searchMode = writable<SearchMode>(SearchMode.SimpleSearch);

export const resultsStore = writable<[number, string][]>([]);
resultsStore.subscribe(results => {
  if (!results.length) return;
  console.log('results:\n', results);
})

export const currentQueryStore = writable<BoxSet[]>([]);
currentQueryStore.subscribe(query => {
  if (!query.length) return;
  console.log('query:\n', query);
})

export const workerStore = writable<Worker>(null);

export const workerIsReadyStore = writable(false);

// stores for searches. We want them to persist even when they're not visible
export const easySearchStore = writable<string>('');

export type Pattern = { exclude: boolean, category: string };
export const categorySearchStore = writable<Pattern[]>([]);

export const activeIndex = writable(-1);
resultsStore.subscribe(() => activeIndex.set(-1));

export type Block = { range: [number, number], name: string };
export const blockLookupStore = writable<Block[]>(null);

export const encodingMode = writable<'hex' | 'bin' | 'dec'>('hex');

// settings menu
export * from './settings';

// advanced search data
export * from './advancedSearch';
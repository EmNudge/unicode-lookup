import { writable, get } from 'svelte/store';
import type { BoxSet } from './advancedSearch';
import type { UnicodeCharInfo } from '../worker/retrieval';

// which type of search is currently in use
export enum SearchMode {
  SimpleSearch,
  AdvancedSearch,
}
export const searchMode = writable<SearchMode>(SearchMode.SimpleSearch);

export const resultsStore = writable<[number, UnicodeCharInfo][]>([]);
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
export const hasFirstLoadedStore = writable(false);

// stores for searches. We want them to persist even when they're not visible
export const easySearchStore = writable<string>('');

export type Pattern = { exclude: boolean, category: string };
export const categorySearchStore = writable<Pattern[]>([]);

export const activeIndex = writable(-1);
resultsStore.subscribe(() => activeIndex.set(-1));

export type Block = { range: [number, number], name: string };
export const blockLookupStore = writable<Block[]>(null);

export const encodingMode = writable<'hex' | 'bin' | 'dec'>('hex');

let clipboardNotifLen = 0;
export const clipboardNotifs = writable<Symbol[]>([]);
clipboardNotifs.subscribe(notifs => {
  if (notifs.length < clipboardNotifLen) {
    clipboardNotifLen = notifs.length;
    return;
  }
  // remove the notif after a second
  setTimeout(() => {
    const notifs = get(clipboardNotifs);
    clipboardNotifs.set([...notifs.slice(1)]);
  }, 1000);
  clipboardNotifLen++;
})

// advanced search data
export * from './advancedSearch';
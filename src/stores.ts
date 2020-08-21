import { writable } from 'svelte/store';
import type { Categories } from './utils/regexBuilder';
import type { Writable } from 'svelte/store';

export const resultsStore: Writable<[number, string][]> = writable([]);
export const exactMatchStore: Writable<[number, string]> = writable(null);

export const currentQueryStore = writable(null);

export const workerStore: Writable<Worker> = writable(null);

export const workerIsReadyStore = writable(false);

// stores for searches. We want them to persist even when they're not visible
export const easySearchStore: Writable<string> = writable('');

type Pattern = { exclude: boolean, category: Categories };
export const categorySearchStore: Writable<Pattern[]> = writable([]);

export const modalOpenStore = writable(false);
type CodepointNum = "hex" | "oct" | "dec";
export const codepointTypeStore: Writable<CodepointNum> = writable("hex");
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const resultsStore: Writable<[number, string][]> = writable([]);
export const exactMatchStore: Writable<[number, string]> = writable(null);

export const currentQueryStore = writable(null);

export const workerStore: Writable<Worker> = writable(null);

export const workerIsReadyStore = writable(false);

// stores for searches. We want them to persist even when they're not visible
export const easySearchStore: Writable<string> = writable('');

type Pattern = { exclude: boolean, category: string };
export const categorySearchStore: Writable<Pattern[]> = writable([]);

// settings menu
export const modalOpenStore = writable(false);

type CodepointNum = "hex" | "oct" | "dec";
export const codepointTypeStore: Writable<CodepointNum> = writable("hex");

export enum ResultsType {
  EasySearch = 0,
  GridSearch = 1,
}
export const resultsTypeStore = writable<ResultsType>(ResultsType.EasySearch);

export const resultsNumStore = writable(50);
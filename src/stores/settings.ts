import { writable } from 'svelte/store';

export const modalOpenStore = writable(false);

type CodepointNum = "hex" | "oct" | "dec";
export const codepointTypeStore = writable<CodepointNum>("hex");

export enum ResultsType {
  EasySearch = 0,
  GridSearch = 1,
}
export const resultsTypeStore = writable<ResultsType>(ResultsType.EasySearch);

export const resultsNumStore = writable(50);

export enum CasingType {
  TitleCase,
  UPPERCASE,
  lowercase
}
export const nameCasingStore = writable<CasingType>(CasingType.UPPERCASE);
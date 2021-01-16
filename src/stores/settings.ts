import { writable } from 'svelte/store';

export const modalOpenStore = writable(false);

type CodepointNum = "hex" | "oct" | "dec";
export const codepointTypeStore = writable<CodepointNum>("hex");

export const resultsNumStore = writable(50);

export enum CasingType {
  TitleCase,
  UPPERCASE,
  lowercase
}
export const nameCasingStore = writable<CasingType>(CasingType.UPPERCASE);
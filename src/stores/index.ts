import { sendMessage } from "$utils/worker";
import { createSignal, createMemo, createEffect } from "solid-js";
import { boxesSig, convertBoxSetToFilters } from "./advancedSearch";
import type { UnicodeMapData } from "@emnudge/unicode-query";

export const [workerSig, setWorkerSig] = createSignal<Worker | null>(null);

export const [workerIsReadySig, setWorkerIsReadySig] = createSignal(false);
export const [hasFirstLoadedSig, setHasFirstLoadedSig] = createSignal(false);

// which type of search is currently in use
export const [searchModeSig, setSearchModeSig] = createSignal<"simple" | "advanced">("simple");
// stores for searches. We want them to persist even when they're not visible
export const [easySearchSig, setEasySearchSig] = createSignal<string>("");
export const advancedSearchSig = createMemo(() => convertBoxSetToFilters(boxesSig()));

// Results signal that gets updated by an effect
export const [resultsSig, setResultsSig] = createSignal<[number, UnicodeMapData][]>([]);

// Effect to fetch results when dependencies change
createEffect(() => {
  const text = easySearchSig();
  const filters = advancedSearchSig();
  const workerIsReady = workerIsReadySig();
  const worker = workerSig();
  const searchMode = searchModeSig();

  if (!workerIsReady || !worker) return;

  if (searchMode === "simple") {
    sendMessage(worker, { name: "simple-query", payload: text }).then((results) => {
      if (!hasFirstLoadedSig()) setHasFirstLoadedSig(true);
      setResultsSig(results as [number, UnicodeMapData][]);
    });
  } else {
    sendMessage(worker, { name: "advanced-query", payload: filters }).then((results) => {
      if (!hasFirstLoadedSig()) setHasFirstLoadedSig(true);
      setResultsSig(results as [number, UnicodeMapData][]);
    });
  }
});

export type Pattern = { exclude: boolean; category: string };
export const [categorySearchSig, setCategorySearchSig] = createSignal<Pattern[]>([]);

export const [activeIndexSig, setActiveIndexSig] = createSignal(-1);

// Reset activeIndex when results change
createEffect(() => {
  resultsSig(); // track results
  setActiveIndexSig(-1);
});

export const selectedCodepointSig = createMemo(() => {
  const index = activeIndexSig();
  const results = resultsSig();
  return results?.[index]?.[1];
});

export const [encodingModeSig, setEncodingModeSig] = createSignal<"hex" | "bin" | "dec">("hex");

// advanced search data
export * from "./advancedSearch";

export const [symbolHtmlNamesMapSig, setSymbolHtmlNamesMapSig] = createSignal(
  new Map<number, string[]>(),
);

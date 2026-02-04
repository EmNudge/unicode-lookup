import { sendMessage } from "$utils/worker";
import { ref, computed, watch, shallowRef, type Ref, type ShallowRef, type ComputedRef } from "vue";
import { boxes, convertBoxSetToFilters } from "./advancedSearch";
import type { UnicodeMapData } from "@emnudge/unicode-query";

export const worker: ShallowRef<Worker | null> = shallowRef(null);

export const workerIsReady: Ref<boolean> = ref(false);
export const hasFirstLoaded: Ref<boolean> = ref(false);

// which type of search is currently in use
export const searchMode: Ref<"simple" | "advanced"> = ref("simple");
// stores for searches. We want them to persist even when they're not visible
export const easySearch: Ref<string> = ref("");
export const advancedSearch: ComputedRef<ReturnType<typeof convertBoxSetToFilters>> = computed(() =>
  convertBoxSetToFilters(boxes.value),
);

// Results ref that gets updated by a watcher
export const results: ShallowRef<[number, UnicodeMapData][]> = shallowRef([]);

// Watcher to fetch results when dependencies change
watch(
  [easySearch, advancedSearch, workerIsReady, worker, searchMode],
  ([text, filters, isReady, w, mode]) => {
    if (!isReady || !w) return;

    if (mode === "simple") {
      sendMessage(w, { name: "simple-query", payload: text }).then((res) => {
        if (!hasFirstLoaded.value) hasFirstLoaded.value = true;
        results.value = res as [number, UnicodeMapData][];
      });
    } else {
      sendMessage(w, { name: "advanced-query", payload: filters }).then((res) => {
        if (!hasFirstLoaded.value) hasFirstLoaded.value = true;
        results.value = res as [number, UnicodeMapData][];
      });
    }
  },
  { immediate: true },
);

export type Pattern = { exclude: boolean; category: string };
export const categorySearch: Ref<Pattern[]> = ref([]);

export const activeIndex: Ref<number> = ref(-1);

// Reset activeIndex when results change
watch(results, () => {
  activeIndex.value = -1;
});

export const selectedCodepoint: ComputedRef<UnicodeMapData | undefined> = computed(() => {
  const index = activeIndex.value;
  const res = results.value;
  return res?.[index]?.[1];
});

export const encodingMode: Ref<"hex" | "bin" | "dec"> = ref("hex");

// advanced search data
export * from "./advancedSearch";

// command palette
export * from "./commandPalette";

export const symbolHtmlNamesMap: Ref<Map<number, string[]>> = ref(new Map<number, string[]>());

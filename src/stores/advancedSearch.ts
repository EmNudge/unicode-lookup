import { blockLookupSig } from "$stores";
import type { BidiClass, Filter } from "$utils/types";
import { PLANE_LENGTH } from "$utils/unicode";
import { createSignal } from "solid-js";

type MatchType = "Require" | "Exclude";
export type Box =
  | {
      name: "Codepoint Range";
      data: { from: number; to: number };
      matchType: MatchType;
    }
  | { name: "Name Includes"; data: string; matchType: MatchType }
  | { name: "Bidi Class"; data: string; matchType: MatchType }
  | {
      name: "Regex Match";
      data: { regex: RegExp; matchOn: "Character" | "Name" };
      matchType: MatchType;
    }
  | { name: "Unicode Block"; data: string; matchType: MatchType }
  | { name: "Unicode Property"; data: string; matchType: MatchType }
  | { name: "Unicode Plane"; data: number; matchType: MatchType };

export const getNewBox = (): Box => ({
  name: "Codepoint Range",
  data: { from: 0, to: 65535 },
  matchType: "Require",
});

export const convertBoxSetToFilters = (boxes: Box[]): Filter[] => {
  const blockLookup = blockLookupSig();
  const filters = boxes
    .filter((box) => box.data)
    .map((box) => {
      const negated = box.matchType === "Exclude";

      const { name, data } = box;
      if (name === "Codepoint Range") {
        return { type: "range", negated, value: [data.from, data.to] };
      }

      if (name === "Name Includes") {
        return { type: "name", negated, value: data.toUpperCase() };
      }

      if (name === "Regex Match") {
        if (data.matchOn === "Character") {
          return { type: "character", negated, value: data.regex.toString() };
        }
        return { type: "name", negated, value: data.regex.toString() };
      }

      if (name === "Bidi Class") {
        return { type: "bidi", negated, value: data as BidiClass };
      }

      if (name === "Unicode Property") {
        return { type: "character", negated, value: `/\\p{${data}}/` };
      }

      if (name === "Unicode Block") {
        if (!blockLookup) return;
        const range = blockLookup.find((block) => block.name === data)?.range;
        if (!range) return;
        return { type: "range", negated, value: range };
      }

      if (name === "Unicode Plane") {
        return {
          type: "range",
          negated,
          value: [PLANE_LENGTH * data, PLANE_LENGTH * data + PLANE_LENGTH],
        };
      }
    });

  return filters.filter(Boolean) as Filter[];
};

export const [boxesSig, setBoxesSig] = createSignal<Box[]>([getNewBox()]);

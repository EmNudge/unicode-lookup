import type { Filter } from "$utils/types";
import type { UnicodeMappings } from "@emnudge/unicode-query";

export const PLANE_LENGTH = 2 << 15;

export function advancedQuery(unicodeData: UnicodeMappings, filters: Filter[]) {
  // fix regex not passing through worker
  filters = filters.map((filter) => {
    if (filter.type !== "name" && filter.type !== "character") return filter;

    const match = (filter.value as string)?.match(/^\/(.+)\/[a-z]*$/);
    if (!match) return filter;

    const regex = new RegExp(match[1], "ui");
    return { ...filter, value: regex };
  });

  let data = [...unicodeData.unicodeData.values()];

  for (const filter of filters) {
    data = data.filter((val) => {
      if (filter.type === "name") {
        if (typeof filter.value === "string") {
          // note: include oldName
          return filter.negated
            ? !val.label.includes(filter.value)
            : val.label.includes(filter.value);
        }
        return filter.negated ? !filter.value.test(val.label) : filter.value.test(val.label);
      }

      if (filter.type === "character") {
        const char = String.fromCodePoint(val.codepoint);
        return filter.negated ? !filter.value.test(char) : filter.value.test(char);
      }

      if (filter.type === "range") {
        const [min, max] = filter.value;
        return filter.negated
          ? !(val.codepoint >= min && val.codepoint <= max)
          : val.codepoint >= min && val.codepoint <= max;
      }

      if (filter.type === "bidi") {
        return filter.negated ? val.bidiClass !== filter.value : val.bidiClass === filter.value;
      }

      throw new Error(`Unknown filter type: ${(filter as any).type}`);
    });
  }

  return data;
}

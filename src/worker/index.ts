import type { WorkerAPI, WorkerMessageRequest, WorkerMessageResponse } from "$utils/types";
import { advancedQuery } from "./advancedQuery";
import { deserialize, simpleQuery, type UnicodeMappings } from "@emnudge/unicode-query";

/**
 * Expands First/Last range markers in UnicodeData.txt format.
 *
 * The Unicode data file uses range markers like:
 *   3400;<CJK Ideograph Extension A, First>;Lo;0;L;;;;;N;;;;;
 *   4DBF;<CJK Ideograph Extension A, Last>;Lo;0;L;;;;;N;;;;;
 *
 * This function expands these to include all codepoints in the range.
 */
function expandUnicodeRanges(unicodeData: string): string {
  const lines = unicodeData.split("\n");
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      result.push(line);
      continue;
    }

    const parts = line.split(";");
    const label = parts[1] || "";

    // Check if this is a "First" range marker
    if (label.includes(", First>")) {
      // Look for the corresponding "Last" marker on the next line
      const nextLine = lines[i + 1];
      if (nextLine) {
        const nextParts = nextLine.split(";");
        const nextLabel = nextParts[1] || "";

        if (nextLabel.includes(", Last>")) {
          const startCodepoint = parseInt(parts[0], 16);
          const endCodepoint = parseInt(nextParts[0], 16);

          // Extract the base name (e.g., "CJK Ideograph Extension A" from "<CJK Ideograph Extension A, First>")
          const baseName = label.replace(/^</, "").replace(/, First>$/, "");

          // Generate entries for all codepoints in the range
          for (let cp = startCodepoint; cp <= endCodepoint; cp++) {
            const cpHex = cp.toString(16).toUpperCase().padStart(4, "0");
            // Create a new entry with the base name and codepoint
            const newParts = [...parts];
            newParts[0] = cpHex;
            newParts[1] = `<${baseName}-${cpHex}>`;
            result.push(newParts.join(";"));
          }

          // Skip the "Last" line since we've processed the range
          i++;
          continue;
        }
      }
    }

    // Not a range marker, keep the line as-is
    result.push(line);
  }

  return result.join("\n");
}

let unicodeMappingsCache: UnicodeMappings | null = null;
async function init() {
  if (!unicodeMappingsCache) {
    const [blocks, unicodeData, symbolHtmlNames] = await Promise.all(
      ["/UnicodeBlocks.txt", "/UnicodeData.txt", "/SymbolHtmlNames.txt"].map((path) =>
        fetch(path).then((res) => res.text()),
      ),
    );

    unicodeMappingsCache = deserialize({
      blocks,
      unicodeData: expandUnicodeRanges(unicodeData),
      symbolHtmlNames,
    });
  }

  return unicodeMappingsCache;
}

const handleMessage = async <T extends keyof WorkerAPI>(
  message: WorkerMessageRequest<T>,
): Promise<WorkerMessageResponse<T> | undefined> => {
  const { name } = message;

  if (message.name === "load-table") {
    return await init();
  }

  if (message.name === "simple-query") {
    const unicodeMappings = await init();

    const { payload } = message as WorkerMessageRequest<"simple-query">;

    return simpleQuery(unicodeMappings, payload).map((data) => [data.codepoint, data]);
  }

  if (name === "advanced-query") {
    const unicodeMappings = await init();

    const { payload } = message as WorkerMessageRequest<"advanced-query">;

    return advancedQuery(unicodeMappings, payload).map((data) => [data.codepoint, data]);
  }
};

addEventListener("message", async (e: { data: WorkerMessageRequest }) => {
  self.postMessage({
    id: e.data.id,
    payload: await handleMessage(e.data),
  });
});

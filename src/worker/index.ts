import type { WorkerAPI, WorkerMessageRequest, WorkerMessageResponse } from "$utils/types";
import { advancedQuery } from "./advancedQuery";
import { deserialize, simpleQuery, type UnicodeMappings } from "@emnudge/unicode-query";

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
      unicodeData,
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

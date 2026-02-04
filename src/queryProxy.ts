import { blockLookup, hasFirstLoaded, symbolHtmlNamesMap, workerIsReady, worker } from "./stores";
import { parseBlocks } from "./utils/unicode";

import { sendMessage } from "$utils/worker";
import QueryWorker from "./worker?worker";

async function fetchBlocks() {
  const res = await fetch("/UnicodeBlocks.txt");
  const text = await res.text();
  const blocks = parseBlocks(text);
  blockLookup.value = blocks;
}
fetchBlocks();

async function fetchSymbolHtmlNamesMap() {
  const text = await fetch("/SymbolHtmlNames.txt").then((res) => res.text());

  const symbolNamesArr = text.split("\n").map((line) => {
    const [numStr, names] = line.split(";");
    return [parseInt(numStr!, 16), names!.split(",")] as [number, string[]];
  });

  symbolHtmlNamesMap.value = new Map(symbolNamesArr);
}
fetchSymbolHtmlNamesMap();

const queryWorker = new QueryWorker();
worker.value = queryWorker;
sendMessage(queryWorker, { name: "loadTable" }).then(() => {
  hasFirstLoaded.value = true;
  workerIsReady.value = true;
});

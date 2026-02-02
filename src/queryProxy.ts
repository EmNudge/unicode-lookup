import {
  setBlockLookupSig,
  setHasFirstLoadedSig,
  setSymbolHtmlNamesMapSig,
  setWorkerIsReadySig,
  setWorkerSig,
} from "./stores";
import { parseBlocks } from "./utils/unicode";

import { sendMessage } from "$utils/worker";
import QueryWorker from "./worker?worker";

async function fetchBlocks() {
  const res = await fetch("/UnicodeBlocks.txt");
  const text = await res.text();
  const blocks = parseBlocks(text);
  setBlockLookupSig(blocks);
}
fetchBlocks();

async function fetchSymbolHtmlNamesMap() {
  const text = await fetch("/SymbolHtmlNames.txt").then((res) => res.text());

  const symbolNamesMap = text.split("\n").map((line) => {
    const [numStr, names] = line.split(";");
    return [parseInt(numStr!, 16), names!.split(",")] as [number, string[]];
  });

  setSymbolHtmlNamesMapSig(new Map(symbolNamesMap));
}
fetchSymbolHtmlNamesMap();

const worker = new QueryWorker();
setWorkerSig(worker);
sendMessage(worker, { name: "loadTable" }).then(() => {
  setHasFirstLoadedSig(true);
  setWorkerIsReadySig(true);
});

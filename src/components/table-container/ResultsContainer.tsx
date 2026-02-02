import { createSignal, createMemo, createEffect, onCleanup, For } from "solid-js";
import { css } from "solid-styled";
import { ResultsRow } from "./ResultsRow";
import { activeIndexSig, setActiveIndexSig, resultsSig } from "$stores";

export function ResultsContainer() {
  const [resultsNum, setResultsNum] = createSignal(50);
  let intersectionObserver: HTMLDivElement | undefined;

  // Reset resultsNum when results change
  createEffect(() => {
    resultsSig();
    setResultsNum(50);
  });

  // Intersection observer for infinite scroll
  createEffect(() => {
    if (!intersectionObserver) return;

    const intObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        if (resultsSig().length > resultsNum()) {
          setResultsNum((n) => n + 50);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.8,
      },
    );

    intObserver.observe(intersectionObserver);
    onCleanup(() => intObserver.disconnect());
  });

  const shownResults = createMemo(() => resultsSig().slice(0, resultsNum()));

  function handleFocus(e: FocusEvent) {
    const index = (e.target as Element).querySelector("img")?.dataset.index;
    if (!index) return;
    setActiveIndexSig(Number(index));
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "ArrowDown" && activeIndexSig() < resultsSig().length - 1) {
      setActiveIndexSig((i: number) => i + 1);
    } else if (e.key === "ArrowUp" && activeIndexSig() >= 0) {
      setActiveIndexSig((i: number) => i - 1);
    }
  }

  css`
    .table {
      text-align: left;
    }
    p {
      text-align: left;
      margin: 0;
      opacity: 0.7;
      font-size: 0.8rem;
    }
    .intersection-observer {
      height: 5rem;
    }
  `;

  return (
    <>
      <p>
        {resultsSig().length} result{resultsSig().length > 1 ? "s" : ""}
      </p>

      <div class="table" role="table" onFocusIn={handleFocus} onKeyDown={handleKeydown}>
        <For each={shownResults()}>
          {([codepoint, info], i) => <ResultsRow index={i()} codepoint={codepoint} info={info} />}
        </For>

        <div class="intersection-observer" ref={intersectionObserver} />
      </div>
    </>
  );
}

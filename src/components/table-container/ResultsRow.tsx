import { createEffect } from "solid-js";
import { css } from "solid-styled";
import { activeIndexSig, setActiveIndexSig } from "$stores";
import { getCodepoint } from "$utils/char";
import type { UnicodeMapData } from "@emnudge/unicode-query";

interface ResultsRowProps {
  codepoint: number;
  info: UnicodeMapData;
  index: number;
}

export function ResultsRow(props: ResultsRowProps) {
  let rowEl: HTMLButtonElement | undefined;

  createEffect(() => {
    if (activeIndexSig() === props.index) {
      rowEl?.focus();
    }
  });

  css`
    .row {
      border: 1px solid transparent;
      width: 100%;
      background-color: var(--bg-offset);
      position: relative;
    }
    .row:after {
      content: attr(data-codepoint);
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0.5rem;
      opacity: 0.5;
      font-size: 0.8rem;
    }
    .row.active {
      border: 1px solid blue;
    }
    .content {
      width: 100%;
      padding: 0.5rem;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 1rem;
    }
    .symbol {
      width: 2rem;
      text-align: center;
    }
    .symbol::before,
    .symbol::after {
      content: '"';
    }
    .name {
      text-align: left;
      opacity: 0.75;
    }
  `;

  return (
    <button
      ref={rowEl}
      class={`row ${activeIndexSig() === props.index ? "active" : ""}`}
      onClick={() => {
        setActiveIndexSig(props.index);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        navigator.clipboard.writeText(String.fromCodePoint(props.codepoint));
        // TODO: Add toast notification
        rowEl?.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(0.95)" },
            { transform: "scale(1.02)" },
            { transform: "scale(1)" },
          ],
          {
            duration: 400,
            iterations: 1,
            easing: "ease-out",
          },
        );
      }}
      tabindex="0"
      data-codepoint={getCodepoint(props.codepoint)}
    >
      <div class="content">
        <div class="symbol">
          <span>{String.fromCodePoint(props.codepoint)}</span>
        </div>

        <div class="name">
          <span>{props.info.label.toLowerCase()}</span>
        </div>
      </div>
    </button>
  );
}

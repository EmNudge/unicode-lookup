import { onMount, For } from "solid-js";
import { css } from "solid-styled";
import { BoxSet } from "./BoxSet";
import { Button } from "./Button";
import { boxesSig, setBoxesSig, getNewBox, type Box } from "$stores";

interface AdvancedSearchProps {
  onSearch?: () => void;
}

export function AdvancedSearch(_props: AdvancedSearchProps) {
  const onClose = (index: number) => () => {
    setBoxesSig((boxes: Box[]) => [...boxes.slice(0, index), ...boxes.slice(index + 1)]);
  };

  const updateBox = (index: number) => (box: Box) => {
    setBoxesSig((boxes: Box[]) => [...boxes.slice(0, index), box, ...boxes.slice(index + 1)]);
  };

  onMount(() => {
    if (boxesSig().length === 0) {
      setBoxesSig([getNewBox()]);
    }
  });

  css`
    .buttons {
      display: flex;
      justify-content: flex-end;
    }
    .buttons :global(*) {
      margin: 5px;
    }
  `;

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <For each={boxesSig()}>
          {(box, i) => <BoxSet box={box} onBoxChange={updateBox(i())} onClose={onClose(i())} />}
        </For>
      </form>

      <div class="buttons">
        <Button onClick={() => setBoxesSig((boxes: Box[]) => [...boxes, getNewBox()])}>
          Add Rule
        </Button>
      </div>
    </>
  );
}

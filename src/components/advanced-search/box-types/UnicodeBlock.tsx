import { createSignal, createEffect, createMemo } from "solid-js";
import { Dropdown } from "../Dropdown";
import { blockLookupSig } from "$stores";

interface UnicodeBlockProps {
  data?: string;
  onDataChange?: (data: string) => void;
}

export function UnicodeBlock(props: UnicodeBlockProps) {
  const blockNames = createMemo(() => blockLookupSig().map((block) => block.name));
  const [shouldSort, setShouldSort] = createSignal(true);
  const [blockName, setBlockName] = createSignal<string>("");

  const blocks = createMemo(() => (shouldSort() ? [...blockNames()].sort() : blockNames()));

  // Initialize with first block name
  createEffect(() => {
    const names = blockNames();
    if (names.length > 0 && !blockName()) {
      setBlockName(names[0]!);
    }
  });

  createEffect(() => {
    if (blockName()) {
      props.onDataChange?.(blockName());
    }
  });

  return (
    <>
      <Dropdown options={blocks()} hue={35} value={blockName()} onChange={setBlockName} />

      <label>
        <span>Sort Blocks Alphabetically</span>
        <input
          type="checkbox"
          checked={shouldSort()}
          onChange={(e) => setShouldSort(e.currentTarget.checked)}
        />
      </label>
    </>
  );
}

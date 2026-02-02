import { createSignal, createEffect } from "solid-js";
import { BidiClassMap } from "$utils/unicode";
import { Dropdown } from "../Dropdown";

interface BidiClassProps {
  data?: string;
  onDataChange?: (data: string) => void;
}

const displayToBidiMap = new Map(
  [...BidiClassMap.entries()].map(([className, displayName]) => {
    return [`${className} (${displayName})`, className];
  }),
);
const names = [...displayToBidiMap.keys()];

export function BidiClass(props: BidiClassProps) {
  const [displayName, setDisplayName] = createSignal<string>(names[0]!);

  createEffect(() => {
    const bidiClass = displayToBidiMap.get(displayName());
    if (bidiClass) {
      props.onDataChange?.(bidiClass);
    }
  });

  return <Dropdown options={names} hue={35} value={displayName()} onChange={setDisplayName} />;
}

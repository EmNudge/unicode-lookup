import { createSignal, createEffect } from "solid-js";
import { Dropdown } from "../Dropdown";
import { planeMap } from "$utils/unicode";

interface UnicodePlaneProps {
  data?: number;
  onDataChange?: (data: number) => void;
}

const nameToNumMap = new Map<string, number>(
  Array.from({ length: 17 }).map((_, i) => {
    const name = planeMap.get(i) || "Unassigned";
    return [`(${i}) ${name}`, i];
  }),
);
const names = [...nameToNumMap.keys()];

export function UnicodePlane(props: UnicodePlaneProps) {
  const [activeName, setActiveName] = createSignal(names[0]!);

  createEffect(() => {
    const planeNum = nameToNumMap.get(activeName());
    if (planeNum !== undefined) {
      props.onDataChange?.(planeNum);
    }
  });

  return <Dropdown options={names} hue={35} value={activeName()} onChange={setActiveName} />;
}

import { createSignal, createEffect } from "solid-js";
import { NumberInput } from "../NumberInput";

interface CodepointRangeProps {
  data?: { from: number; to: number };
  onDataChange?: (data: { from: number; to: number }) => void;
}

export function CodepointRange(props: CodepointRangeProps) {
  const [from, setFrom] = createSignal(props.data?.from ?? 0);
  const [to, setTo] = createSignal(props.data?.to ?? 65535);

  createEffect(() => {
    props.onDataChange?.({ from: from(), to: to() });
  });

  return (
    <div>
      <span>From</span>
      <NumberInput value={from()} onChange={setFrom} />
      <span>To</span>
      <NumberInput value={to()} onChange={setTo} />
    </div>
  );
}

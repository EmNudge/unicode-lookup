import { createSignal, createEffect } from "solid-js";
import { css } from "solid-styled";

interface NumberInputProps {
  value?: number;
  type?: "dec" | "hex" | "bin";
  onChange?: (value: number) => void;
}

function parseHex(hex: string) {
  if (!/^[A-Fa-f0-9]+$/.test(hex)) return NaN;
  return parseInt(hex, 16);
}

function parseBin(bin: string) {
  if (!/^[01]+$/.test(bin)) return NaN;
  return parseInt(bin, 2);
}

function getValue(type: string | undefined, text: string | number) {
  if (type === "hex") return parseHex(String(text));
  if (type === "bin") return parseBin(String(text));
  return Number(text);
}

function getText(type: string | undefined, value: number) {
  if (type === "hex") return value.toString(16);
  if (type === "bin") return value.toString(2);
  return String(value);
}

function* cycle<T>(arr: T[]) {
  while (true) {
    yield* arr;
  }
}

export function NumberInput(props: NumberInputProps) {
  const [currText, setCurrText] = createSignal<string | number>(props.value ?? 0);
  const [errText, setErrText] = createSignal("");
  const [type, setType] = createSignal<"dec" | "hex" | "bin">(props.type ?? "dec");

  const typeIter = cycle(["hex", "bin", "dec"] as const);

  createEffect(() => {
    const newVal = getValue(type(), currText());
    if (Number.isNaN(newVal)) {
      setErrText("Invalid input");
    } else {
      setErrText("");
      props.onChange?.(newVal);
    }
  });

  function changeType() {
    const nextType = typeIter.next().value;
    if (nextType) {
      setType(nextType);
      const currentVal = getValue(type(), currText());
      if (!Number.isNaN(currentVal)) {
        setCurrText(getText(nextType, currentVal));
      }
    }
  }

  css`
    p {
      margin: 0;
      color: red;
    }
  `;

  return (
    <>
      <div>
        <input
          class="styled"
          style="--hue: 35"
          type="text"
          value={currText()}
          onInput={(e) => setCurrText(e.currentTarget.value)}
        />
        <button class="styled" style="--hue: 35" onClick={changeType}>
          {type()}
        </button>
      </div>
      <p>{errText()}</p>
    </>
  );
}

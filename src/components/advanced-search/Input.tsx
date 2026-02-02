import { createSignal, createEffect } from "solid-js";
import { css } from "solid-styled";

type Mutator = (text: string) => any;
type Validator = (text: string, mutatedValue: any) => string | true;

interface InputProps {
  value?: any;
  mutator?: Mutator;
  validator?: Validator;
  hue?: number;
  placeholder?: string;
  onChange?: (value: any) => void;
}

export function Input(props: InputProps) {
  const [text, setText] = createSignal(props.value ?? "");
  const [errText, setErrText] = createSignal("");

  createEffect(() => {
    const mutator = props.mutator ?? ((t: any) => t);
    const validator = props.validator ?? (() => true);

    const newValue = mutator(text());
    const isValid = validator(text(), newValue);

    if (isValid === true) {
      props.onChange?.(newValue);
      setErrText("");
    } else {
      setErrText(isValid);
    }
  });

  css`
    p {
      color: red;
    }
  `;

  return (
    <>
      <input
        class="styled"
        style={`--hue: ${props.hue ?? 35}`}
        type="text"
        autocorrect="off"
        placeholder={props.placeholder}
        value={text()}
        onInput={(e) => setText(e.currentTarget.value)}
      />
      <p>{errText()}</p>
    </>
  );
}

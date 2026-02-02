import { createSignal, createEffect, Show } from "solid-js";
import { Dropdown } from "../Dropdown";
import { properties, scripts } from "$utils/unicode";

interface UnicodePropertyProps {
  data?: string;
  onDataChange?: (data: string) => void;
}

export function UnicodeProperty(props: UnicodePropertyProps) {
  const [activeProperty, setActiveProperty] = createSignal(properties[0]!);
  const [activeScript, setActiveScript] = createSignal(scripts[0]!);

  createEffect(() => {
    if (activeProperty() === "Script") {
      props.onDataChange?.(`Script=${activeScript()}`);
    } else {
      props.onDataChange?.(activeProperty());
    }
  });

  return (
    <>
      <Dropdown
        options={properties}
        hue={35}
        value={activeProperty()}
        onChange={setActiveProperty}
      />

      <Show when={activeProperty() === "Script"}>
        <Dropdown options={scripts} hue={35} value={activeScript()} onChange={setActiveScript} />
      </Show>
    </>
  );
}

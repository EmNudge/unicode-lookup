import { createSignal, createEffect } from "solid-js";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";

type Data = { regex: RegExp; matchOn: "Character" | "Name" };

interface RegexMatchProps {
  data?: Data;
  onDataChange?: (data: Data) => void;
}

export function getRegexFromString(text: string) {
  const res = text.match(/^\/(.+)\/([A-Za-z]*)$/);
  if (!res) return null;

  const [, regex, flags] = res;
  try {
    return new RegExp(regex!, flags);
  } catch {
    return null;
  }
}

export function RegexMatch(props: RegexMatchProps) {
  const [regex, setRegex] = createSignal("/[A-Za-z]/u");
  const [matchOn, setMatchOn] = createSignal<"Character" | "Name">("Character");

  createEffect(() => {
    const regexObj = getRegexFromString(regex());
    if (regexObj) {
      props.onDataChange?.({ regex: regexObj, matchOn: matchOn() });
    }
  });

  function validateRegex(text: string) {
    if (getRegexFromString(text)) return true;
    return "invalid regex";
  }

  return (
    <>
      <span>Regex</span>
      <Input
        placeholder="regular expression"
        validator={validateRegex}
        value={regex()}
        onChange={setRegex}
      />

      <span>Match On</span>
      <Dropdown
        options={["Character", "Name"]}
        hue={35}
        value={matchOn()}
        onChange={(v) => setMatchOn(v as "Character" | "Name")}
      />
    </>
  );
}

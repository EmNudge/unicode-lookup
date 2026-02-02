import { createSignal, createEffect } from "solid-js";
import { Input } from "../Input";

interface NameIncludesProps {
  data?: string;
  onDataChange?: (data: string) => void;
}

export function NameIncludes(props: NameIncludesProps) {
  const [text, setText] = createSignal(props.data ?? "symbol");

  createEffect(() => {
    props.onDataChange?.(text());
  });

  function validator(text: string) {
    if (/^[A-Za-z0-9 ()<>,-]+$/.test(text)) return true;
    return "Impossible name";
  }

  return <Input placeholder="text" validator={validator} value={text()} onChange={setText} />;
}

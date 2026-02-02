import { createSignal, onMount, onCleanup, For } from "solid-js";
import { css } from "solid-styled";

export function Loader() {
  const [str, setStr] = createSignal("xxxxxx");

  onMount(() => {
    const id = setInterval(() => {
      const codepoint = Math.floor(Math.random() * 0xfff);
      const char = String.fromCodePoint(codepoint);

      const index = Math.floor(Math.random() * str().length);
      setStr((s) => s.slice(0, index) + char + s.slice(index + 1));
    }, 50);

    onCleanup(() => clearInterval(id));
  });

  css`
    section {
      text-align: center;
      padding-top: 50px;
    }
    .chars span {
      display: inline-block;
      width: 25px;
      text-align: center;
      line-height: 1em;
    }
  `;

  return (
    <section>
      <h2>Fetching Data</h2>
      <br />
      <div class="chars">
        <For each={Array.from(str())}>{(char) => <span>{char}</span>}</For>
      </div>
    </section>
  );
}

import { Show } from "solid-js";
import { css } from "solid-styled";
import { searchModeSig, setSearchModeSig } from "$stores";
import { FilterIcon } from "$icons/filter";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header() {
  function toggleSearchMode() {
    setSearchModeSig((mode: "simple" | "advanced") =>
      mode === "advanced" ? "simple" : "advanced",
    );
  }

  css`
    header {
      display: flex;
      justify-content: space-between;
      max-width: 600px;
      margin: 20px auto;
      display: flex;
      align-items: center;
    }
    h1 {
      font-size: 1.7em;
    }
    .buttons {
      display: flex;
    }
    button {
      cursor: pointer;
      margin: 0;
      z-index: 2;
      padding: 10px 20px;
    }
    .active {
      color: var(--hsl-bg);
      background: var(--hsl);
      transition: 0.25s;
    }
    button:focus {
      border: 1px solid var(--hsl);
    }
  `;

  return (
    <header>
      <div class="text">
        <h1>Unicode Lookup</h1>
        <Show when={searchModeSig() === "simple"} fallback={<h3>Advanced Search</h3>}>
          <h3>Simple Search</h3>
        </Show>
      </div>

      <div class="buttons">
        <ThemeSwitcher />
        <button
          class={`styled ${searchModeSig() === "advanced" ? "active" : ""}`}
          onClick={toggleSearchMode}
        >
          <FilterIcon active={searchModeSig() === "advanced"} />
        </button>
      </div>
    </header>
  );
}

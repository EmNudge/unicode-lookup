import { createSignal, onMount, onCleanup, Show } from "solid-js";
import { css } from "solid-styled";
import { easySearchSig, setEasySearchSig } from "$stores";
import { debounce } from "$utils/debounce";

interface EasySearchProps {
  onSearch?: () => void;
}

export function EasySearch(props: EasySearchProps) {
  const [error, setError] = createSignal("");
  let inputEl: HTMLInputElement | undefined;

  const search = debounce(() => props.onSearch?.(), 100);

  function hasRegexError(text: string) {
    const regexRes = text.match(/\/(.+?)\/([a-z]+)?/);
    if (!regexRes) return false;

    const [, regStr, flags] = regexRes;

    try {
      new RegExp(regStr!, flags);
      return false;
    } catch {
      return true;
    }
  }

  function trySearch() {
    if (hasRegexError(easySearchSig())) {
      setError("Regex Error. Please verify search text.");
      return;
    }
    setError("");
    search();
  }

  function handleKeyDown(e: KeyboardEvent) {
    const inputIsFocused = document.activeElement === inputEl;
    if (inputIsFocused) return;

    if (e.key.length > 1 || /\p{C}/u.test(e.key)) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key === " ") {
      e.preventDefault();
      return;
    }

    inputEl?.focus();
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  css`
    input {
      width: 90%;
      margin: 0 auto;
      border: 1px solid transparent;
      box-shadow: -3px 4px 2px #0000000f;
    }
    :global(:root[data-theme="dark"]) input {
      background-color: #151515;
      color: white;
      border: 1px solid #6b6b6b;
      box-shadow: 1px 1px 1px 2px #0000006e;
    }
    input::-webkit-input-placeholder {
      opacity: 0.5;
    }
    input:focus {
      outline: 1px solid #a5b5ff;
      box-shadow: -3px 4px 2px #894aff0f;
    }
  `;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        trySearch();
      }}
    >
      <input
        ref={inputEl}
        type="text"
        placeholder="Search..."
        value={easySearchSig()}
        onInput={(e) => {
          setEasySearchSig(e.currentTarget.value);
          trySearch();
        }}
      />

      <Show when={error()}>
        <br />
        <span style="color: red">{error()}</span>
      </Show>
    </form>
  );
}

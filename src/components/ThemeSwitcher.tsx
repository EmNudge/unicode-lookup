import { createSignal, onMount, onCleanup } from "solid-js";
import { css } from "solid-styled";
import { SunIcon } from "$icons/sun";

export function ThemeSwitcher() {
  const [isDarkTheme, setIsDarkTheme] = createSignal(false);

  const updateTheme = (darkTheme: boolean) => {
    const newTheme = darkTheme ? "dark" : "light";
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("color-scheme", newTheme);
  };

  const getColorSchemeLS = () => localStorage.getItem("color-scheme") as "dark" | "light" | null;

  onMount(() => {
    const colorSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const onColorSchemeChange = (e: MediaQueryListEvent) => {
      if (getColorSchemeLS()) return;
      setIsDarkTheme(e.matches);
    };
    colorSchemeMedia.addEventListener("change", onColorSchemeChange);

    const colorSchemeLS = getColorSchemeLS();
    if (colorSchemeLS) {
      setIsDarkTheme(colorSchemeLS === "dark");
    } else {
      const isSystemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkTheme(isSystemDarkTheme);
    }

    updateTheme(isDarkTheme());

    onCleanup(() => colorSchemeMedia.removeEventListener("change", onColorSchemeChange));
  });

  const toggleTheme = () => {
    const newValue = !isDarkTheme();
    setIsDarkTheme(newValue);
    updateTheme(newValue);
  };

  css`
    button {
      cursor: pointer;
      margin: 0;
      background: none;
      border: none;
      padding: 0 10px;
      opacity: 0.6;
    }
    button:active {
      transform: scale(0.9);
    }
  `;

  return (
    <button onClick={toggleTheme}>
      <SunIcon />
    </button>
  );
}

import { ref, onMounted, onUnmounted } from "vue";

const isDarkTheme = ref(false);

let initialized = false;
let colorSchemeMedia: MediaQueryList | null = null;

const updateTheme = (darkTheme: boolean) => {
  const newTheme = darkTheme ? "dark" : "light";
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem("color-scheme", newTheme);
};

const getColorSchemeLS = () => localStorage.getItem("color-scheme") as "dark" | "light" | null;

const onColorSchemeChange = (e: MediaQueryListEvent) => {
  if (getColorSchemeLS()) return;
  isDarkTheme.value = e.matches;
  updateTheme(isDarkTheme.value);
};

export function useTheme() {
  onMounted(() => {
    if (!initialized) {
      colorSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
      colorSchemeMedia.addEventListener("change", onColorSchemeChange);

      const colorSchemeLS = getColorSchemeLS();
      if (colorSchemeLS) {
        isDarkTheme.value = colorSchemeLS === "dark";
      } else {
        isDarkTheme.value = colorSchemeMedia.matches;
      }

      updateTheme(isDarkTheme.value);
      initialized = true;
    }
  });

  onUnmounted(() => {
    // Only remove listener if we added it
    // Note: In a real app with HMR, you might want more sophisticated cleanup
  });

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
    updateTheme(isDarkTheme.value);
  };

  const setTheme = (theme: "light" | "dark") => {
    isDarkTheme.value = theme === "dark";
    updateTheme(isDarkTheme.value);
  };

  return {
    isDarkTheme,
    toggleTheme,
    setTheme,
  };
}

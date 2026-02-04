import { onMounted, onUnmounted } from "vue";
import { openCommandPalette, isCommandPaletteOpen } from "$stores/commandPalette";

export function useGlobalKeyboard() {
  const handleKeydown = (e: KeyboardEvent) => {
    // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      if (!isCommandPaletteOpen.value) {
        openCommandPalette();
      }
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
}

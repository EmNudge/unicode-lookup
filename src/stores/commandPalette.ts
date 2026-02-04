import { ref, computed, type Ref, type ComputedRef } from "vue";

export interface Command {
  id: string;
  name: string;
  description?: string;
  shortcut?: string;
  category?: string;
  action: () => void;
}

const commands: Ref<Command[]> = ref([]);

export const isCommandPaletteOpen: Ref<boolean> = ref(false);
export const searchQuery: Ref<string> = ref("");
export const selectedIndex: Ref<number> = ref(0);

export const filteredCommands: ComputedRef<Command[]> = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) {
    return commands.value;
  }
  return commands.value.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(query) ||
      cmd.description?.toLowerCase().includes(query) ||
      cmd.category?.toLowerCase().includes(query),
  );
});

export function registerCommand(cmd: Command) {
  // Avoid duplicates
  if (!commands.value.find((c) => c.id === cmd.id)) {
    commands.value.push(cmd);
  }
}

export function unregisterCommand(id: string) {
  const index = commands.value.findIndex((c) => c.id === id);
  if (index !== -1) {
    commands.value.splice(index, 1);
  }
}

export function openCommandPalette() {
  searchQuery.value = "";
  selectedIndex.value = 0;
  isCommandPaletteOpen.value = true;
}

export function closeCommandPalette() {
  isCommandPaletteOpen.value = false;
}

export function executeCommand(cmd: Command) {
  cmd.action();
  closeCommandPalette();
}

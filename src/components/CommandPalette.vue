<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { Modal } from "$lib/components/overlay";
import {
  isCommandPaletteOpen,
  searchQuery,
  selectedIndex,
  filteredCommands,
  closeCommandPalette,
  executeCommand,
  registerCommand,
  unregisterCommand,
  type Command,
} from "$stores/commandPalette";
import { searchMode } from "$stores";
import { useTheme } from "$src/composables/useTheme";

const { toggleTheme, isDarkTheme } = useTheme();

const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLDivElement | null>(null);

// Register default commands
onMounted(() => {
  registerCommand({
    id: "toggle-theme",
    name: "Toggle Theme",
    description: "Switch between light and dark mode",
    shortcut: "",
    category: "Appearance",
    action: toggleTheme,
  });

  registerCommand({
    id: "toggle-search-mode",
    name: "Toggle Search Mode",
    description: "Switch between simple and advanced search",
    category: "Search",
    action: () => {
      searchMode.value = searchMode.value === "advanced" ? "simple" : "advanced";
    },
  });
});

onUnmounted(() => {
  unregisterCommand("toggle-theme");
  unregisterCommand("toggle-search-mode");
});

// Focus input when modal opens
watch(isCommandPaletteOpen, (open) => {
  if (open) {
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
});

// Reset selected index when filtered results change
watch(filteredCommands, () => {
  selectedIndex.value = 0;
});

// Scroll selected item into view
watch(selectedIndex, (index) => {
  nextTick(() => {
    const list = listRef.value;
    if (!list) return;
    const items = list.querySelectorAll(".command-item");
    const item = items[index] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  });
});

const handleKeydown = (e: KeyboardEvent) => {
  const commands = filteredCommands.value;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      selectedIndex.value = (selectedIndex.value + 1) % commands.length;
      break;
    case "ArrowUp":
      e.preventDefault();
      selectedIndex.value = (selectedIndex.value - 1 + commands.length) % commands.length;
      break;
    case "Enter":
      e.preventDefault();
      if (commands[selectedIndex.value]) {
        executeCommand(commands[selectedIndex.value]);
      }
      break;
  }
};

const handleItemClick = (cmd: Command) => {
  executeCommand(cmd);
};

const handleItemHover = (index: number) => {
  selectedIndex.value = index;
};
</script>

<template>
  <Modal :open="isCommandPaletteOpen" @close="closeCommandPalette">
    <div class="command-palette">
      <div class="search-container">
        <input
          ref="inputRef"
          v-model="searchQuery"
          type="text"
          placeholder="Type a command..."
          class="search-input"
          @keydown="handleKeydown"
        />
      </div>

      <div ref="listRef" class="command-list">
        <template v-if="filteredCommands.length">
          <button
            v-for="(cmd, index) in filteredCommands"
            :key="cmd.id"
            :class="['command-item', index === selectedIndex && 'selected']"
            @click="handleItemClick(cmd)"
            @mouseenter="handleItemHover(index)"
          >
            <div class="command-info">
              <span class="command-name">{{ cmd.name }}</span>
              <span v-if="cmd.description" class="command-description">{{ cmd.description }}</span>
            </div>
            <span v-if="cmd.shortcut" class="command-shortcut">{{ cmd.shortcut }}</span>
          </button>
        </template>
        <div v-else class="no-results">No commands found</div>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.command-palette {
  width: 500px;
  max-width: 90vw;
}

.search-container {
  padding: var(--space-3);
  border-bottom: var(--border-width-1) solid var(--color-border);
}

.search-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: none;
  background: var(--color-bg-offset);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  color: var(--color-text);
  outline: none;
  box-sizing: border-box;
}

.search-input::placeholder {
  color: var(--color-text-tertiary);
}

.command-list {
  max-height: 400px;
  overflow-y: auto;
  padding: var(--space-2);
}

.command-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  color: var(--color-text);
  transition: background var(--duration-fast) var(--ease-out);
}

.command-item:hover,
.command-item.selected {
  background: var(--color-bg);
}

.command-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.command-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.command-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.command-shortcut {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  background: var(--color-bg);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-mono);
}

.no-results {
  padding: var(--space-4);
  text-align: center;
  color: var(--color-text-tertiary);
}
</style>

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
  width: 480px;
  max-width: 90vw;
}

.search-container {
  padding: var(--space-4);
  border-bottom: 1px solid rgba(128, 128, 128, 0.12);
}

.search-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: none;
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: 300;
  color: var(--color-text);
  outline: none;
  box-sizing: border-box;
  letter-spacing: -0.01em;
}

.search-input::placeholder {
  color: var(--color-text-tertiary);
  opacity: 0.6;
}

.command-list {
  max-height: 360px;
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
  border-radius: var(--radius-lg);
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
  gap: 2px;
}

.command-name {
  font-weight: 400;
  color: var(--color-text);
  font-size: var(--font-size-sm);
}

.command-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: 300;
}

.command-shortcut {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  background: var(--color-bg);
  padding: 2px var(--space-2);
  border-radius: var(--radius-md);
  font-family: var(--font-family-mono);
  border: 1px solid rgba(128, 128, 128, 0.12);
}

.no-results {
  padding: var(--space-6);
  text-align: center;
  color: var(--color-text-tertiary);
  font-weight: 300;
  font-size: var(--font-size-sm);
}
</style>

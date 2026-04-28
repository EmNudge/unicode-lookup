<script setup lang="ts">
import { onMounted } from "vue";
import { hasFirstLoaded, selectedCodepoint, searchMode, results, activeIndex } from "$stores";
import { useTheme, useGlobalKeyboard } from "$src/composables";
import CloseIcon from "$icons/CloseIcon.vue";

import GitHubIcon from "$icons/GitHubIcon.vue";
import ResultsContainer from "$components/table-container/ResultsContainer.vue";
import EasySearch from "$components/EasySearch.vue";
import Header from "$components/Header.vue";
import AdvancedSearch from "$components/advanced-search/AdvancedSearch.vue";
import Loader from "$components/Loader.vue";
import InfoContainer from "$components/table-container/InfoContainer.vue";
import CommandPalette from "$components/CommandPalette.vue";

// Initialize theme and global keyboard shortcuts
useTheme();
useGlobalKeyboard();

onMounted(() => {
  import("./queryProxy");
});
</script>

<template>
  <div :class="['content', selectedCodepoint && 'middle']">
    <aside v-if="selectedCodepoint">
      <div>
        <button class="aside-close" @click="activeIndex = -1">
          <CloseIcon />
        </button>
        <InfoContainer
          :codepoint="selectedCodepoint.codepoint"
          :info="selectedCodepoint"
          :name="selectedCodepoint.label"
        />
      </div>
    </aside>
    <div>
      <Header />
      <GitHubIcon href="https://github.com/EmNudge/unicode-lookup" />

      <main>
        <div class="searchbox">
          <EasySearch v-if="searchMode === 'simple'" />
          <AdvancedSearch v-else />
        </div>

        <template v-if="hasFirstLoaded">
          <ResultsContainer v-if="results.length" />
          <template v-else>
            <p class="no-results">No results fit that query</p>
          </template>
        </template>
        <Loader v-else />
      </main>
    </div>
    <aside v-if="selectedCodepoint" class="aside-spacer" />
  </div>
  <CommandPalette />
</template>

<style>
body {
  overflow-y: scroll;
}
</style>

<style scoped>
main {
  text-align: center;
  margin: 0 auto;
  width: 600px;
  max-width: 100%;
  padding: 0 var(--space-4);
}
@media (min-width: 640px) {
  main {
    max-width: none;
    padding: 0;
  }
}
.content.middle {
  display: grid;
  grid-template-columns: 400px 600px 1fr;
  justify-content: center;
}
@media (max-width: 1600px) {
  .content.middle {
    grid-template-columns: 400px 1fr;
  }
  .aside-spacer {
    display: none;
  }
}
@media (max-width: 1024px) {
  .content.middle {
    grid-template-columns: 1fr;
  }
  .content.middle aside:not(.aside-spacer) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: var(--z-modal-backdrop);
    background: var(--color-bg);
    overflow-y: auto;
  }
  .content.middle aside:not(.aside-spacer) div {
    position: static;
    width: 100%;
    height: auto;
    max-width: 500px;
    margin: 0 auto;
  }
  .aside-spacer {
    display: none;
  }
}
aside div {
  position: fixed;
  width: 400px;
  overflow-y: auto;
  height: 100vh;
}
.aside-close {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  z-index: 1;
  background: none;
  border: none;
  padding: var(--space-2);
  opacity: 0.4;
  cursor: pointer;
  transition: opacity var(--duration-fast) var(--ease-out);
}
.aside-close:hover {
  opacity: 0.8;
}
.searchbox {
  margin-bottom: var(--space-5);
}
.no-results {
  color: var(--color-text-tertiary);
  font-weight: 300;
  letter-spacing: -0.01em;
  padding: var(--space-4) 0;
}
</style>

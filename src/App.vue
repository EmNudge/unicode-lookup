<script setup lang="ts">
import { onMounted } from "vue";
import { hasFirstLoaded, selectedCodepoint, searchMode, results } from "$stores";

import GitHubIcon from "$icons/GitHubIcon.vue";
import ResultsContainer from "$components/table-container/ResultsContainer.vue";
import EasySearch from "$components/EasySearch.vue";
import Header from "$components/Header.vue";
import AdvancedSearch from "$components/advanced-search/AdvancedSearch.vue";
import Loader from "$components/Loader.vue";
import InfoContainer from "$components/table-container/InfoContainer.vue";

onMounted(() => {
  import("./queryProxy");
});
</script>

<template>
  <div :class="['content', selectedCodepoint && 'middle']">
    <aside v-if="selectedCodepoint">
      <div>
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

        <br />

        <template v-if="hasFirstLoaded">
          <ResultsContainer v-if="results.length" />
          <template v-else>
            <br />
            <p>No results fit that query :/</p>
          </template>
        </template>
        <Loader v-else />
      </main>
    </div>
    <aside v-if="selectedCodepoint" />
  </div>
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
}
@media (min-width: 640px) {
  main {
    max-width: none;
  }
}
.content.middle {
  display: grid;
  grid-template-columns: minmax(500px, auto) 600px 500px;
  justify-content: center;
}
@media (max-width: 1600px) {
  .content.middle {
    display: grid;
    grid-template-columns: minmax(500px, auto) 600px;
  }
}
aside div {
  position: fixed;
  width: 400px;
  overflow-y: auto;
  height: 100vh;
}
</style>

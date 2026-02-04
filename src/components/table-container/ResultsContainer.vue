<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import ResultsRow from "./ResultsRow.vue";
import { activeIndex, results } from "$stores";

const resultsNum = ref(50);
const intersectionObserver = ref<HTMLDivElement | null>(null);
let intObserver: IntersectionObserver | null = null;

// Reset resultsNum when results change
watch(results, () => {
  resultsNum.value = 50;
});

onMounted(() => {
  if (!intersectionObserver.value) return;

  intObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;

      if (results.value.length > resultsNum.value) {
        resultsNum.value += 50;
      }
    },
    {
      rootMargin: "0px",
      threshold: 0.8,
    },
  );

  intObserver.observe(intersectionObserver.value);
});

onUnmounted(() => {
  intObserver?.disconnect();
});

const shownResults = computed(() => results.value.slice(0, resultsNum.value));

function handleFocus(e: FocusEvent) {
  const target = e.target as Element;
  const index = target.querySelector("img")?.dataset.index;
  if (!index) return;
  activeIndex.value = Number(index);
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowDown" && activeIndex.value < results.value.length - 1) {
    activeIndex.value++;
  } else if (e.key === "ArrowUp" && activeIndex.value >= 0) {
    activeIndex.value--;
  }
}
</script>

<template>
  <div>
    <p>{{ results.length }} result{{ results.length > 1 ? "s" : "" }}</p>

    <div class="table" role="table" @focusin="handleFocus" @keydown="handleKeydown">
      <ResultsRow
        v-for="([codepoint, info], i) in shownResults"
        :key="codepoint"
        :index="i"
        :codepoint="codepoint"
        :info="info"
      />

      <div class="intersection-observer" ref="intersectionObserver" />
    </div>
  </div>
</template>

<style scoped>
.table {
  text-align: left;
}
p {
  text-align: left;
  margin: 0;
  opacity: 0.7;
  font-size: 0.8rem;
}
.intersection-observer {
  height: 5rem;
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const str = ref("xxxxxx");
let intervalId: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  intervalId = setInterval(() => {
    const codepoint = Math.floor(Math.random() * 0xfff);
    const char = String.fromCodePoint(codepoint);

    const index = Math.floor(Math.random() * str.value.length);
    str.value = str.value.slice(0, index) + char + str.value.slice(index + 1);
  }, 50);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

const chars = computed(() => Array.from(str.value));
</script>

<template>
  <section>
    <h2>Fetching Data</h2>
    <br />
    <div class="chars">
      <span v-for="(char, i) in chars" :key="i">{{ char }}</span>
    </div>
  </section>
</template>

<style scoped>
section {
  text-align: center;
  padding-top: 50px;
}
.chars span {
  display: inline-block;
  width: 25px;
  text-align: center;
  line-height: 1em;
}
</style>

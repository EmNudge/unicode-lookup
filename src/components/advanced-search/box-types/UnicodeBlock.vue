<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Dropdown from "../Dropdown.vue";
import { blockLookup } from "$stores";

interface Props {
  data?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  dataChange: [data: string];
}>();

const blockNames = computed(() => blockLookup.value.map((block) => block.name));
const shouldSort = ref(true);
const blockName = ref<string>("");

const blocks = computed(() => (shouldSort.value ? [...blockNames.value].sort() : blockNames.value));

// Initialize with first block name
watch(
  blockNames,
  (names) => {
    if (names.length > 0 && !blockName.value) {
      blockName.value = names[0]!;
    }
  },
  { immediate: true },
);

watch(
  blockName,
  (name) => {
    if (name) {
      emit("dataChange", name);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <Dropdown :options="blocks" :hue="35" v-model="blockName" />

    <label>
      <span>Sort Blocks Alphabetically</span>
      <input type="checkbox" v-model="shouldSort" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Dropdown from "../Dropdown.vue";
import { planeMap } from "$utils/unicode";

interface Props {
  data?: number;
}

defineProps<Props>();

const emit = defineEmits<{
  dataChange: [data: number];
}>();

const nameToNumMap = new Map<string, number>(
  Array.from({ length: 17 }).map((_, i) => {
    const name = planeMap.get(i) || "Unassigned";
    return [`(${i}) ${name}`, i];
  }),
);
const names = [...nameToNumMap.keys()];

const activeName = ref(names[0]!);

watch(
  activeName,
  (name) => {
    const planeNum = nameToNumMap.get(name);
    if (planeNum !== undefined) {
      emit("dataChange", planeNum);
    }
  },
  { immediate: true },
);
</script>

<template>
  <Dropdown :options="names" :hue="35" v-model="activeName" />
</template>

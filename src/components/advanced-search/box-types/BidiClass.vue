<script setup lang="ts">
import { ref, watch } from "vue";
import { BidiClassMap } from "$utils/unicode";
import Dropdown from "../Dropdown.vue";

interface Props {
  data?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  dataChange: [data: string];
}>();

const displayToBidiMap = new Map(
  [...BidiClassMap.entries()].map(([className, displayName]) => {
    return [`${className} (${displayName})`, className];
  }),
);
const names = [...displayToBidiMap.keys()];

const displayName = ref<string>(names[0]!);

watch(
  displayName,
  (val) => {
    const bidiClass = displayToBidiMap.get(val);
    if (bidiClass) {
      emit("dataChange", bidiClass);
    }
  },
  { immediate: true },
);
</script>

<template>
  <Dropdown :options="names" :hue="35" v-model="displayName" />
</template>

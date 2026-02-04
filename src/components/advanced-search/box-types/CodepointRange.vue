<script setup lang="ts">
import { ref, watch } from "vue";
import NumberInput from "../NumberInput.vue";

interface Props {
  data?: { from: number; to: number };
}

const props = defineProps<Props>();

const emit = defineEmits<{
  dataChange: [data: { from: number; to: number }];
}>();

const from = ref(props.data?.from ?? 0);
const to = ref(props.data?.to ?? 65535);

watch(
  [from, to],
  ([f, t]) => {
    emit("dataChange", { from: f, to: t });
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <span>From</span>
    <NumberInput v-model="from" />
    <span>To</span>
    <NumberInput v-model="to" />
  </div>
</template>

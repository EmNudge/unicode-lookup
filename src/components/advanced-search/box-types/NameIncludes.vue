<script setup lang="ts">
import { ref, watch } from "vue";
import Input from "../Input.vue";

interface Props {
  data?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  dataChange: [data: string];
}>();

const text = ref(props.data ?? "symbol");

watch(
  text,
  (value) => {
    emit("dataChange", value);
  },
  { immediate: true },
);

function validator(str: string) {
  if (/^[A-Za-z0-9 ()<>,-]+$/.test(str)) return true;
  return "Impossible name";
}
</script>

<template>
  <Input placeholder="text" :validator="validator" v-model="text" />
</template>

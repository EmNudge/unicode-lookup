<script setup lang="ts">
import { ref, watch } from "vue";
import Input from "../Input.vue";
import Dropdown from "../Dropdown.vue";

type Data = { regex: RegExp; matchOn: "Character" | "Name" };

interface Props {
  data?: Data;
}

defineProps<Props>();

const emit = defineEmits<{
  dataChange: [data: Data];
}>();

function getRegexFromString(text: string) {
  const res = text.match(/^\/(.+)\/([A-Za-z]*)$/);
  if (!res) return null;

  const [, regex, flags] = res;
  try {
    return new RegExp(regex!, flags);
  } catch {
    return null;
  }
}

const regex = ref("/[A-Za-z]/u");
const matchOn = ref<"Character" | "Name">("Character");

watch(
  [regex, matchOn],
  ([regexStr, match]) => {
    const regexObj = getRegexFromString(regexStr);
    if (regexObj) {
      emit("dataChange", { regex: regexObj, matchOn: match });
    }
  },
  { immediate: true },
);

function validateRegex(text: string) {
  if (getRegexFromString(text)) return true;
  return "invalid regex";
}

function handleMatchOnChange(val: string) {
  matchOn.value = val as "Character" | "Name";
}
</script>

<template>
  <div>
    <span>Regex</span>
    <Input placeholder="regular expression" :validator="validateRegex" v-model="regex" />

    <span>Match On</span>
    <Dropdown
      :options="['Character', 'Name']"
      :hue="35"
      :model-value="matchOn"
      @update:model-value="handleMatchOnChange"
    />
  </div>
</template>

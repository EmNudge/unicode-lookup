<script setup lang="ts">
import { ref, watch } from "vue";
import Dropdown from "../Dropdown.vue";
import { properties, scripts } from "$utils/unicode";

interface Props {
  data?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  dataChange: [data: string];
}>();

const activeProperty = ref(properties[0]!);
const activeScript = ref(scripts[0]!);

watch(
  [activeProperty, activeScript],
  ([property, script]) => {
    const value = property === "Script" ? `Script=${script}` : property;
    emit("dataChange", value);
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <Dropdown :options="properties" :hue="35" v-model="activeProperty" />

    <Dropdown
      v-if="activeProperty === 'Script'"
      :options="scripts"
      :hue="35"
      v-model="activeScript"
    />
  </div>
</template>

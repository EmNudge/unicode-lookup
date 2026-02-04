<script setup lang="ts">
import { ref, computed, watch } from "vue";
import CloseIcon from "$icons/CloseIcon.vue";
import { Select } from "$lib/components";
import { boxTypeMap } from "./box-types";

interface Props {
  name: string;
  data: any;
  hue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  hue: 200,
});

const emit = defineEmits<{
  close: [];
  nameChange: [name: string];
  dataChange: [data: any];
}>();

const localName = ref(props.name);

const componentNames = computed(() => [...boxTypeMap.keys()]);
const component = computed(() => boxTypeMap.get(localName.value));

watch(localName, (name) => {
  emit("nameChange", name);
  emit("dataChange", undefined);
});

function handleSelectChange(value: string | number) {
  localName.value = String(value);
}

function handleDataChange(data: any) {
  emit("dataChange", data);
}
</script>

<template>
  <div class="content styled" :style="`--hue: ${props.hue}`">
    <button @click="emit('close')">
      <CloseIcon />
    </button>

    <Select
      :options="componentNames"
      :model-value="localName"
      @update:model-value="handleSelectChange"
      :hue="35"
    />

    <hr />

    <component :is="component" :data="props.data" @data-change="handleDataChange" />
  </div>
</template>

<style scoped>
.content {
  padding: 40px;
  display: grid;
  justify-content: center;
  margin-top: -1px;
  position: relative;
}
button {
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2em;
  padding: 3px;
  line-height: 0.8em;
  margin: 0;
  z-index: 2;
  cursor: pointer;
}
hr {
  margin: 10px -40px;
  opacity: 0.4;
}
</style>

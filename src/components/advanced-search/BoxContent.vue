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

    <component
      v-if="component"
      :is="component"
      :data="props.data"
      @data-change="handleDataChange"
    />
  </div>
</template>

<style scoped>
.content {
  padding: var(--space-10);
  display: grid;
  justify-content: center;
  margin-top: -1px;
  position: relative;
  z-index: 1;
  isolation: isolate;
}
button {
  position: absolute;
  top: var(--space-1);
  right: var(--space-3);
  background: none;
  border: none;
  font-size: 2em;
  padding: var(--space-1);
  line-height: 0.8em;
  margin: 0;
  z-index: 3;
  cursor: pointer;
}
button:hover {
  opacity: 0.7;
}
hr {
  margin: var(--space-3) calc(var(--space-10) * -1);
  opacity: 0.4;
}
</style>

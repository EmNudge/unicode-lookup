<script setup lang="ts">
import { computed } from "vue";
import { Button } from "$lib/components";
import BoxContent from "./BoxContent.vue";
import type { Box } from "$stores";

interface Props {
  box: Box;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  boxChange: [box: Box];
  close: [];
}>();

const dropdownColor = computed(() => (props.box.matchType === "Require" ? 111 : 0));

const flipType = () => {
  emit("boxChange", {
    ...props.box,
    matchType: props.box.matchType === "Require" ? "Exclude" : "Require",
  });
};

function handleNameChange(name: string) {
  emit("boxChange", { ...props.box, name } as Box);
}

function handleDataChange(data: any) {
  emit("boxChange", { ...props.box, data } as Box);
}
</script>

<template>
  <div class="box">
    <div class="dropdown-container">
      <Button @click="flipType" :hue="dropdownColor">
        {{ props.box.matchType }}
      </Button>
    </div>

    <BoxContent
      :name="props.box.name"
      :data="props.box.data"
      :hue="dropdownColor"
      @close="emit('close')"
      @name-change="handleNameChange"
      @data-change="handleDataChange"
    />
  </div>
</template>

<style scoped>
.box {
  display: grid;
  padding: 20px 0;
  margin-bottom: 20px;
}
.dropdown-container {
  display: flex;
  justify-content: center;
  margin: -25px;
  z-index: 2;
}
</style>

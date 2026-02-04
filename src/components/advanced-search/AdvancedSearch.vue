<script setup lang="ts">
import { onMounted } from "vue";
import BoxSet from "./BoxSet.vue";
import Button from "./Button.vue";
import { boxes, getNewBox, type Box } from "$stores";

interface Props {
  onSearch?: () => void;
}

defineProps<Props>();

const onClose = (index: number) => () => {
  boxes.value = [...boxes.value.slice(0, index), ...boxes.value.slice(index + 1)];
};

const updateBox = (index: number) => (box: Box) => {
  boxes.value = [...boxes.value.slice(0, index), box, ...boxes.value.slice(index + 1)];
};

onMounted(() => {
  if (boxes.value.length === 0) {
    boxes.value = [getNewBox()];
  }
});

function addRule() {
  boxes.value = [...boxes.value, getNewBox()];
}
</script>

<template>
  <div>
    <form @submit.prevent>
      <BoxSet
        v-for="(box, i) in boxes"
        :key="i"
        :box="box"
        @box-change="updateBox(i)"
        @close="onClose(i)"
      />
    </form>

    <div class="buttons">
      <Button @click="addRule">Add Rule</Button>
    </div>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
}
.buttons :deep(*) {
  margin: 5px;
}
</style>

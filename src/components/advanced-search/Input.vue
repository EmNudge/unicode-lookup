<script setup lang="ts">
import { ref, watch, computed } from "vue";

type Mutator = (text: string) => any;
type Validator = (text: string, mutatedValue: any) => string | true;

interface Props {
  modelValue?: any;
  mutator?: Mutator;
  validator?: Validator;
  hue?: number;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  hue: 35,
});

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const text = ref(props.modelValue ?? "");
const errText = ref("");

const style = computed(() => `--hue: ${props.hue}`);

watch(
  text,
  (newText) => {
    const mutator = props.mutator ?? ((t: any) => t);
    const validator = props.validator ?? (() => true);

    const newValue = mutator(newText);
    const isValid = validator(newText, newValue);

    if (isValid === true) {
      emit("update:modelValue", newValue);
      errText.value = "";
    } else {
      errText.value = isValid;
    }
  },
  { immediate: true },
);

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  text.value = target.value;
}
</script>

<template>
  <div>
    <input
      class="styled"
      :style="style"
      type="text"
      autocorrect="off"
      :placeholder="props.placeholder"
      :value="text"
      @input="handleInput"
    />
    <p>{{ errText }}</p>
  </div>
</template>

<style scoped>
p {
  color: red;
}
</style>

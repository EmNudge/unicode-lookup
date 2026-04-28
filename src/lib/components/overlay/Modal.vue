<script setup lang="ts">
import { watch, onMounted, onUnmounted } from "vue";

interface Props {
  open: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  closeOnBackdrop: true,
  closeOnEscape: true,
});

const emit = defineEmits<{
  close: [];
}>();

const handleBackdropClick = (e: MouseEvent) => {
  if (props.closeOnBackdrop && e.target === e.currentTarget) {
    emit("close");
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (props.closeOnEscape && e.key === "Escape" && props.open) {
    emit("close");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-backdrop" @click="handleBackdropClick">
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--color-backdrop);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 18vh;
  z-index: var(--z-modal-backdrop);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-2xl);
  box-shadow:
    0 24px 48px -12px rgba(0, 0, 0, 0.18),
    0 0 0 1px rgba(128, 128, 128, 0.08);
  z-index: var(--z-modal);
  max-height: 70vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--duration-slow) var(--ease-out);
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform var(--duration-slow) cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.96) translateY(-8px);
}
</style>

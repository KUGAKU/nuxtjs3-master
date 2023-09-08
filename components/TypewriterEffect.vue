<template>
  <div class="break-word">{{ displayedText }}</div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue';

const runtimeConfig = useRuntimeConfig();
interface Props {
  message: string;
}
const props = withDefaults(defineProps<Props>(), {
  message: undefined,
});

const currentIndex = ref(0);
const isTyping = ref(false);
const displayedText = computed(() =>
  props.message.slice(0, currentIndex.value)
);

const isNotFullyDisplayed = () => {
  if (currentIndex.value < props.message.length) {
    return true;
  }
  return false;
};

const typeCharacter = () => {
  if (isNotFullyDisplayed()) {
    currentIndex.value++;
    if (isNotFullyDisplayed()) {
      setTimeout(typeCharacter, runtimeConfig.public.typeWritingSpeed);
    } else {
      isTyping.value = false;
    }
  }
};

watch(
  () => props.message,
  (newMessage, oldMessage) => {
    if (!isTyping.value) {
      if ((oldMessage?.length || 0) < newMessage.length) {
        isTyping.value = true;
        typeCharacter();
      } else {
        currentIndex.value = 0;
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.break-word {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>

<template>
  <div class="break-word">{{ displayedText }}</div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { chatResponseData } = useChat();

const currentIndex = ref(0);
const displayedText = computed(() =>
  chatResponseData.value.slice(0, currentIndex.value)
);

watch(chatResponseData, () => {
  const typeCharacter = () => {
    if (currentIndex.value < chatResponseData.value.length) {
      currentIndex.value++;
      setTimeout(typeCharacter, runtimeConfig.public.typeWritingInterval); // 50msのディレイで次の文字をタイプ
    }
  };
  typeCharacter();
});
</script>

<style scoped>
.break-word {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>

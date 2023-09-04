<template>
  <div class="break-word">{{ displayedText }}</div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
}
const props = withDefaults(defineProps<Props>(), {
  message: undefined,
});

const runtimeConfig = useRuntimeConfig();
const message = ref(props.message);
const currentIndex = ref(0);
const displayedText = computed(() =>
  message.value.slice(0, currentIndex.value)
);

const typeCharacter = () => {
  if (currentIndex.value < message.value.length) {
    currentIndex.value++;
    setTimeout(typeCharacter, runtimeConfig.public.typeWritingInterval); // デフォルト50msのディレイで次の文字をタイプ
  }
};

watchEffect(() => {
  message.value = props.message;
  typeCharacter();
});
</script>

<style scoped>
.break-word {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>

<template>
  <div class="break-word">{{ displayedText }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: { type: String, required: true },
  speed: {
    type: Number,
    default: 50,
  },
});

const displayedText = ref("");
let index = 0;

onMounted(() => {
  const intervalId = setInterval(() => {
    displayedText.value += props.text.charAt(index);
    index++;
    if (index > props.text.length) {
      clearInterval(intervalId);
    }
  }, props.speed);
});
</script>

<style scoped>
.break-word {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>

<template>
  <div class="break-word">{{ displayedText }}</div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onUnmounted } from "vue";

const props = defineProps({
  text: { type: String, required: true },
  speed: { type: Number, default: 50 },
});

let displayedText = ref("");
let intervalId: number | undefined;

watchEffect(() => {
  displayedText.value = "";
  let index = 0;
  intervalId && clearInterval(intervalId);
  intervalId = window.setInterval(() => {
    displayedText.value += props.text.charAt(index);
    index++;
    if (index >= props.text.length) {
      intervalId && clearInterval(intervalId);
    }
  }, props.speed);
});

onUnmounted(() => {
  intervalId && clearInterval(intervalId);
});
</script>

<style scoped>
.break-word {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>

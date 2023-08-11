<template>
  <div class="break-word">{{ chatResponseData }}</div>
</template>

<script setup lang="ts">
const { chatResponseData } = useChat();
</script>

<style scoped>
.break-word {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>

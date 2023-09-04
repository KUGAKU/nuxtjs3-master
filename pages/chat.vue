<template>
  <Messages :messages="messages" />
</template>

<script setup lang="ts">
const { messages } = useChat();
</script>

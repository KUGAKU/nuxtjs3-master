<template>
  <Messages :messages="messages" />
</template>

<script setup lang="ts">
import auth from '../middleware/auth';

definePageMeta({
  middleware: auth,
});

const { messages } = useChat();
</script>

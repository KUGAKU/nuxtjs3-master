<template>
  <v-footer app>
    <v-text-field hide-details="auto" class="mr-6"></v-text-field>
    <v-btn icon="$vuetify" @click="sendMessage"></v-btn>
  </v-footer>
</template>

<script setup lang="ts">
const sendMessage = async () => {
  console.log("send message");
  const response = await fetch("http://127.0.0.1:8000/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
  const reader = response.body
    ?.pipeThrough(new TextDecoderStream())
    .getReader();
  while (true) {
    const { value, done } = await reader?.read();
    if (done) break;
    const currentTime: Date = new Date();
    console.log(`Received: ${currentTime.getMilliseconds()}`, value);
  }
};
</script>

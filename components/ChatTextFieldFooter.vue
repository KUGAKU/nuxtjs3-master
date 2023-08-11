<template>
  <v-footer app>
    <v-text-field
      hide-details="auto"
      class="mr-6"
      v-model="chatMessage"
    ></v-text-field>
    <v-btn icon="$vuetify" @click="sendMessage"></v-btn>
  </v-footer>
</template>

<script setup lang="ts">
import { useChat } from '../composables/useChat';

const { listenToChatMessage, isLoading } = useChat();
const chatMessage = ref('');

const sendMessage = async () => {
  listenToChatMessage(chatMessage.value);
};
</script>

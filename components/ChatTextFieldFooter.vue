<template>
  <v-footer app>
    <v-text-field
      hide-details="auto"
      class="mr-6"
      v-model="message"
      @keypress.enter.exact="sendMessage"
    ></v-text-field>
    <v-btn icon="$vuetify" @click="sendMessage"></v-btn>
  </v-footer>
</template>

<script setup lang="ts">
import { MessageType } from '../types/conversation';
import { useChat } from '../composables/useChat';

const { listenToChatMessage, addHumanMessageToMessages } = useChat();
const message = ref('');

const clearChatMessage = () => {
  message.value = '';
};

const sendMessage = () => {
  listenToChatMessage(message.value);
  addHumanMessageToMessages(message.value);
  clearChatMessage();
};
</script>

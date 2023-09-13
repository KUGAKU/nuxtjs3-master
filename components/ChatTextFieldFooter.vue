<template>
  <v-footer app>
    <v-text-field
      v-model="message"
      hide-details="auto"
      class="mr-6"
      @keypress.enter.exact="sendMessage"
    />
    <v-btn icon="$vuetify" @click="sendMessage" />
  </v-footer>
</template>

<script setup lang="ts">
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

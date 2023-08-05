<template>
  <v-footer app>
    <v-text-field hide-details="auto" class="mr-6"></v-text-field>
    <v-btn icon="$vuetify" @click="sendMessage"></v-btn>
  </v-footer>
</template>

<script setup lang="ts">
import { useChat } from '../composables/useChat';

const { data, listenToChatMessage, isLoading } = useChat();

const sendMessage = async () => {
  console.log('send message start');
  listenToChatMessage();
};
</script>

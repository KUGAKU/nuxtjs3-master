<template>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    app
  >
    <div class="d-flex flex-column space-between">
      <v-btn @click="createNewChat">
        New Chat
      </v-btn>
    </div>
    <v-list :items="items" />
  </v-navigation-drawer>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer" />

    <v-toolbar-title>Enterprise Chat</v-toolbar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { clearConversationId, clearMessages } = useChat();
const drawer = ref(true);
const items = [{ title: 'History' }];

const createNewChat = () => {
  clearConversationId();
  clearMessages();
};
</script>

<style scoped></style>

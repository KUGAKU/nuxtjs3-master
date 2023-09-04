<template>
  <v-navigation-drawer v-model="drawer" location="left" temporary app>
    <div class="d-flex flex-column space-between">
      <v-row>
        <v-col cols="12">
          <v-btn block @click="createNewChat">New Chat</v-btn>
        </v-col>
        <!-- <v-col cols="2"></v-col>
        <v-col cols="2">
          <v-btn block>Close</v-btn>
        </v-col> -->
      </v-row>
    </div>
    <v-list :items="items"></v-list>
  </v-navigation-drawer>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Enterprise Chat</v-toolbar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { clearConversationId } = useChat();
const drawer = ref(true);
const items = [{ title: 'History' }];

const createNewChat = () => {
  clearConversationId();
};
</script>

<style scoped></style>

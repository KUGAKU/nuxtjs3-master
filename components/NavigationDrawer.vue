<template>
  <v-navigation-drawer v-model="drawer"></v-navigation-drawer>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Nuxt Master</v-toolbar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(true);
</script>

<style scoped></style>

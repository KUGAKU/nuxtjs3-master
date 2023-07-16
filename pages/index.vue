<template>
  <v-app-bar>
    <v-spacer></v-spacer>
    <v-btn variant="outlined" @click="login">Login</v-btn>
  </v-app-bar>

  <v-main class="main"> </v-main>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const login = async () => {
  const nuxtApp = useNuxtApp();
  await nuxtApp.$login();
};
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer"></v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Nuxt Master</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-footer app>
      <v-text-field hide-details="auto" class="mr-6"></v-text-field>
      <v-btn icon="$vuetify" @click="sendMessage"></v-btn>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
// const { count, inc, dec } = useCounter(100);

const drawer = ref(true);

// const sendMessage = () => {
//   console.log("send message");
//   console.log("count", count.value);
//   inc();
// };

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

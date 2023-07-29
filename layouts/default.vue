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
      <v-btn icon="$vuetify"></v-btn>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(false);
</script>

<script lang="ts">
export default {
  data: () => ({ drawer: false }),
};
</script>

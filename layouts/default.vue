<template>
  <v-app>
    <NavigationDrawer />

    <v-main>
      <slot />
    </v-main>

    <ChatTextFieldFooter />
  </v-app>
</template>

<script setup lang="ts"></script>

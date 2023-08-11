<template>
  <v-app>
    <NavigationDrawer />

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <ChatTextFieldFooter />
  </v-app>
</template>

<script setup lang="ts"></script>

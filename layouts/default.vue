<template>
  <v-app>
    <NavigationDrawer></NavigationDrawer>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script setup lang="ts"></script>

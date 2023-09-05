<template></template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

import { useAuth } from '../composables/useAuth';
const { checkAuth, loginRedirect, acquireAccessToken } = useAuth();
const router = useRouter();

const accounts = checkAuth();
if (accounts.length === 0) {
  // if not logged in, redirect to login page
  // the program below was not executed when the function below was called
  loginRedirect();
} else {
  // acquire and store access token to global value by useState.
  await acquireAccessToken(accounts[0]);
  // go to initial page.
  router.push('/chat');
}
</script>

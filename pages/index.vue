<template></template>

<script setup lang="ts">
import auth from '../middleware/auth';

definePageMeta({
  layout: false,
  middleware: auth,
});
</script>

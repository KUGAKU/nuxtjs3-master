<template>
  <div class="text-center bg-grey-darken-4 pt-4 pr-4 pb-4 pl-4">
    <p v-text="message"></p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
}

withDefaults(defineProps<Props>(), {
  message: undefined,
});
</script>

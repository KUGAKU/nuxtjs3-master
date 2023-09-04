<template>
  <div class="text-center bg-grey-darken-1 pt-4 pr-4 pb-4 pl-4">
    <TypewriterEffect :message="message" />
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
interface Props {
  message: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: undefined,
});

const message = ref(props.message);

watchEffect(() => {
  message.value = props.message;
});
</script>

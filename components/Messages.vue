<template>
  <div v-for="(message, index) in messages" :key="index">
    <HumanMessage
      v-if="message.messageType == MessageType.HUMAN"
      :message="message.messageContent"
    />
    <AIMessage v-else :message="message.messageContent" />
  </div>
</template>

<script setup lang="ts">
import { MessageType, Message } from '../types/conversation';

interface Props {
  messages: readonly Message[];
}

withDefaults(defineProps<Props>(), {
  messages: undefined,
});
</script>

<template>
  <template v-for="message in messages">
    <template v-if="message.messageType == MessageType.HUMAN">
      <HumanMessage :message="message.messageContent" />
    </template>
    <template v-else>
      <AIMessage :message="message.messageContent" />
    </template>
  </template>
</template>

<script setup lang="ts">
import { MessageType, Message } from '../types/conversation';

interface Props {
  messages: Message[];
}

withDefaults(defineProps<Props>(), {
  messages: undefined,
});
</script>

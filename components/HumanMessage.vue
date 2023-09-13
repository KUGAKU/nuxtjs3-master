<template>
  <div class="bg-grey-darken-4 pt-4 pr-4 pb-4 pl-4">
    <p
      class="limited-width"
      v-text="message"
    />
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

<style scoped>
.limited-width {
  width: 700px;
  margin: 0 auto; /* 中央揃え */
}
</style>

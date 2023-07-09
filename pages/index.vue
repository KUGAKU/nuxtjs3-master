<template>
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Welcome</h1>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        @click="tryLoginOrSignUp"
      >
        ADB2C Login or SignUp
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    tryLoginOrSignUp() {
      // ログイン処理
    },
  },
};
</script>

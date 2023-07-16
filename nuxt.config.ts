// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      aadb2cClientId: "",
      aadb2cAuthority: "",
      aadb2cScopes: "",
      aadb2cAuthorityDomain: "",
      aadb2cRedirectUri: "",
    },
  },
  css: ["@/assets/main.scss"],
  ssr: false,
  build: {
    transpile: ["vuetify"],
  },
});

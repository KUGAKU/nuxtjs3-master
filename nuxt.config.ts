import 'reflect-metadata';
import vuetify from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    esbuild: {
      pure: ['console.log', 'console.info', 'console.debug', 'console.warn'],
    },
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      backendApiBaseUrl: '',
      typeWritingSpeed: 20,
      aadb2cClientId: '',
      aadb2cAuthority: '',
      aadb2cAuthorityDomain: '',
      aadb2cRedirectUri: '',
      aadb2cScope: '',
    },
  },
  css: ['@/assets/main.scss', '@mdi/font/css/materialdesignicons.css'],
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config): any => {
        const vuetifyPlugin = vuetify();
        if (config.plugins) {
          config.plugins.push(vuetifyPlugin);
        } else {
          config.plugins = [vuetifyPlugin];
        }
        return config;
      });
    },
  ],
});

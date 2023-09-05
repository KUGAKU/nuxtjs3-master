import {
  Configuration,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const msalConfig: Configuration = {
    auth: {
      clientId: runtimeConfig.public.aadb2cClientId,
      authority: runtimeConfig.public.aadb2cAuthority,
      knownAuthorities: [runtimeConfig.public.aadb2cAuthorityDomain],
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        loggerCallback: (level: LogLevel, message: string) => {
          switch (level) {
            case LogLevel.Error:
              console.error('system[Error]:', message);
              return;
            case LogLevel.Info:
              //console.info('system[Info]:', message);
              return;
            case LogLevel.Verbose:
              //console.debug('system[Verbose]:', message);
              return;
            case LogLevel.Warning:
              //console.warn('system:[Warning]', message);
              return;
          }
        },
      },
    },
  };
  const msal = new PublicClientApplication(msalConfig);

  const result = await msal.handleRedirectPromise();
  console.log(JSON.stringify(result));

  return {
    provide: {
      msal,
    },
  };
});

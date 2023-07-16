import {
  AuthenticationResult,
  Configuration,
  InteractionRequiredAuthError,
  LogLevel,
  PublicClientApplication,
  RedirectRequest,
} from "@azure/msal-browser";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const msalConfig: Configuration = {
    auth: {
      clientId: runtimeConfig.public.aadb2cClientId,
      authority: runtimeConfig.public.aadb2cAuthority,
      knownAuthorities: [runtimeConfig.public.aadb2cAuthorityDomain],
    },
    system: {
      loggerOptions: {
        loggerCallback: (level: LogLevel, message: string) => {
          switch (level) {
            case LogLevel.Error:
              console.error("system[Error]:", message);
              return;
            case LogLevel.Info:
              console.info("system[Info]:", message);
              return;
            case LogLevel.Verbose:
              console.debug("system[Verbose]:", message);
              return;
            case LogLevel.Warning:
              console.warn("system:[Warning]", message);
              return;
          }
        },
      },
    },
  };
  const msal = new PublicClientApplication(msalConfig);

  msal
    .handleRedirectPromise()
    .then((result: AuthenticationResult | null) => {
      if (result == null) {
        console.warn("login process is incorrect.");
        return;
      }
      console.log(JSON.stringify(result));
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    provide: {
      login: async () => {
        const account = msal.getAllAccounts()[0];

        const accessTokenRequest = {
          scopes: ["openid"],
          account: account,
        };

        msal
          .acquireTokenSilent(accessTokenRequest)
          .then(function (accessTokenResponse) {
            // Acquire token silent success
            // Call API with token
            let accessToken = accessTokenResponse.accessToken;
            // Call your API with token
            console.log(accessToken);
          })
          .catch(function (error) {
            //Acquire token silent failure, and send an interactive request
            console.log(error);
            if (error instanceof InteractionRequiredAuthError) {
              msal.acquireTokenRedirect(accessTokenRequest);
            }
          });
      },
    },
  };
});

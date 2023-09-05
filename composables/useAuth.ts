import { AccountInfo } from '@azure/msal-browser';

export const useAuth = () => {
  const nuxtApp = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();
  const msal = nuxtApp.$msal;
  const accessToken = useState<string>('accessTokenKey', () => '');

  const loginRedirect = async () => {
    await msal.loginRedirect();
  };

  const checkAuth = () => {
    return msal.getAllAccounts();
  };
  const acquireAccessToken = async (account: AccountInfo) => {
    const accountInfo = msal.getAccountByHomeId(account.homeAccountId);
    if (account == null) {
      return;
    }
    console.log(`accountInfo: ${accountInfo}`);
    const loginRequest = {
      scopes: [
        runtimeConfig.public.aadb2cScope,
        'openid',
        'profile',
        'offline_access',
      ],
      account: accountInfo!,
    };
    const result = await msal.acquireTokenSilent(loginRequest);
    accessToken.value = result.accessToken;
    console.log(`accessToken managed by useState: ${accessToken.value}`);
  };

  const refreshAccessToken = async () => {};

  return {
    accessToken: readonly(accessToken),
    loginRedirect,
    checkAuth,
    acquireAccessToken,
  };
};

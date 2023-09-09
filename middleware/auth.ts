import { useAuth } from './../composables/useAuth';
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { accessToken, checkAuth, loginRedirect, acquireAccessToken } =
    useAuth();
  const router = useRouter();

  if (accessToken.value != '') {
    return;
  }

  const accounts = checkAuth();
  if (accounts.length === 0) {
    // if not logged in, redirect to login page
    // the program below was not executed when the function below was called
    loginRedirect();
    return;
  } else {
    // acquire and store access token to global value by useState.
    await acquireAccessToken(accounts[0]);
    return;
  }
});

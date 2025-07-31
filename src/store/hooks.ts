import { useAppDispatch, useAppSelector } from ".";
import type { Credentials } from "../pages/auth/types";
import { authLogin, authLogout, uiResetError } from "./actions";
import { getIsLogged } from "./selectors";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

export function useLoginAction() {
  const dispatch = useAppDispatch();
  return function (credentials: Credentials, rememberMe: boolean) {
    return dispatch(authLogin(credentials, rememberMe));
  };
}

export function useLogoutAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLogout());
  };
}

export function useUiResetError() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(uiResetError());
  };
}

//TODO: same but with adverts

import type { AppThunk } from ".";
import { login } from "../pages/auth/service";
import type { Credentials } from "../pages/auth/types";
import type { Advert } from "../pages/adverts/types";

type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
};

type AuthLogout = {
  type: "auth/logout";
};

type AdvertsLoaded = {
  type: "adverts/loaded";
  payload: Advert[];
};

type AdvertsCreated = {
  type: "adverts/created";
  payload: Advert;
};

type UiResetError = {
  type: "ui/reset-error";
};

export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

export function authLogin(
  credentials: Credentials,
  rememberMe: boolean,
): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(authLoginPending());
    try {
      await login(credentials, rememberMe);
      dispatch(authLoginFulfilled());
    } catch (error) {
      if (error instanceof Error) {
        error.message = "Unauthorized";
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

export const advertsLoaded = (adverts: Advert[]): AdvertsLoaded => ({
  type: "adverts/loaded",
  payload: adverts,
});

export const advertsCreated = (advert: Advert): AdvertsCreated => ({
  type: "adverts/created",
  payload: advert,
});

export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | AdvertsLoaded
  | AdvertsCreated
  | UiResetError;

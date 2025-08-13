import type { AppThunk } from ".";
import { getAdvert } from "./selectors";
import type { Credentials } from "../pages/auth/types";
import type { Advert, PreAdvert } from "../pages/adverts/types";

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

type AdvertsLoadedFulfilled = {
  type: "adverts/loaded/fulfilled";
  payload: Advert[];
};

type AdvertsDetailFulFilled = {
  type: "adverts/detail/fulfilled";
  payload: Advert;
};

type AdvertsCreatedFulfilled = {
  type: "adverts/created/fulfilled";
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
  return async function (dispatch, _getState, { api }) {
    dispatch(authLoginPending());
    try {
      await api.auth.login(credentials, rememberMe);
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

export const advertsLoadedFulfilled = (
  adverts: Advert[],
): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const advertsDetailFulFilled = (
  advert: Advert,
): AdvertsDetailFulFilled => ({
  type: "adverts/detail/fulfilled",
  payload: advert,
});

export const advertsCreatedFulfilled = (
  advert: Advert,
): AdvertsCreatedFulfilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    //TODO: manage reload after delete
    const state = getState();
    if (state.adverts.loaded) {
      return;
    }
    try {
      //TODO: Manage advertsLoadedPending
      const adverts = await api.adverts.getLatestAdverts();
      dispatch(advertsLoadedFulfilled(adverts));
    } catch (error) {
      console.log(error);
      //TODO: Manage advertsLoadedRejected
    }
  };
}

export function advertsDetail(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (getAdvert(advertId)(state)) {
      return;
    }
    try {
      // Manage advertsLoadedPending
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertsDetailFulFilled(advert));
    } catch (error) {
      console.log(error);
      // Manage advertsLoadedRejected
    }
  };
}

export function advertsCreate(preAdvert: PreAdvert): AppThunk<Promise<Advert>> {
  return async function (dispatch, _getState, { api }) {
    try {
      // Manage advertsCreatePending
      const createdAdvert = await api.adverts.createAdvert(preAdvert);
      const advert = await api.adverts.getAdvert(createdAdvert.id.toString());
      dispatch(advertsCreatedFulfilled(advert));
      return advert;
    } catch (error) {
      // Manage advertsCreateRejected
      console.log(error);
      throw error;
    }
  };
}

export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | AdvertsLoadedFulfilled
  | AdvertsDetailFulFilled
  | AdvertsCreatedFulfilled
  | UiResetError;

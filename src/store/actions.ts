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

type AdvertsDetailFulfilled = {
  type: "adverts/detail/fulfilled";
  payload: Advert;
};

type AdvertsDetailRejected = {
  type: "adverts/detail/rejected";
  payload: Error;
};

type AdvertsDeleteFulfilled = {
  type: "adverts/delete/fulfilled";
};

type AdvertsCreatedFulfilled = {
  type: "adverts/created/fulfilled";
  payload: Advert;
};

type AdvertsCreatedRejected = {
  type: "adverts/created/rejected";
  payload: Error;
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
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());
    try {
      await api.auth.login(credentials, rememberMe);
      dispatch(authLoginFulfilled());
      console.log(router);
      // Navigate to the page in state.from
      const to = router.state.location.state?.from ?? "/";
      router.navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        error.message = "Unauthorized";
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}

export function authLogout(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    await api.auth.logout();
    dispatch({ type: "auth/logout" });
  };
}

export const advertsLoadedFulfilled = (
  adverts: Advert[],
): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const advertsDetailFulfilled = (
  advert: Advert,
): AdvertsDetailFulfilled => ({
  type: "adverts/detail/fulfilled",
  payload: advert,
});

export const advertsDetailRejected = (error: Error): AdvertsDetailRejected => ({
  type: "adverts/detail/rejected",
  payload: error,
});

export const advertsDeleteFulfilled = (): AdvertsDeleteFulfilled => ({
  type: "adverts/delete/fulfilled",
});

export const advertsCreatedFulfilled = (
  advert: Advert,
): AdvertsCreatedFulfilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export const advertsCreatedRejected = (
  error: Error,
): AdvertsCreatedRejected => ({
  type: "adverts/created/rejected",
  payload: error,
});

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
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
      dispatch(advertsDetailFulfilled(advert));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(advertsDetailRejected(error));
      }
      throw error;
      // Manage advertsLoadedRejected
    }
  };
}

export function advertsCreate(preAdvert: PreAdvert): AppThunk<Promise<Advert>> {
  return async function (dispatch, _getState, { api, router }) {
    try {
      // Manage advertsCreatePending
      const createdAdvert = await api.adverts.createAdvert(preAdvert);
      const advert = await api.adverts.getAdvert(createdAdvert.id.toString());
      dispatch(advertsCreatedFulfilled(advert));
      router.navigate(`/adverts/${createdAdvert.id}`);
      return advert;
    } catch (error) {
      // Manage advertsCreateRejected
      if (error instanceof Error) {
        console.log(error);
        dispatch(advertsCreatedRejected(error));
      }
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
  | AdvertsDetailFulfilled
  | AdvertsDetailRejected
  | AdvertsDeleteFulfilled
  | AdvertsCreatedFulfilled
  | AdvertsCreatedRejected
  | UiResetError;

export type ActionsRejected =
  | AuthLoginRejected
  | AdvertsCreatedRejected
  | AdvertsDetailRejected;

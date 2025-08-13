import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;
export const getAdverts = (state: RootState) => state.adverts.data;

export const getAdvert = (advertId?: string) => (state: RootState) =>
  state.adverts.data.find((advert) => advert.id === advertId);

export const getUi = (state: RootState) => state.ui;

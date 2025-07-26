import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;
export const getAdverts = (state: RootState) => state.adverts;

export const getAdvert = (advertId?: string) => (state: RootState) =>
  state.adverts.find((advert) => advert.id === advertId);

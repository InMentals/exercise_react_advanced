import type { Advert } from "../pages/adverts/types";
import { type Actions, type ActionsRejected } from "./actions";

export type State = {
  auth: boolean;
  adverts: {
    loaded: boolean;
    data: Advert[];
  };
  ui: {
    pending: boolean;
    error: Error | null;
  };
};

const defaultState: State = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
  },
  ui: {
    pending: false,
    error: null,
  },
};

export function auth(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

export function adverts(
  state = defaultState.adverts,
  action: Actions,
): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded/fulfilled":
      return { loaded: true, data: action.payload };
    case "adverts/detail/fulfilled":
      return { loaded: false, data: [action.payload] };
    case "adverts/created/fulfilled":
      return { ...state, data: [action.payload, ...(state.data ?? [])] };
    default:
      return state;
  }
}

function isRejectedAction(action: Actions): action is ActionsRejected {
  return action.type.endsWith("/rejected");
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  if (isRejectedAction(action)) {
    return { pending: false, error: action.payload };
  }
  switch (action.type) {
    case "auth/login/pending":
      return { pending: true, error: null };
    case "auth/login/fulfilled":
      return { pending: false, error: null };
    case "ui/reset-error":
      return { ...state, error: null };
    default:
      return state;
  }
}

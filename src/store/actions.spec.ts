import type { Credentials } from "../pages/auth/types";
import { authLoginPending, advertsLoadedFulfilled, authLogin } from "./actions";
describe("authLoginPending", () => {
  test('should return an  "auth/login/pending" action', () => {
    const expected = { type: "auth/login/pending" };
    const result = authLoginPending();
    expect(result).toEqual(expected);
  });
});

describe("advertsLoadedFulfilled", () => {
  test('should return an "adverts/loaded/fulfilled" action with empty adverts', () => {
    const expected = { type: "adverts/loaded/fulfilled", payload: [] };
    const result = advertsLoadedFulfilled([]);
    expect(result).toEqual(expected);
  });

  test('should return an "adverts/loaded/fulfilled" action with 2 adverts', () => {
    const adverts = [
      {
        id: 1,
      },
      { id: 2 },
    ];
    const expected = { type: "adverts/loaded/fulfilled", payload: adverts };
    // @ts-expect-error: just for testing, not valid adverts
    const result = advertsLoadedFulfilled(adverts);
    expect(result).toEqual(expected);
    expect(result.payload).toHaveLength(2);
  });
});

describe("authLogin", () => {
  afterEach(() => {
    dispatch.mockClear();
    router.navigate.mockClear();
  });

  const credentials: Credentials = {
    email: "er@test.com",
    password: "1234",
  };
  const thunk = authLogin(credentials, true);

  const dispatch = vi.fn();
  const api = {
    auth: {
      login: vi.fn(),
    },
  };
  const from = "/from";
  const router = {
    state: { location: { state: { from } } },
    navigate: vi.fn(),
  };

  test("when login resolves", async () => {
    api.auth.login = vi.fn().mockResolvedValue(undefined);
    // @ts-expect-error: no need getState
    await thunk(dispatch, undefined, { api, router });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "auth/login/pending" });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: "auth/login/fulfilled",
    });

    expect(api.auth.login).toHaveBeenCalledWith(credentials, true);

    expect(router.navigate).toHaveBeenCalledWith(from, { replace: true });
  });

  test("when login rejects", async () => {
    const error = new Error("unauthorized");
    api.auth.login = vi.fn().mockRejectedValue(error);

    await expect(() =>
      // @ts-expect-error: no need getState
      thunk(dispatch, undefined, { api, router }),
    ).rejects.toThrowError(error);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "auth/login/pending" });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: "auth/login/rejected",
      payload: error,
    });

    expect(router.navigate).not.toHaveBeenCalled();
  });
});

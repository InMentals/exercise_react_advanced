import { authLoginPending, advertsLoadedFulfilled } from "./actions";

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

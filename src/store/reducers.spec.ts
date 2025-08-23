import type { Advert } from "../pages/adverts/types";
import { auth, adverts } from "./reducer";

describe("auth reducer", () => {
  test('should manage "auth/login/fulfilled" action', () => {
    const result = auth(false, { type: "auth/login/fulfilled" });
    expect(result).toBe(true);
  });

  test('should manage "auth/logout" action', () => {
    const result = auth(true, { type: "auth/logout" });
    expect(result).toBe(false);
  });

  test("should manage any other action", () => {
    const result = auth(true, { type: "ui/reset-error" });
    expect(result).toBe(true);
  });
});

describe("adverts reducer", () => {
  const advert: Advert = {
    name: "TestAdvert",
    sale: true,
    price: 1,
    tags: ["motor", "lifestyle"],
    userId: "1",
    createdAt: "2024-01-01T00:00:00.000Z",
    id: " 1",
    photo: "string",
  };
  test('should manage "adverts/created/fulfilled" action', () => {
    const result = adverts(
      { data: [], loaded: false },
      {
        type: "adverts/created/fulfilled",
        payload: advert,
      },
    );
    expect(result.data).toHaveLength(1);
    expect(result.data).toEqual([advert]);
    expect(result.loaded).toBe(false);
  });
});

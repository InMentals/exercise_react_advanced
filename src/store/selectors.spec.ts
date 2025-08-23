import type { RootState } from ".";
import type { Advert } from "../pages/adverts/types";
import { getAdvert } from "./selectors";

describe("getAdvert", () => {
  const advert: Advert = {
    name: "TestAdvert",
    sale: true,
    price: 1,
    tags: ["motor", "lifestyle"],
    userId: "1",
    createdAt: "2024-01-01T00:00:00.000Z",
    id: "1",
    photo: "string",
  };

  const state: RootState = {
    adverts: { data: [advert], loaded: true },
    auth: false,
    ui: { pending: false, error: null },
  };

  test("should return a advert with id 1", () => {
    const result = getAdvert("1")(state);
    expect(result).toBe(advert);
  });

  test("should return undefined", () => {
    const result = getAdvert("2")(state);
    expect(result).toBeUndefined();
  });
});

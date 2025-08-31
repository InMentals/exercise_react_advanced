import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdvertsPage from "./adverts-page";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import type { RootState } from "../../store";

const advertsData = [
  {
    id: "idAdvert1",
    createdAt: "2025-07-28T13:40:06.000Z",
    name: "testAdvert1",
    sale: true,
    price: 5,
    tags: ["tag1"],
    userId: "user1",
    photo: "",
  },
  {
    id: "dAdvert2",
    createdAt: "2025-07-28T13:43:06.000Z",
    name: "testAdvert2",
    sale: false,
    price: 500,
    tags: ["tag1", "tag2"],
    userId: "user1",
    photo: "",
  },

  {
    id: "dAdvert3",
    createdAt: "2025-07-28T13:46:06.000Z",
    name: "testAdvert3",
    sale: false,
    price: 1500,
    tags: ["tag1", "tag3"],
    userId: "user1",
    photo: "",
  },
];

const tagsData = ["tag1", "tag2", "tag3", "tag4"];

describe("AdvertsPage with adverts", () => {
  const state: RootState = {
    auth: true,
    adverts: { loaded: true, data: advertsData },
    tags: {
      loaded: true,
      data: tagsData,
    },
    ui: {
      pending: false,
      error: null,
    },
  };

  const renderComponent = () => {
    return render(
      <Provider
        store={{
          getState: () => state,
          // @ts-expect-error: subscribe
          subscribe: () => {},
          // @ts-expect-error: dispatch
          dispatch: () => {},
        }}
      >
        <MemoryRouter>
          <AdvertsPage />
        </MemoryRouter>
      </Provider>,
    );
  };

  test("should render", () => {
    const { container } = renderComponent();
    const lists = screen.getAllByRole("list");
    const advertsContainer = lists[0];
    expect(advertsContainer.children).toHaveLength(3);
    expect(container).toMatchSnapshot();
  });

  test("filter", async () => {
    renderComponent();
    const sellRadio = screen.getByRole("radio", { name: /Sell/i });
    const buyRadio = screen.getByRole("radio", { name: /Buy/i });
    const advertNameInput = screen.getByLabelText(/name/);
    const applyFilter = screen.getByRole("button", { name: "Apply filter" });
    const clearFilter = screen.getByRole("button", { name: "Clear filter" });
    const lists = screen.getAllByRole("list");
    const advertsContainer = lists[0];

    expect(applyFilter).toHaveTextContent("Apply filter");
    await userEvent.click(sellRadio);
    await userEvent.click(applyFilter);
    expect(advertsContainer.children).toHaveLength(1);
    await userEvent.click(buyRadio);
    await userEvent.click(applyFilter);
    expect(advertsContainer.children).toHaveLength(2);
    await userEvent.click(clearFilter);
    expect(advertsContainer.children).toHaveLength(3);
    await userEvent.type(advertNameInput, "advert0");
    await userEvent.click(applyFilter);
    expect(advertsContainer).toBeEmptyDOMElement();
  });
});

describe("AdvertsPage without adverts", () => {
  const state: RootState = {
    auth: true,
    adverts: { loaded: true, data: [] },
    tags: {
      loaded: true,
      data: tagsData,
    },
    ui: {
      pending: false,
      error: null,
    },
  };

  const renderComponent = () => {
    return render(
      <Provider
        store={{
          getState: () => state,
          // @ts-expect-error: subscribe
          subscribe: () => {},
          // @ts-expect-error: dispatch
          dispatch: () => {},
        }}
      >
        <MemoryRouter>
          <AdvertsPage />
        </MemoryRouter>
      </Provider>,
    );
  };

  test("should render", () => {
    const { container } = renderComponent();
    const noAdvertsText = screen.getByText("There are no adverts published");
    expect(noAdvertsText).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});

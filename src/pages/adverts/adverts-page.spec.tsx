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
    sale: false,
    price: 5,
    tags: ["tag1"],
    userId: "user1",
    photo: "",
  },
  {
    id: "dAdvert1",
    createdAt: "2025-07-28T13:43:06.000Z",
    name: "testAdvert2",
    sale: false,
    price: 500,
    tags: ["tag1", "tag2"],
    userId: "user1",
    photo: "",
  },
];

const tagsData = ["lifestyle", "mobile", "motor", "work"];

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
    expect(advertsContainer).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  //   test("should render without adverts", () => {
  //     const { container } = renderComponent();
  //     const noAdvertsText = screen.getByText("There are no adverts published");
  //     expect(noAdvertsText).toBeInTheDocument();
  //     expect(container).toMatchSnapshot();
  //   });

  test("filter", async () => {
    renderComponent();
    const sellCheckbox = screen.getByLabelText(/Sell/);
    const applyFilter = screen.getByRole("button", { name: "Apply filter" });
    const clearFilter = screen.getByRole("button", { name: "Clear filter" });
    const lists = screen.getAllByRole("list");
    const advertsContainer = lists[0];

    expect(applyFilter).toHaveTextContent("Apply filter");
    await userEvent.click(sellCheckbox);
    await userEvent.click(applyFilter);
    expect(advertsContainer).toBeEmptyDOMElement();
    await userEvent.click(clearFilter);
    expect(advertsContainer).not.toBeEmptyDOMElement();
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

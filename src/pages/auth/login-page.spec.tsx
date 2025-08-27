import { render } from "@testing-library/react";
import LoginPage from "./login-page";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("LoginPage", () => {
  const state = {
    auth: false,
    adverts: { loaded: false, data: [] },
    ui: {
      pending: false,
      error: null,
    },
  };

  const renderComponent = () =>
    render(
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
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

  test("should render", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});

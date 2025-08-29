import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./login-page";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { authLogin } from "../../store/actions";

vi.mock("../../store/actions");

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

  test("should dispatch login action", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);
    const rememberMeCheckbox = screen.getByRole("checkbox");

    expect(rememberMeCheckbox).toBeChecked();

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Log in");
    expect(button).toBeDisabled();

    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "1234");

    expect(button).toBeEnabled();

    fireEvent.click(button);

    expect(authLogin).toHaveBeenCalledWith(
      {
        email: "user@example.com",
        password: "1234",
      },
      true,
    );
  });
});

import { useState, type FormEvent, type ChangeEvent } from "react";
import Button from "../../components/ui/button";
import { login } from "./service";
import { useLoginAction } from "../../store/hooks";
import FormField from "../../components/ui/form-field";
import { useNavigate, useLocation } from "react-router";
import { AxiosError } from "axios";
import "./login-page.css";
import Page from "../../components/layout/page";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const loginAction = useLoginAction();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { email, password } = credentials;
  const isDisabled = !email || !password || isFetching;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  function handleRememberMe(event: ChangeEvent<HTMLInputElement>) {
    setRememberMe(event.target.checked);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsFetching(true);
      await login(credentials, rememberMe);
      loginAction();
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({
          message: error.response?.data?.message ?? error.message ?? "",
        });
        navigate("not-found");
      }
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <Page page="login">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <FormField
            className="loginFormField"
            type="email"
            name="email"
            label="Email"
            value={email}
            placeholder="enter your email"
            onChange={handleChange}
          />
          <FormField
            className="loginFormField"
            type="password"
            name="password"
            label="Password"
            value={password}
            placeholder="enter your password"
            onChange={handleChange}
          />
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div className="submit-container">
            <Button type="submit" $variant="primary" disabled={isDisabled}>
              Log in
            </Button>
          </div>
          {error && (
            <div
              className="login-error"
              role="alert"
              onClick={() => {
                setError(null);
                setCredentials({ email: "", password: "" });
              }}
            >
              {error.message}
            </div>
          )}
        </form>
      </div>
    </Page>
  );
}

export default LoginPage;

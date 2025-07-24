import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import storage from "./utils/storage.ts";
import { setAuthorizationHeader } from "./api/client.ts";
import AuthProvider from "./pages/auth/auth-provider.tsx";
import { BrowserRouter } from "react-router";
import configureStore from "./store";

const store = configureStore();
console.log({ store });
console.log(store.getState());

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider defaultIsLogged={!!accessToken}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);

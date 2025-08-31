import AdvertsPage from "./pages/adverts/adverts-page";
import LoginPage from "./pages/auth/login-page";
import NewAdvertPage from "./pages/adverts/new-advert-page";
import { Navigate, Route, Routes } from "react-router-dom";

import RequireAuth from "./pages/auth/require-auth";
import AdvertPage from "./pages/adverts/advert-page";
import NotFound from "./pages/not-found/not-found";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/adverts" element={<RequireAuth></RequireAuth>}>
        <Route index element={<AdvertsPage />} />
        <Route path=":advertId" element={<AdvertPage />} />
        <Route path="new" element={<NewAdvertPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../store";

function RequireAuth() {
  const isLogged = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <Outlet />;
}

export default RequireAuth;

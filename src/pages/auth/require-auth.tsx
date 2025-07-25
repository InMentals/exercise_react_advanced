import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../store";
import { getIsLogged } from "../../store/selectors";

function RequireAuth() {
  const isLogged = useAppSelector(getIsLogged);
  const location = useLocation();
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <Outlet />;
}

export default RequireAuth;

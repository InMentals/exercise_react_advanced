import Button from "../../components/ui/button";
import { authLogout } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "./service";
import { Link } from "react-router";

function AuthButton() {
  const isLogged = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogoutClick = async () => {
    await logout();
    dispatch(authLogout());
  };

  return isLogged ? (
    <Button $variant="secondary" onClick={handleLogoutClick}>
      Logout
    </Button>
  ) : (
    <Button $variant="primary" as={Link} to="/login">
      Login
    </Button>
  );
}

export default AuthButton;

import Button from "../../components/ui/button";
import { authLogout } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "./service";
import { Link } from "react-router";
import { getIsLogged } from "../../store/selectors";

function AuthButton() {
  const isLogged = useAppSelector(getIsLogged);
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

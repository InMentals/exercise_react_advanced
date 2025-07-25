import Button from "../../components/ui/button";
import { logout } from "./service";
import { Link } from "react-router";
import { useAuth, useLogoutAction } from "../../store/hooks";

function AuthButton() {
  const isLogged = useAuth();
  const logoutAction = useLogoutAction();
  const handleLogoutClick = async () => {
    await logout();
    logoutAction();
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

import Button from "../../components/ui/button";
import { Link } from "react-router";
import { useAuth, useLogoutAction } from "../../store/hooks";

function AuthButton() {
  const isLogged = useAuth();
  const logoutAction = useLogoutAction();

  return isLogged ? (
    <Button $variant="secondary" onClick={logoutAction}>
      Logout
    </Button>
  ) : (
    <Button $variant="primary" as={Link} to="/login">
      Login
    </Button>
  );
}

export default AuthButton;

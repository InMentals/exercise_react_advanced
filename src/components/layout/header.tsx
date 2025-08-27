import "./header.css";
import logo from "../../assets/logo-wallareact.svg";
import AuthButton from "../../pages/auth/auth-button";
import { Link } from "react-router-dom";
import LinkButton from "../ui/link-button";

interface HeaderProps {
  page: string;
}

function Header({ page }: HeaderProps) {
  return (
    <header className="header">
      <Link className="logo" to="/">
        <img src={logo} alt="" className="logoImg" />
        <h1>WallaReact</h1>
      </Link>
      {page != "login" && (
        <nav className="nav">
          {page === "adverts" && (
            <LinkButton $variant="primary" to="/adverts/new">
              Publish new advert
            </LinkButton>
          )}
          {(page === "new" || page === "advert") && (
            <LinkButton $variant="primary" to="/adverts">
              Show adverts
            </LinkButton>
          )}
          <AuthButton />
        </nav>
      )}
    </header>
  );
}

export default Header;

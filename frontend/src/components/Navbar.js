import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useUserContext } from "../hooks/userContextHook";
import { logout } from "../actions/user";

const Navbar = function ({ links }) {
  const { isLoggedIn, user, dispatch } = useUserContext();

  return (
    <header>
      <div className="container-navbar">
        <Link to="/" className="logo">
          <h1>Home</h1>
        </Link>
        <div className="links">
          {links.map((link) =>
            link ? (
              <Link
                to={link.path}
                onClick={link.name == "Logout" ? () => logout(dispatch) : null}
              >
                <h3>{link.name}</h3>
              </Link>
            ) : (
              <></>
            )
          )}
        </div>
        <div className="userInfo">
          {isLoggedIn ? <h3>Welcome {user.name}</h3> : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

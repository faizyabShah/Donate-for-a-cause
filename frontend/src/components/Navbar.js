import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useUserContext } from "../hooks/userContextHook";
import { logout } from "../actions/user";
import { orgLogout } from "../actions/org";

const Navbar = function ({ links }) {
  const { isUser, isLoggedIn, user, dispatch } = useUserContext();

  const _logout = function () {
    if (isUser) {
      logout(dispatch);
    } else {
      orgLogout(dispatch);
    }
  };

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
                onClick={link.name == "Logout" ? () => _logout(dispatch) : null}
              >
                <h3>{link.name}</h3>
              </Link>
            ) : (
              <></>
            )
          )}
        </div>
        <div className="userInfo">
          {isLoggedIn ? (
            <Link to="/profile">
              <h3>{user.name}</h3>
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

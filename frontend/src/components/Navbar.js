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
          {links.map((link) => (
            <Link to={link.path}>
              <h3>{link.name}</h3>
            </Link>
          ))}
        </div>
        <div className="userInfo">
          {isLoggedIn ? <h2>Welcome {user}</h2> : null}
          {isLoggedIn ? (
            <button className="btn" onClick={() => logout(dispatch)}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

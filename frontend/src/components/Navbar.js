// import { Link } from "react-router-dom";
// import "./Navbar.scss";
// import { useUserContext } from "../hooks/userContextHook";
// import { logout } from "../actions/user";
// import { orgLogout } from "../actions/org";

// const Navbar = function ({ links }) {
//   const { isOrg, isLoggedIn, user, dispatch } = useUserContext();

//   const _logout = function () {
//     if (!isOrg) {
//       logout(dispatch);
//     } else {
//       orgLogout(dispatch);
//     }
//   };

//   return (
//     <header>
//       <div className="container-navbar">
//         <h1></h1>
        
//         <div className="links">
//          <Link to={isOrg ? "/org-dashboard" : "/"} className="logo">
//            <h3>Home</h3>
//          </Link>
//           {links.map((link) =>
//             link ? (
//               <Link
//                 to={link.path}
//                 onClick={link.name == "Logout" ? () => _logout(dispatch) : null}
//               >
//                 <h3>{link.name}</h3>
//               </Link>
//             ) : (
//               <></>
//             )
//           )}
//         </div>
//         <div className="userInfo">
//           {isLoggedIn ? (
//             <Link to="/profile">
//               <h3>{user.name}</h3>
//             </Link>
//           ) : null}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useUserContext } from "../hooks/userContextHook";
import { logout } from "../actions/user";
import { orgLogout } from "../actions/org";

const Navbar = function ({ links }) {
  const { isOrg, isLoggedIn, user, dispatch } = useUserContext();

  const _logout = function () {
    if (!isOrg) {
      logout(dispatch);
    } else {
      orgLogout(dispatch);
    }
  };

  return (
    <header>
      <div className="container-navbar">
        <Link to={isOrg ? "/org-dashboard" : "/"} className="logo">
        <img src={require('../Images/logoFinal-min.png')} className='navbar-logo'/>
        </Link>
        <div className="links">
        <Link to={isOrg ? "/org-dashboard" : "/"} className="logo">
                     <h3>Home</h3>
        </Link>
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

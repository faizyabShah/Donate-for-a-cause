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
        <h1>❤️‍🩹🎗️</h1>
        
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
// import { Navbar, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useUserContext } from "../hooks/userContextHook";
// import { logout } from "../actions/user";
// import { orgLogout } from "../actions/org";

// function MyNavbar({ links }) {
//   const { isOrg, isLoggedIn, user, dispatch } = useUserContext();

//   const handleLogout = () => {
//     if (!isOrg) {
//       logout(dispatch);
//     } else {
//       orgLogout(dispatch);
//     }
//   };

//   return (
//     <Navbar bg="light" expand="lg">
//       <Link to={isOrg ? "/org-dashboard" : "/"} className="navbar-brand">
//         <h1>Home</h1>
//       </Link>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//           {links.map((link) =>
//             link ? (
//               <Nav.Link key={link.name} as={Link} to={link.path}>
//                 <h3>{link.name}</h3>
//               </Nav.Link>
//             ) : (
//               <></>
//             )
//           )}
//         </Nav>
//         {isLoggedIn ? (
//           <Nav>
//             <Nav.Link as={Link} to="/profile">
//               <h3>{user.name}</h3>
//             </Nav.Link>
//             <Nav.Link onClick={handleLogout}>
//               <h3>Logout</h3>
//             </Nav.Link>
//           </Nav>
//         ) : null}
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }

// export default MyNavbar;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Donate from "./pages/Donate";
import OrgRegister from "./pages/OrgRegister";
import OrgDashboard from "./pages/OrgDashboard";
import { useUserContext } from "./hooks/userContextHook";
import { useState } from "react";
import NotificationsModal from "./components/NotificationsModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { isLoggedIn, isOrg } = useUserContext();
  const handleHide = () => {
    setShowNotifications(false);
  };
  const handleShow = () => {
    setShowNotifications(true);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          links={[
            isLoggedIn && !isOrg
              ? { path: "/user-dashboard", name: "Dashboard" }
              : null,
            isLoggedIn ? null : { path: "./login", name: "Login" },
            isLoggedIn ? null : { path: "./register", name: "Register" },
            isLoggedIn && !isOrg ? { path: "./donate", name: "Donate" } : null,
            !isOrg ? { path: "/about", name: "About" } : null,
            isLoggedIn ? { path: "./", name: "Logout" } : null,
            !isLoggedIn
              ? { path: "./org-register", name: "Organization" }
              : null,
          ]}
          notifications={isLoggedIn && !isOrg}
          setShowNotifications={handleShow}
        />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login isUser={true} />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user-dashboard" element={<UserDashboard />}></Route>
            <Route path="/donate" element={<Donate />}></Route>
            <Route path="/org-login" element={<Login isUser={false} />}></Route>
            <Route path="/org-register" element={<OrgRegister />}></Route>
            <Route path="/org-dashboard" element={<OrgDashboard />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      {showNotifications && (
        <NotificationsModal handleClose={handleHide} handleShut={handleHide} />
      )}
    </div>
  );
}

export default App;

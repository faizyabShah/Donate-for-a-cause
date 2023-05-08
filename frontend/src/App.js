import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Donate from "./pages/Donate";
import OrgRegister from "./pages/OrgRegister";
import { useUserContext } from "./hooks/userContextHook";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const { isLoggedIn, isOrg } = useUserContext();
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
            isLoggedIn & !isOrg ? { path: "./donate", name: "Donate" } : null,
            { path: "/about", name: "About" },
            isLoggedIn ? { path: "./logout", name: "Logout" } : null,
          ]}
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

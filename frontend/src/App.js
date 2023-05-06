import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import { useUserContext } from "./hooks/userContextHook";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import "./App.scss";

function App() {
  const { isLoggedIn } = useUserContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          links={[
            isLoggedIn ? { path: "/user-dashboard", name: "Dashboard" } : null,
            { path: "/about", name: "About" },
            isLoggedIn ? null : { path: "./login", name: "Login" },
            isLoggedIn ? null : { path: "./register", name: "Register" },
            isLoggedIn ? { path: "./logout", name: "Logout" } : null,
          ]}
        />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user-dashboard" element={<UserDashboard />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

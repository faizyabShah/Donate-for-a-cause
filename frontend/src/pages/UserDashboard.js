import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import Profile from "../components/Profile";
import Donations from "../components/Donations";
import Wallet from "../components/Wallet";
// import Donate from "../components/Donate";
import "./UserDashboard.scss";

const UserDashboard = function () {
  const [page, setPage] = useState("overview");
  return (
    <div className="userDashboard">
      <Sidebar
        setPage={setPage}
        pages={["overview", "profile", "donations", "wallet"]}
      />
      {page === "overview" ? (
        <Overview />
      ) : page === "profile" ? (
        <Profile />
      ) : page === "donations" ? (
        <Donations />
      ) : page === "wallet" ? (
        <Wallet />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserDashboard;

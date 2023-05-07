import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Projects from "../components/Projects";
function Donate() {
  const [page, setPage] = useState("overview");
  return (
    <div className="userDashboard">
      <Sidebar setPage={setPage} pages={["Alkhidmat", "org", "org2", "idk"]} />
      <Projects orgname={page} />
    </div>
  );
}

export default Donate;

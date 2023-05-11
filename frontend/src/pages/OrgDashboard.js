import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import Projectform from "../components/Projectform";
import OrgProjects from "../components/OrgProjects";
import { useUserContext } from "../hooks/userContextHook";
import "./orgDashboard.scss";

function OrgDashboard() {
  const [projects, setProjects] = useState();
  const { token, user } = useUserContext();
  useEffect(() => {
    const fetchProjects = async () => {
      const url = "http://localhost:5000/api/projects/organization/";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setProjects(data);
    };
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const [page, setPage] = useState("overview");
  return (
    <div className="orgDashboard">
      <Sidebar
        setPage={setPage}
        pages={["overview", "projects", "Add project", "zakaat"]}
      />
      {page === "overview" ? (
        <Overview />
      ) : page === "add project" ? (
        <Projectform setPage={setPage} />
      ) : page === "projects" ? (
        <OrgProjects projects={projects} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default OrgDashboard;

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import Projectform from "../components/Projectform";
import OrgProjects from "../components/OrgProjects";
import { useUserContext } from "../hooks/userContextHook";
import "./orgDashboard.scss";

function OrgDashboard() {
  const [projects, setProjects] = useState();
  const { token } = useUserContext();
  useEffect(() => {
    const fetchProjects = async () => {
      const url = "http://localhost:5000/api/projects/org/";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setProjects(data);
      console.log(projects);
    };
    if (token) {
      fetchProjects();
    }
  }, []);

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
        <OrgProjects />
      ) : (
        <></>
      )}
    </div>
  );
}

export default OrgDashboard;

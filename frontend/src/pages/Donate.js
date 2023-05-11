import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Projects from "../components/Projects";
import { useUserContext } from "../hooks/userContextHook";
function Donate() {
  const { user, token } = useUserContext();
  const [organizations, setOrganizations] = useState(null);
  const [projects, setProjects] = useState(null);
  const [page, setPage] = useState("overview");
  useEffect(() => {
    const fetchProjects = async () => {
      const url = "http://localhost:5000/api/projects/getallprojects/";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setProjects(data);
    };

    const fetchOrganizations = async () => {
      const url = "http://localhost:5000/api/organization/getallorganizations";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setOrganizations(data);
    };
    if (user) {
      fetchOrganizations();
      fetchProjects();
    }
  }, [user]);
  return (
    <div className="userDashboard">
      <Sidebar setPage={setPage} pages={organizations} isSpecial={true} />
      <Projects org={page} projects={projects} />
    </div>
  );
}

export default Donate;

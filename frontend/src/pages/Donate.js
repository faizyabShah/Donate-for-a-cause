import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Projects from "../components/Projects";
import { useUserContext } from "../hooks/userContextHook";
function Donate() {
  const { user, token, dispatch } = useUserContext();
  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState("overview");

  const handleDonate = async (i, _amount) => {
    if (projects[i].amount_raised + _amount > projects[i].amount_required) {
      _amount = projects[i].amount_required - projects[i].amount_raised;
    }

    let data = {
      id: projects[i]._id,
      amount: _amount,
    };

    const url = "http://localhost:5000/api/projects/donate";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data }),
    };
    const res = await fetch(url, options);

    if (!res.ok) {
      return console.log("Something went wrong while donating to project");
    } else {
      setProjects(
        projects.map((project) =>
          project._id === projects[i]._id
            ? { ...project, amount_raised: project.amount_raised + _amount }
            : project
        )
      );
      dispatch({ type: "DONATE", payload: { amount: _amount } });
    }
  };

  const fetchProjects = async () => {
    const url = "http://localhost:5000/api/projects/getallprojects/";
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(url, options);
    const data = await res.json();
    setPage(data[0].organization);
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

  useEffect(() => {
    if (user) {
      fetchOrganizations();
      fetchProjects();
    }
  }, [user]);
  return (
    <div className="userDashboard">
      <Sidebar setPage={setPage} pages={organizations} isSpecial={true} />
      <Projects org={page} projects={projects} handleDonate={handleDonate} />
    </div>
  );
}

export default Donate;

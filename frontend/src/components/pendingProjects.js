import React from "react";
import { useUserContext } from "../hooks/userContextHook";
import "./ProjectCard.scss";
import Loader from "./Loader";

const ProjectCard = ({
  _id,
  name,
  description,
  cost,
  amount_raised,
  status,
  setProjects,
  projects,
}) => {
  const { token } = useUserContext();
  const changeStatus = async () => {
    const url = `http://localhost:5000/api/projects/completeproject/${_id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      console.log("something went wrong.");
      return;
    }
    setProjects(
      projects.map((project) =>
        project._id === _id ? { ...project, status: "Completed" } : project
      )
    );
  };

  return (
    <div className="project-card">
      <h2>{name || "loading"}</h2>
      <p>{description}</p>
      <p>Cost: ${cost}</p>
      <p>Amount Raised: ${amount_raised}</p>
      <p>{status}</p>
      <button disabled={status == "Completed"} onClick={changeStatus}>
        check
      </button>
    </div>
  );
};

const PendingProjects = ({ projects, setProjects }) => {
  return (
    <div className="project-list">
      {projects != null ? (
        projects.map(
          (project) =>
            project.amount_raised >= project.cost && (
              <ProjectCard
                key={project.name}
                {...project}
                setProjects={setProjects}
                projects={projects}
              />
            )
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PendingProjects;

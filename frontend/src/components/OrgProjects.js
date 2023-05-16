import React from "react";
import "./ProjectCard.scss";

const ProjectCard = ({ name, description, cost, amount_raised, Picture }) => {
  return (
    <div className="project-card">
      <h2>{name || "loading"}</h2>
      <p>{description}</p>
      <p>Cost: ${cost}</p>
      <p>Amount Raised: ${amount_raised}</p>
    </div>
  );
};

const OrgProjects = ({ projects }) => {
  return (
    <div className="project-list">
      {projects != null ? (
        projects.map(
          (project) =>
            project.amount_raised < project.cost && (
              <ProjectCard key={project.name} {...project} />
            )
        )
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default OrgProjects;

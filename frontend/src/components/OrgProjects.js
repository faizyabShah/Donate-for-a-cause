import React from "react";
import "./ProjectCard.scss";
import "./OrgProjects.scss";

const ProjectCard = ({ name, description, cost, amount_raised }) => {
  return (
    <div className="project-card">
      <h2>{name || "loading"}</h2>
      <p className="description">{description}</p>
      <p className="cost">Cost: ${cost}</p>
      <p className="collected">Amount Raised: ${amount_raised}</p>
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

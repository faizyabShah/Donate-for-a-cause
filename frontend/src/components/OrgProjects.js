import React from "react";
import "./ProjectCard.scss";

const ProjectCard = ({ name, description, cost, amount_raised }) => {
  return (
    <div className="project-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Cost: ${cost}</p>
      <p>Amount Raised: ${amount_raised}</p>
    </div>
  );
};

const OrgProjects = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard key={project.name} {...project} />
      ))}
    </div>
  );
};

export default OrgProjects;

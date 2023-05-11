import "./Projects.scss";

function Projects({ org, projects }) {
  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="projectsList">
        {projects != null
          ? projects.map((project) =>
              project.organization == org ? (
                <div className="project">
                  <div className="projectTitle">{project.name}</div>
                  <div className="projectDescription">
                    {project.description}
                  </div>
                  <div className="projectAmount">
                    <div className="projectAmountRequired">
                      <div className="projectAmountRequiredTitle">
                        Amount Required
                      </div>
                      <div className="projectAmountRequiredAmount">
                        {project.cost}
                      </div>
                    </div>
                    <div className="projectAmountCollected">
                      <div className="projectAmountCollectedTitle">
                        Amount Collected
                      </div>
                      <div className="projectAmountCollectedAmount">
                        {project.amount_raised}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )
          : null}
      </div>
    </div>
  );
}

export default Projects;

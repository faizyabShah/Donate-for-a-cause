import AddDonationModal from "./AddDonationModal";
import { useState } from "react";
import "./Projects.scss";

function Projects({ org, projects, handleDonate }) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [i, setI] = useState();

  const handleModalClose = () => {
    handleDonate(i, amount);
    setShowModal(false);
  };

  const something = (e) => {
    const index = e.target.getAttribute("data-index");
    setShowModal(true);
    setI(index);
  };

  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="projectsList">
        {projects != null
          ? projects.map((project, i) =>
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
                  <button onClick={(e) => something(e)} data-index={i}>
                    Donate
                  </button>
                </div>
              ) : null
            )
          : null}
        {showModal ? (
          <AddDonationModal
            index={i}
            handleClose={handleModalClose}
            setAmount={setAmount}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Projects;

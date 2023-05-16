import { Button, Modal } from "react-bootstrap";
import "./ProjectDetailsModal.scss";

function ProjectDetailsModal({ somethingthree, project, i }) {
  return (
    <>
      <Modal show={true} onHide={(e) => somethingthree(i)}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{project.name}</h4>
          <p>{project.description}</p>
          <img
            className="modalImage"
            src={project.Picture}
            alt={project.name}
          />
          <div className="projectAmount">
            <div className="projectAmountRequired">
              <div className="projectAmountRequiredTitle">Amount Required</div>
              <div className="projectAmountRequiredAmount">{project.cost}</div>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => somethingthree(i)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectDetailsModal;

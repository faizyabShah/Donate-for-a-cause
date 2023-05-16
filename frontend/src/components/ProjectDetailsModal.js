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
          <p>Amount Collected: {project.amount_raised}</p>
          <p>Amount Required: {project.cost}</p>
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

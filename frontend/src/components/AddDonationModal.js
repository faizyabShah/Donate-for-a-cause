import { Button, Modal } from "react-bootstrap";
import PaymentInputs from "./Payment";

function AddDonationModal({ handleClose, index, setAmount }) {
  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Donate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter Amount:
          <input
            type="number"
            placeholder="Enter Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <PaymentInputs />
        </Modal.Body>
        <Modal.Footer>
          <Button data-index={index} variant="secondary" onClick={handleClose}>
            Donate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddDonationModal;

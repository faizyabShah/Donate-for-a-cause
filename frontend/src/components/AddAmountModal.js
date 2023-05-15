import { Button, Modal } from "react-bootstrap";
import PaymentInputs from "./Payment";

function AddAmountModal({ handleClose, index, setAmount }) {
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
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAmountModal;

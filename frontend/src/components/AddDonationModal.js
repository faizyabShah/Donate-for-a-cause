import { Button, Modal } from "react-bootstrap";

function AddDonationModal({
  handleClose,
  handleShut,
  index,
  setAmount,
  error,
}) {
  return (
    <>
      <Modal show={true} onHide={handleShut}>
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
        </Modal.Body>
        {error && <p className="error">{error}</p>}
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

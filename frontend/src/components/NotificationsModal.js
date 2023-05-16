import { Button, Modal } from "react-bootstrap";
import { useUserContext } from "../hooks/userContextHook";
import "./NotificationsModal.scss";

function NotificationsModal({ handleClose, handleShut }) {
  const { user } = useUserContext();
  return (
    <>
      <Modal show={true} onHide={handleShut}>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="notifications">
            {user.notifications.length != 0
              ? user.notifications.map((notification) => (
                  <div className="notification">
                    <p>{notification.message}</p>
                    <p>{notification.timestamp}</p>
                  </div>
                ))
              : "No notifications"}
            {user.notifications != null ? (
              <Button className="clear">Clear</Button>
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotificationsModal;

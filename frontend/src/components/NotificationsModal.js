import { Button, Modal } from "react-bootstrap";
import { useUserContext } from "../hooks/userContextHook";
import "./NotificationsModal.scss";

function NotificationsModal({ handleClose, handleShut }) {
  const { user, token, dispatch } = useUserContext();
  const clearNotifications = async () => {
    const url = "http://localhost:5000/api/users/clearnotifications";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({}),
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      console.log("something went wrong");
      return;
    }
    dispatch({ type: "CLEARNOTIFICATIONS" });
  };
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
            {user.notifications.length != 0 ? (
              <Button className="clear" OnClick={clearNotifications}>
                Clear
              </Button>
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

import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useUserContext } from "../hooks/userContextHook";
import { editUser } from "../actions/user";
import "./Profile.scss";

const Profile = () => {
  const { token, loading, error, user, dispatch } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [myuser, setUser] = useState(user);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    await editUser(myuser, token, dispatch);
    if (!error) {
      setIsEditing(!isEditing);
    }
    setIsEditing(!isEditing);
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="text-center mb-5">Profile</h1>
          {isEditing ? (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={myuser.name}
                  onChange={(e) => setUser({ ...myuser, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formOldPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) =>
                    setUser({ ...myuser, oldPassword: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formNewPassword">
                <Form.Label>New Password/Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) =>
                    setUser({ ...myuser, password: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={myuser.location}
                  onChange={(e) =>
                    setUser({ ...myuser, location: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  value={user.contact}
                  onChange={(e) =>
                    setUser({ ...user, contact: e.target.value })
                  }
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  onClick={handleSaveClick}
                  className="mx-2"
                  disabled={loading}
                >
                  Save
                </Button>
                <Button
                  disabled={loading}
                  variant="secondary"
                  onClick={handleEditClick}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          ) : (
            <>
              <p className="mb-1">
                <strong>Name:</strong> {myuser.name}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {myuser.email}
              </p>
              <p className="mb-1">
                <strong>Location:</strong> {myuser.location}
              </p>
              <p className="mb-1">
                <strong>Contact:</strong> {myuser.contact}
              </p>
              <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={handleEditClick}>
                  Edit
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

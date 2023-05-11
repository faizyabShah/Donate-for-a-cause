import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useUserContext } from "../hooks/userContextHook";
import AddProjectModal from "./ProjectAddModal";
import { Navigate, useNavigate } from "react-router-dom";

function Projectform({ setPage }) {
  const navigate = useNavigate();
  const { token } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    type: "",
    audit: "",
    picture: "",
  });

  const handleModalClose = () => {
    setShowModal(false);
    setPage("overview");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(token);
    setLoading(true);
    if (token) {
      const response = await fetch(
        "http://localhost:5000/api/projects/addproject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData }),
        }
      );
      setLoading(false);
      if (!response.ok) {
        setError("Something went wrong");
      } else {
        setShowModal(true);
        setFormData({
          name: "",
          description: "",
          cost: "",
          type: "",
          audit: "",
          picture: "",
        });

        setError(null);
      }
    }
  };
  return (
    <div className="projectForm">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter project description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="cost">
          <Form.Label>Project Cost</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter project cost"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="type">
          <Form.Label>Project Type</Form.Label>
          <Form.Control
            as="select"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="">Choose...</option>
            <option value="Zakat">Zakat</option>
            <option value="sadqa">Sadqa</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="audit">
          <Form.Label>Audit Information</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter audit information"
            value={formData.audit}
            onChange={(e) =>
              setFormData({ ...formData, audit: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="picture">
          <Form.Label>Project Picture</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project picture URL"
            value={formData.picture}
            onChange={(e) =>
              setFormData({ ...formData, picture: e.target.value })
            }
          />
        </Form.Group>

        {error && <p className="error">{error}</p>}

        <Button disabled={loading} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {showModal ? <AddProjectModal handleClose={handleModalClose} /> : null}
    </div>
  );
}

export default Projectform;

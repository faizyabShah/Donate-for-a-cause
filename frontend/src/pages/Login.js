import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/userContextHook";
import { login } from "../actions/user";
import { orgLogin } from "../actions/org";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "./Login.scss";

function Login({ isUser }) {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, error, dispatch } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "RESET" });
    return () => {};
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUser) {
      var loginResult = await login(formData, dispatch);
    } else {
      var loginResult = await orgLogin(formData, dispatch);
    }

    setFormData({
      email: "",
      password: "",
    });

    if (loginResult) {
      return;
    }

    if (isUser) {
      navigate("/");
    } else {
      navigate("/org-dashboard");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <div className="login">
        <h3>Login</h3>
        <Form onSubmit={handleSubmit} className="text-center login-form">
          <Form.Group controlId="email">
            <Form.Label className="login-label">Email:</Form.Label>
            <Form.Control
              className="login-input"
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="login-label">Password:</Form.Label>
            <Form.Control
              className="login-input"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Group>

          <Button
            className="mt-3"
            variant="primary"
            disabled={isLoading}
            type="submit"
          >
            Login
          </Button>

          {error && <p className="error">{error}</p>}
        </Form>
      </div>
    </Container>
  );
}

export default Login;

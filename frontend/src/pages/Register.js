import "./Register.scss";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/userContextHook";
import { signup } from "../actions/user";
import { useNavigate } from "react-router-dom";

const Register = function () {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    contact: "",
    location: "",
    email: "",
  });

  const navigate = useNavigate();

  const { error, isLoading, dispatch } = useUserContext();

  useEffect(() => {
    dispatch({ type: "RESET" });
    return () => {};
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(formData, dispatch);
    if (error == null) {
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label for="contact">Contact</label>
          <input
            type="number"
            className="form-control"
            id="contact"
            placeholder="Enter contact"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label for="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <button disabled={isLoading} type="submit" className="btn btn-primary">
          Register
        </button>

        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
};

export default Register;

import "./OrgRegister.scss";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/userContextHook";
import { orgSignup } from "../actions/org";
import { useNavigate } from "react-router-dom";

const OrgRegister = function () {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    description: "",
    phone: "",
    location: "",
    email: "",
    picture: "",
  });

  const navigate = useNavigate();

  const { error, isLoading, dispatch } = useUserContext();

  useEffect(() => {
    dispatch({ type: "RESET" });
    return () => {};
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await orgSignup(formData, dispatch);
    if (error != null) {
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
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
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
        <div className="form-group">
          <label for="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label for="picture">Picture</label>
          <input
            type="text"
            className="form-control"
            id="picture"
            placeholder="Enter picture"
            value={formData.picture}
            onChange={(e) =>
              setFormData({ ...formData, picture: e.target.value })
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

export default OrgRegister;

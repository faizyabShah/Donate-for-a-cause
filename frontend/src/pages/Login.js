import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/userContextHook";
import { login } from "../actions/user";
import { orgLogin } from "../actions/org";
import { useNavigate } from "react-router-dom";

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
      await login(formData, dispatch);
    } else {
      await orgLogin({ org: formData, token: "token" }, dispatch);
    }

    setFormData({
      email: "",
      password: "",
    });

    if (!error) {
      navigate("/");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email: </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button disabled={isLoading} type="submit">
          Login
        </button>
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
}

export default Login;

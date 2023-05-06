export const login = async function (formData, dispatch) {
  dispatch({ type: "LOADING" });
  const reponse = await fetch("http://localhost:5000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData }),
  });
  const json = await reponse.json();
  if (!reponse.ok) {
    dispatch({ type: "ERROR", payload: { error: json.msg } });
  }
  if (reponse.ok) {
    localStorage.setItem("user", JSON.stringify(json));
    dispatch({
      type: "LOGIN",
      payload: json,
    });
  }
};

export const logout = function (dispatch) {
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
};

export const signup = async function (formData, dispatch) {
  dispatch({ type: "LOADING" });
  const response = await fetch("http://localhost:5000/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData }),
  });

  const json = await response.json();
  if (!response.ok) {
    dispatch({ type: "ERROR", payload: { error: json.msg } });
  }
  if (response.ok) {
    localStorage.setItem("user", JSON.stringify(json));
    dispatch({
      type: "LOGIN",
      payload: json,
    });
  }
};

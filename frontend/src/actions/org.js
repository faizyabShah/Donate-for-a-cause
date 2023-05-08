export const orgLogin = async function (formData, dispatch) {
  dispatch({ type: "LOADING" });
  const reponse = await fetch("http://localhost:5000/api/organization/login", {
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
    localStorage.setItem("org", JSON.stringify(json));
    dispatch({
      type: "ORGLOGIN",
      payload: json,
    });
  }
};

export const orgLogout = function (dispatch) {
  localStorage.removeItem("org");
  dispatch({ type: "LOGOUT" });
};

export const orgSignup = async function (formData, dispatch) {
  dispatch({ type: "LOADING" });
  const response = await fetch(
    "http://localhost:5000/api/organization/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    }
  );

  const json = await response.json();
  if (!response.ok) {
    dispatch({ type: "ERROR", payload: { error: json.msg } });
  }
  if (response.ok) {
    localStorage.setItem("org", JSON.stringify(json));
    dispatch({
      type: "ORGLOGIN",
      payload: json,
    });
  }
};

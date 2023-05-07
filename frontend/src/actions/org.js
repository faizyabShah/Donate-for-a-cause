export const orgLogin = async function (formData, dispatch) {
  dispatch({ type: "LOADING" });
  // const reponse = await fetch("http://localhost:5000/api/user/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ ...formData }),
  // });
  // const json = await reponse.json();
  // if (!reponse.ok) {
  //   dispatch({ type: "ERROR", payload: { error: json.msg } });
  // }
  // if (reponse.ok) {
  //   localStorage.setItem("user", JSON.stringify(json));
  //   dispatch({
  //     type: "LOGIN",
  //     payload: json,
  //   });
  // }
  localStorage.setItem("org", JSON.stringify(formData));
  dispatch({ type: "ORGLOGIN", payload: formData });
};

export const orgLogout = function (dispatch) {
  localStorage.removeItem("org");
  dispatch({ type: "LOGOUT" });
};

export const orgSignup = async function (formData, dispatch) {
  dispatch({ type: "LOADING" });
  //   const response = await fetch("http://localhost:5000/api/user/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ...formData }),
  //   });

  //   const json = await response.json();
  //   if (!response.ok) {
  //     dispatch({ type: "ERROR", payload: { error: json.msg } });
  //   }
  //   if (response.ok) {
  //     localStorage.setItem("user", JSON.stringify(json));
  //     dispatch({
  //       type: "LOGIN",
  //       payload: json,
  //     });
  //   }
  localStorage.setItem("org", JSON.stringify(formData));
  dispatch({ type: "ORGLOGIN", payload: formData });
};

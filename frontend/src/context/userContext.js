import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    isOrg: false,
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchUserData = async () => {
      const endpoint = user.isOrg
        ? "http://localhost:5000/api/organization/getorginfo/"
        : "http://localhost:5000/api/user/getuserinfo/";
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        localStorage.removeItem("user");
        return;
      }
      const json = await response.json();
      user.isOrg
        ? dispatch({ type: "ORGLOGIN", payload: json })
        : dispatch({
            type: "LOGIN",
            payload: json,
          });
    };

    if (user) {
      fetchUserData();
    }
    return () => {};
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          isOrg: false,
          user: action.payload.user,
          token: action.payload.token,
          isLoggedIn: true,
          isLoading: false,
          error: null,
        };
      case "LOGOUT":
        return {
          ...state,
          isOrg: false,
          user: null,
          token: null,
          isLoggedIn: false,
          isLoading: false,
          error: null,
        };
      case "LOADING":
        return {
          ...state,
          isLoading: true,
        };
      case "ERROR":
        return {
          ...state,
          error: action.payload.error,
          isLoading: false,
        };
      case "RESET":
        return {
          ...state,
          error: null,
          isLoading: false,
        };
      case "ORGLOGIN":
        return {
          ...state,
          isOrg: true,
          user: action.payload.org,
          token: action.payload.token,
          isLoggedIn: true,
          isLoading: false,
          error: null,
        };
      case "ORGSIGNUP":
        return {
          ...state,
          isOrg: true,
          user: action.payload.org,
          token: action.payload.token,
          isLoggedIn: true,
          isLoading: false,
          error: null,
        };
      case "DONATE":
        return {
          ...state,
          user: {
            ...state.user,
            wallet: state.user.wallet - action.payload.amount,
          },
        };
      case "ADDAMOUNT":
        return {
          ...state,
          user: {
            ...state.user,
            wallet: state.user.wallet + parseInt(action.payload.amount),
          },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    }
    return () => {};
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        console.log("here");
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          isLoggedIn: true,
          isLoading: false,
          error: null,
        };
      case "LOGOUT":
        return {
          ...state,
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

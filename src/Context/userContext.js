import { createContext, useReducer } from "react";

const initialState = {
  isLogin: false,
  user: {},
};

export const UserContext = createContext(initialState);

const reducer = (_state, action) => {
  const { status, payload } = action;

  switch (status) {
    case "login":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case "logout":
      localStorage.removeItem("token");
      return initialState;
    default:
      return initialState;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

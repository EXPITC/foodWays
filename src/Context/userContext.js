import { createContext, useReducer } from "react";

export const UserContext = createContext(null);

const initialState = {
  isLogin: false,
  user: {},
  resto: {},
};

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
      return {
        isLogin: false,
        user: {},
        resto: {},
      };
    default:
      throw new Error();
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

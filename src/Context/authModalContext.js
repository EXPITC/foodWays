import { createContext, useReducer } from "react";

const initialState = {
  isLoginModal: false,
  isRegisterModal: false,
};

export const AuthModalContext = createContext(initialState);

const reducer = (_state, action) => {
  // const { status } = action;

  switch (action) {
    case "openLoginModal":
      return {
        isLoginModal: true,
        isRegisterModal: false,
      };
    case "openRegisterModal":
      return {
        isRegisterModal: true,
        isLoginModal: false,
      };
    case "closeAuthModal":
      return {
        isRegisterModal: false,
        isLoginModal: false,
      };
    default:
      return initialState;
  }
};

export const AuthModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthModalContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthModalContext.Provider>
  );
};

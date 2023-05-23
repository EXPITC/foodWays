import { useContext } from "react";
import { AuthModalContext } from "../../Context/authModalContext";
import Login from "../Login";
import Register from "../Register";

const AuthButtons = () => {
  const { state, dispatch } = useContext(AuthModalContext);
  const { isLoginModal, isRegisterModal } = state;
  // const reg = () => (setDrop(false),setWhich(!which));
  // const login = () => (setDrop(false),setWhich(false));
  const handleLoginModal = () => {
    dispatch("openLoginModal");
  };
  const handleRegisterModal = () => {
    dispatch("openRegisterModal");
  };

  const handleClose = () => dispatch("closeAuthModal");

  return (
    <>
      <Login
        modal={isLoginModal}
        handleCloseAuthModal={handleClose}
        handleRegisterModal={handleRegisterModal}
      />
      <Register
        modal={isRegisterModal}
        handleCloseAuthModal={handleClose}
        handleLoginModal={handleLoginModal}
        toggle={handleRegisterModal}
      />
    </>
  );
};

export default AuthButtons;

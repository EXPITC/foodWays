import React, {
  useState,
  // useEffect,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { API, handleError } from "../../config/api";

import Xbtns from "../../img/close.png";

import { Wrapper, Bg } from "./Login.styled";

const Login = ({ modal, handleCloseAuthModal, handleRegisterModal }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { dispatch } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handelChange = (e) => {
    if (isLoading) return;
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handelLogin = async (e) => {
    try {
      if (form.email.split(" ").length > 1) return;
      e.preventDefault();
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post("/login", body, config);
      if (response?.status === 200) {
        dispatch({
          status: "login",
          payload: response.data,
        });
        handleCloseAuthModal();
      }
      if (response.data?.role === "owner") {
        navigate("/Transaction");
      }
    } catch (err) {
      setLoading(false);
      handleError(err);
      if (err?.response?.data?.message) {
        alert(err.response.data.message);
      }
    }
  };
  return (
    <>
      {modal && (
        <Bg>
          <Wrapper active={!modal}>
            <div className="login-cointainer">
              <img
                className="x-button-login2"
                onClick={isLoading ? null : handleCloseAuthModal}
                src={Xbtns}
                alt="close button"
              />
              <form action="">
                <h2>Login</h2>
                <input
                  autoComplete={form.email}
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handelChange}
                />
                <input
                  autoComplete={form.password}
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handelChange}
                />
                <button
                  className="btnlogin2"
                  onClick={isLoading ? null : handelLogin}
                >
                  {isLoading ? "Loading..." : "LOGIN"}
                </button>
                <p className="dont-have-acc">
                  Don't have an account ?{" "}
                  <span className="singup-here" onClick={handleRegisterModal}>
                    Klik Here
                  </span>
                </p>
              </form>
            </div>
          </Wrapper>
        </Bg>
      )}
    </>
  );
};

export default Login;

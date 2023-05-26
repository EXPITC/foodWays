import { React, useState, useContext } from "react";
import { API, handleError } from "../../config/api";
import { Wrapper, Bg } from "./Register.style";
import Xbtns from "../../img/close.png";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

const Register = ({ modal, handleCloseAuthModal, handleLoginModal }) => {
  const { dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    role: "",
  });
  const handelChange = (e) => {
    if (isLoading) return;
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handelSubmit = async (e) => {
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
      const response = await API.post("/register", body, config);
      if (response?.status === 409) {
        return alert(response.data.message);
      }

      if (response?.status === 200) {
        dispatch({
          status: "login",
          payload: response.data.data.user,
        });
        handleCloseAuthModal();
      }
      if (response.data.data.user.role === "owner") {
        navigate("/Transaction");
      }
    } catch (err) {
      setLoading(false);
      handleError(err);
      if (err.response.data.message) {
        alert(err.response.data.message);
      }
    }
  };
  return (
    <>
      {modal && (
        <Bg>
          <Wrapper active={!modal}>
            <div className="singup2-cointainer">
              <img
                className="x-button-singup2"
                onClick={isLoading ? null : handleCloseAuthModal}
                src={Xbtns}
                alt=""
              />
              <form>
                <h2>Register</h2>
                <input
                  autoComplete={form.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handelChange}
                />
                <input
                  autoComplete={form.password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handelChange}
                />
                <input
                  autoComplete={form.fullname}
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  onChange={handelChange}
                />
                <select id="Gender" name="gender" onChange={handelChange}>
                  <option hidden>Select Gender</option>
                  <option value="Gender" disabled>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  autoComplete={form.phone}
                  type="number"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handelChange}
                />
                <select id="role" name="role" onChange={handelChange}>
                  <option hidden>As User</option>
                  <option value="As User" disabled>
                    As User
                  </option>
                  <option value="costumer">Costumer</option>
                  <option value="owner">Owner</option>
                </select>
                <button
                  type="submit"
                  className="btnsingup2"
                  onClick={isLoading ? null : handelSubmit}
                >
                  {isLoading ? "Loading..." : "SINGUP"}
                </button>
                <p className="already-have-acc">
                  Already have an account ?{" "}
                  <span className="login-here" onClick={handleLoginModal}>
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

export default Register;

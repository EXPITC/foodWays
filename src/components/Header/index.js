import { React, useEffect, useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { API, handleError } from "../../config/api";

import Icon from "../../img/Icon.svg";
import Trolly from "../../img/Trolly.svg";
import Shop from "../../img/shop.png";
import poly from "../../img/poly.svg";

import { Head, TopFlex, Wrap, Polyy, Specialdrop } from "./Header.styled";
import DropDown from "../DropDown";
import AuthButtons from "../AuthButtons";
import { AuthModalContext } from "../../Context/authModalContext";

const Header = ({ trigger, noTroll }) => {
  // noTroll mean dont show trolly chart
  // trigger for trig the fetch of the count for chart because header is separate comp
  const { state } = useContext(UserContext);
  const { dispatch } = useContext(AuthModalContext);

  const { isLogin, user } = useMemo(() => {
    return state;
  }, [state]);
  const isOwner = user?.role === "owner" ? true : false;

  const [total, setTotal] = useState(0);

  const [isDropdown, setDropdown] = useState(false);
  const handleDropdown = () => setDropdown((prev) => !prev);
  const handleLogin = () => dispatch("openLoginModal");
  const handleRegister = () => dispatch("openRegisterModal");

  useEffect(() => {
    if (!isLogin) return;
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get("/order/count", { signal })
        .then((res) => {
          if (!res) return;
          setTotal(res.data.total);
        })
        .catch((err) => handleError(err));
    })();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, isLogin]);

  const [resto, setResto] = useState(null);

  useEffect(() => {
    if (!isLogin) return;
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get(`/resto`, { signal })
        .then((res) => {
          if (!res) return;
          setResto(res.data.data.resto.data);
        })
        .catch((err) => {
          handleError(err);
        });
    })();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <>
      <AuthButtons />
      <Head>
        <TopFlex>
          <Link to="/">
            <img src={Icon} className="shake" alt="button home" />
          </Link>
          <Wrap>
            {isLogin ? (
              <>
                {isOwner ? (
                  <Link className="cart" to={`/Resto/${user?.resto?.id}`}>
                    <img
                      style={{ width: "50px", height: "50px" }}
                      src={Shop}
                      alt="shop"
                    />
                  </Link>
                ) : (
                  !noTroll && (
                    <>
                      {total !== 0 && <p>{total}</p>}
                      <Link
                        className="cart"
                        to={total !== 0 ? "/cart" : "/resto"}
                      >
                        <img src={Trolly} alt="trolly" />
                      </Link>
                    </>
                  )
                )}
                <img
                  className="profile"
                  onClick={handleDropdown}
                  src={user.image}
                  alt="profile"
                />
              </>
            ) : (
              <>
                <button onClick={handleRegister}>Register</button>
                <button onClick={handleLogin}>Login</button>
              </>
            )}
          </Wrap>
        </TopFlex>
        {isDropdown && (
          <>
            <Polyy>
              <div className="poly">
                <img src={poly} alt="poly dropdown" />
              </div>
            </Polyy>
            <Specialdrop>
              <DropDown className="drop" handleDropdown={handleDropdown} />
            </Specialdrop>
          </>
        )}
      </Head>
    </>
  );
};

export default Header;

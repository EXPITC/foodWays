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

const Header = ({ trigger, noTroll }) => {
  let [show, setShow] = useState(false);
  const { state, _dispatch } = useContext(UserContext);
  const toggle = () => setShow(!show);
  const { user } = state;

  const isOwner = useMemo(
    () => (user.role === "owner" ? true : false),
    [user.role]
  );

  const [total, letTotal] = useState(null);
  useEffect(() => {
    (async () => {
      await API.get("/order/count")
        .then((res) => letTotal(res.data.total))
        .catch((err) => handleError(err));
    })();
  }, [trigger]);

  // const [restoId, setRestoId] = useState(null);
  // const [resto, setResto] = useState(null);
  // useEffect(() => {
  //   (async () => {
  //     await API.get(`/resto`)
  //       .then((res) => {
  //         setResto(res.data.data.resto.data);
  //       })
  //       .catch((err) => {
  //         handleError(err);
  //       });
  //   })();
  // }, []);
  // console.log(resto);
  return (
    <>
      <Head>
        <TopFlex>
          <Link to="/">
            <img src={Icon} className="shake" alt="button home" />
          </Link>
          <Wrap>
            {isOwner ? (
              <Link className="cart" to="/Resto">
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={Shop}
                  alt="shop"
                />
              </Link>
            ) : noTroll ? null : (
              <>
                {total ? <p>{total}</p> : null}
                <Link className="cart" to="/Cart">
                  <img src={Trolly} alt="trolly" />
                </Link>
              </>
            )}

            <img
              className="profile"
              onClick={toggle}
              src={user.image}
              alt="profile"
            />
          </Wrap>
        </TopFlex>
        {show ? (
          <>
            <Polyy>
              <div className="poly">
                <img src={poly} alt="poly dropdown" />
              </div>
            </Polyy>
            <Specialdrop>
              <DropDown className="drop" logout />
            </Specialdrop>
          </>
        ) : null}
      </Head>
    </>
  );
};

export default Header;

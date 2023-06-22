import { React, useState, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { API, handleError } from "../../config/api";

//components
import DropDown from "../DropDown";

//img
import poly from "../../img/poly.svg";
import Pizza from "../../img/pizza.svg";
import Icon from "../../img/Icon.svg";
import Trolly from "../../img/Trolly.svg";
import Shop from "../../img/shop.png";

import {
  WrapperYellow,
  OneLineFlexTop,
  TextAndPizza,
  WrapFlex,
  WrapFlex2,
  WrapFlex3,
  CardNear,
  Text,
  ImgPizza,
  ImgProfile,
  ImgTrolly,
  WrapMain,
  CardResto,
  Polyy,
} from "./LandingPage.styled";

import { UserContext } from "../../Context/userContext";
import convertRupiah from "rupiah-format";
import AuthButtons from "../AuthButtons";
import { AuthModalContext } from "../../Context/authModalContext";

const LandingPage = () => {
  const { state } = useContext(UserContext);
  const { dispatch } = useContext(AuthModalContext);

  const { isLogin, user } = state;

  const handleLogin = () => {
    dispatch("openLoginModal");
  };
  const handleRegister = () => {
    dispatch("openRegisterModal");
  };

  // Drops for dropdown if user already login
  const [drop, setDrop] = useState(false);
  const handleDropdown = () => setDrop((prev) => !prev);

  const isCustomer = useMemo(() => {
    if (user?.role === "owner") return false;
    return true;
  }, [user?.role]);

  const [nearMenus, setNearMenus] = useState([]);
  const [restos, setRestos] = useState([]);
  const [total, setTotal] = useState(0);

  // Gathering total order, resto data, and near resto
  useEffect(() => {
    setNearMenus([]);
    setTotal(0);
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get("/restos", { signal }).then((res) => {
        setRestos(res.data.data.restos);
      });
      // Pick random product for showcase if user not yet login,
      // and show the nears product to show also fetch if there is any order from user chart.
      if (!isLogin) {
        await API.get("/products/random", { signal })
          .then((res) => setNearMenus(res.data.data.products))
          .catch((err) => handleError(err));
        return;
      }
      controller.abort();
      await API.get("/order/count")
        .then((res) => setTotal(res.data.total))
        .catch((err) => handleError(err));
      if (!user.location) return;
      await API.get("/nearResto")
        .then((res) => setNearMenus(res.data.data.nearResto))
        .catch((err) => {
          handleError(err);
        });
    })();

    return () => controller.abort();
  }, [isLogin, user?.location]);

  return (
    <>
      <AuthButtons />
      {/* <Header/> */}
      <WrapperYellow>
        <OneLineFlexTop>
          <img src={Icon} alt="icon" height={40} width={124} />
          <div>
            {isLogin ? (
              <>
                {isCustomer ? (
                  <Link to={total !== 0 ? "/cart" : "/resto"}>
                    {total !== 0 && <p>{total}</p>}
                    <ImgTrolly
                      src={Trolly}
                      alt="Trolly"
                      width={35}
                      height={45}
                    />
                  </Link>
                ) : (
                  <Link className="cart" to={`/Resto/${user?.resto?.id || ""}`}>
                    <img src={Shop} alt="shop" height={50} width={50} />
                  </Link>
                )}
                <ImgProfile
                  className="profile"
                  src={user.image}
                  onClick={handleDropdown}
                  alt="Profile"
                  height={60}
                  width={60}
                />

                {drop && (
                  <>
                    <Polyy>
                      <div className="poly">
                        <img src={poly} alt="poly" />
                      </div>
                    </Polyy>
                    <DropDown handleDropdown={handleDropdown} />
                  </>
                )}
              </>
            ) : (
              <>
                <button onClick={handleRegister}>Register</button>
                <button onClick={handleLogin}>Login</button>
              </>
            )}
          </div>
        </OneLineFlexTop>
        <TextAndPizza>
          <Text>
            <h1>
              Are You Hungry? <br /> Express Home Delivery
            </h1>
            <WrapFlex>
              <span></span>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </WrapFlex>
          </Text>
          <ImgPizza src={Pizza} alt="Pizza" />
        </TextAndPizza>
      </WrapperYellow>
      <WrapMain>
        <h1>Popular Restaurant</h1>
        <WrapFlex2>
          {restos.length > 0 &&
            restos.map((resto, index) => {
              return (
                <Link
                  to={`/Resto/${resto.id}`}
                  className="nonee"
                  key={index + 2 + resto.img}
                >
                  <CardResto key={resto.title}>
                    <img
                      src={resto.img}
                      alt={resto.title}
                      width={"75px"}
                      height={"75px"}
                    />
                    <h2>{resto.title}</h2>
                  </CardResto>
                </Link>
              );
            })}
        </WrapFlex2>
        <h1>{isLogin ? "Restaurant Near You" : "Menus"}</h1>
        <WrapFlex3>
          {isLogin ? (
            !nearMenus.length > 0 ? (
              user.location ? (
                <h3 key="userHaveLocation">Load your location...</h3>
              ) : (
                <h3 key="userNotYetSetLoc">Please update your location</h3>
              )
            ) : (
              <>
                {nearMenus[0]?.menu && // Check to make sure its data fetch from random not from nearResto line 126
                  nearMenus.map((near, index) => {
                    return near.menu.map((menu) => {
                      return (
                        <Link
                          to={`/Resto/${near.resto.id}`}
                          className="nonee"
                          key={index + menu.title}
                        >
                          <CardNear>
                            <img
                              src={menu.img}
                              alt={menu.title}
                              height={"100%"}
                              width={"160px"}
                            />
                            <h3>{menu.title}</h3>
                            <div className="wrapInformation">
                              <div>
                                <img
                                  src={near.resto.img}
                                  alt="resto logo"
                                  width={"30px"}
                                  height={"50%"}
                                />
                                <p>{near.resto.title}</p>
                              </div>
                              <div>
                                <p>{convertRupiah.convert(menu.price)}</p>
                              </div>
                            </div>
                            <div className="wrapInformation">
                              <p className="address">{near.address}</p>
                              <p className="disctance">{near.distance} KM</p>
                            </div>
                          </CardNear>
                        </Link>
                      );
                    });
                  })}
              </>
            )
          ) : (
            // Not login near card condition
            <>
              {!nearMenus.length > 0 ? (
                <h3 keu="handleLoginCondition">Please wait, load menus...</h3>
              ) : !nearMenus[0].seller?.restos ? (
                // this one for transition when logout when the nearMenus state data remaind from '/nearResto' fetch line 127
                <h3 key="handleLogoutTransition">Please wait, load menus...</h3>
              ) : (
                nearMenus.map((menu, index) => {
                  return (
                    <CardNear
                      key={index + menu.img + menu.price}
                      onClick={handleLogin}
                    >
                      <img src={menu.img} alt={menu.title} />
                      <h3>{menu.title}</h3>
                      <div className="wrapInformation">
                        <div>
                          <img
                            src={menu.seller.restos.img}
                            alt="logo"
                            height={"160px"}
                            width={"100%"}
                          />
                          <p>{menu.seller.restos.title}</p>
                        </div>
                        <div>
                          <p>{convertRupiah.convert(menu.price)}</p>
                        </div>
                      </div>
                      <p>{menu.seller.restos.address}</p>
                    </CardNear>
                  );
                })
              )}
            </>
          )}
        </WrapFlex3>
      </WrapMain>
    </>
  );
};

export default LandingPage;

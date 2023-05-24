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

// TC~Dummy
// const resto = [
//   {
//     name: "Burger King",
//     img: "https://pngimg.com/uploads/burger_king/burger_king_PNG17.png",
//   },
//   {
//     name: "Startbucks",
//     img: "https://www.freepnglogos.com/uploads/starbucks-logo-png-25.png",
//   },
//   {
//     name: "KFC",
//     img: "https://www.freepnglogos.com/uploads/kfc-png-logo/camera-kfc-png-logo-0.png",
//   },
//   {
//     name: "Jco",
//     img: "https://1.bp.blogspot.com/-QaywjoHhvXM/Xt9fsQbVeuI/AAAAAAAAGXQ/ut_W8VQkhiQFODR9C_zr0zAYLf8UhlMvgCK4BGAsYHg/s1200/jco.png",
//   },
// ];
// const near = [
//   {
//     food: "Geprek Bensu",
//     img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Ayam_geprek.png",
//     distance: "0,2 KM",
//   },
//   {
//     food: "Nasi Goreng Mas Roni",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nasi_Goreng.jpg/800px-Nasi_Goreng.jpg",
//     distance: "0,6 KM",
//   },
//   {
//     food: "Pecel Ayam Prambanan",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Pecel_Solo.JPG/800px-Pecel_Solo.JPG",
//     distance: "0,6 KM",
//   },
//   {
//     food: "Kopi Kenangan",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
//     distance: "1,6 KM",
//   },
// ];

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
          <img src={Icon} alt="icon" />
          <div>
            {isLogin ? (
              <>
                {isCustomer && (
                  <Link to={total !== 0 ? "/cart" : "/resto"}>
                    {total !== 0 && <p>{total}</p>}
                    <ImgTrolly src={Trolly} alt="Trolly" />
                  </Link>
                )}
                <ImgProfile
                  src={user.image}
                  onClick={handleDropdown}
                  alt="Profile"
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
              Are You Hungry? <br></br> Express Home Delivery
            </h1>
            <WrapFlex>
              <h2> </h2>
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
                    <img src={resto.img} alt={resto.name} />
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
                            <img src={menu.img} alt={menu.title} />
                            <h3>{menu.title}</h3>
                            <div className="wrapInformation">
                              <div>
                                <img src={near.resto.img} alt="img logo" />
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
                          <img src={menu.seller.restos.img} alt="logo" />
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

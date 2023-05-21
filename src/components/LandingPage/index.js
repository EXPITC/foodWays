import {
  React,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import { API, handleError } from "../../config/api";

//components
import Login from "../Login";
import Register from "../Register";
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
import { Control } from "mapbox-gl";

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

const LandingPage = ({ U, sett, setf }) => {
  // const [which ,setWhich] = useState(false);
  const [show, setShow] = useState(false);
  // R for Register
  const [showR, setShowR] = useState(false);
  const [drop, setDrop] = useState(false);
  const drops = useCallback(() => {
    setDrop(!drop);
    setShow(false);
    setShowR(false);
  }, [drop]);
  // const reg = () => (setDrop(false),setWhich(!which));
  // const login = () => (setDrop(false),setWhich(false));
  const toggle = useCallback(() => {
    setShow(!show);
    setShowR(false);
  }, [show]);
  const toggleR = useCallback(() => {
    setShowR(!showR);
    setShow(false);
  }, [showR]);
  const Cancel = useCallback(() => setShowR(!showR), [showR]);
  const CancelL = useCallback(() => setShow(!show), [show]);

  const { state, _dispatch } = useContext(UserContext);
  const { isLogin, user } = state;

  const isCustomer = useMemo(() => {
    if (user?.role === "owner") return false;
    return true;
  }, [user?.role]);

  const [nears, setNears] = useState([]);
  const [restos, setRestos] = useState([]);
  const [total, setTotal] = useState(0);

  // Gathering total order, resto data, and near resto
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      await API.get("/order/count")
        .then((res) => setTotal(res.data.total))
        .catch((err) => handleError(err));
      await API.get("/nearResto")
        .then((res) => setNears(res.data.data.nearResto))
        .catch((err) => {
          setNears(null);
          handleError(err);
        });
      await API.get("/restos").then((res) => {
        setRestos(res.data.data.restos);
      });
    })();
    return () => controller.abort();
  }, []);

  return (
    <>
      {!isLogin && (
        <>
          <Login show={show} Cancel={CancelL} toggle={toggleR} />
          <Register showR={showR} Cancel={Cancel} toggle={toggle} />
        </>
      )}
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
                    <ImgTrolly src={Trolly} onClick={sett} alt="Trolly" />
                  </Link>
                )}
                <ImgProfile src={user.image} onClick={drops} alt="Profile" />

                {drop && (
                  <>
                    <Polyy>
                      <div className="poly">
                        <img src={poly} alt="poly" />
                      </div>
                    </Polyy>
                    <DropDown />
                  </>
                )}
              </>
            ) : (
              <>
                <button onClick={toggleR}>Register</button>
                <button onClick={toggle}>Login</button>
              </>
            )}

            {/* login condition */}
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
          {/* TODO: REPEAT */}
          {restos.map((resto, index) => {
            return (
              <Link to={`/Resto/${resto.id}`} className="nonee" key={index}>
                <CardResto key={resto.title}>
                  <img src={resto.img} alt={resto.name} />
                  <h2>{resto.title}</h2>
                </CardResto>
              </Link>
            );
          })}
        </WrapFlex2>
        <h1>Restaurant Near You</h1>
        <WrapFlex3>
          {!nears ? (
            <h3>Please update your location.</h3>
          ) : (
            <>
              {nears.map((near, index) => {
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
                        <p>{near.distance} KM</p>
                      </CardNear>
                    </Link>
                  );
                });
              })}
            </>
          )}
          {/* TODO: REPEAT */}
        </WrapFlex3>
      </WrapMain>
    </>
  );
};

export default LandingPage;

import React, { useEffect, useContext } from "react";
//React router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import DetailRestoPage from "./DetailRestoPage";
import ProfilePage from "./ProfilePage";
import EditProfile from "./EditProfile";
import TransactionPage from "./TransactionPage";
import CartPage from "./CartPage";
import AddMenu from "./AddMenu";
import LandingPage from "./LandingPage";
import Header from "./Header";
import Resto from "./Resto";
import AddResto from "./AddResto";
import { API, handleError } from "../config/api";
import { UserContext } from "../Context/userContext";
// import EditMenu from "./EditMenu";

const RouterSetup = () => {
  const { state, dispatch } = useContext(UserContext);
  const { isLogin, user } = state;
  const isOwner = user?.role === "owner" ? true : false;

  useEffect(() => {
    if (!localStorage?.token) return;
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await API.get("/login", { signal });
        dispatch({
          status: "login",
          payload: res.data,
        });
      } catch (err) {
        handleError(err);
      }
    })();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Info
  useEffect(() => {
    if (isLogin === null) return;
    if (!isLogin) {
      console.info(
        "%cYou can use this resto account for admin page, in otherhand you can also use customer acc that already created, or you can just creating new acc for resto or customer its fine.",
        "background-color: #FFC700; color: #433434; font-weight: 600; font-size: normal; text-align: left; overflow: hidden; border-radius: 2px; padding-left:10px; padding-top: 10px; padding-bottom:10px;"
      );
    }

    console.info(
      "%c* You can always open console log for more detail/info in all my project, thankyou.",
      "color: #FFC700"
    );
    console.warn(
      "%c *Please understand almost all of my projects use free tier server for backend. This means that some heavy lifting processes may take time to process or build due to free tier limitations, also almost free tiers need to be 'fired' first after not waking up within the allotted time, so I'm sorry if you've ever experienced a cold start. Thank you, for reading & understanding. \n tips: you can just keep refreshing the page or waiting patiently. Recommended the second option because its actually already hit the server just takes times to process due to cold start or free tier limitations.",
      "background-color: #FFC700; color: #433434; font-weight: 600; font-size: normal; text-align: left; overflow: hidden; border-radius: 2px; padding-left:10px; padding-top: 10px; padding-bottom:10px;"
    );

    if (isLogin) return; //I know this redundant if but i want the position still print consecutive;
    console.table([
      {
        email: "customer@mail.com",
        password: "12345678",
      },
      {
        email: "burgerking@mail.com",
        password: "12345678",
      },
      {
        email: "starbucks@mail.com",
        password: "12345678",
      },
      {
        email: "kfc@mail.com",
        password: "12345678",
      },
      {
        email: "jco@mail.com",
        password: "12345678",
      },
    ]);
  }, [isLogin]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/Resto/:id" element={<DetailRestoPage />} />
        {isLogin && (
          <>
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/Edit/Profile" element={<EditProfile />} />
            {isOwner ? (
              <>
                <Route path="/Transaction" element={<TransactionPage />} />
                {!!user?.resto && (
                  <>
                    <Route path="/Add-Menu" element={<AddMenu />} />
                    <Route path="/Edit-Menu/:id" element={<AddMenu Edit />} />
                  </>
                )}

                <Route path="/Resto" element={<AddResto />} />
              </>
            ) : (
              <>
                <Route path="/Resto" element={<Resto />} />
                <Route exact path="/Cart" element={<CartPage />} />
              </>
            )}
          </>
        )}
        <Route
          path="*"
          element={
            <>
              <Header />
              <h1>Error 404 </h1>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default RouterSetup;

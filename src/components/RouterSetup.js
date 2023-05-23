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
                <Route path="/Add-Menu" element={<AddMenu />} />
                <Route path="/Edit-Menu/:id" element={<AddMenu Edit />} />
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

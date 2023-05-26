import { React, useContext } from "react";
import { UserContext } from "../../Context/userContext";

import { Wrapper, Wrapper2, Icon, JustWrap, Logout } from "./DropDown.styled";
import userIcon from "../../img/user.svg";
import logoutIcon from "../../img/logout.svg";
import foodIcon from "../../img/foodicon.svg";
import Transaction from "../../img/transaction.svg";
import { Link, useNavigate } from "react-router-dom";
const DropDown = ({ logout, handleDropdown }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const handleLogout = () => {
    dispatch({
      status: "logout",
    });
    handleDropdown();
    navigate("/");
  };

  const { user } = state;
  const isOwner = user.role === "owner" ? true : false;

  return (
    <>
      {isOwner ? (
        <>
          <Wrapper2>
            <Wrapper>
              <Link to="/Profile">
                <JustWrap>
                  <Icon src={userIcon} />
                  <p>Profile Partner</p>
                </JustWrap>
              </Link>
              <Link to={!!user?.resto ? "/Add-Menu" : "/Resto"}>
                <JustWrap>
                  <Icon src={foodIcon} />
                  <p>Add Menu</p>
                </JustWrap>
              </Link>
              <Link to="/Transaction">
                <JustWrap>
                  <Icon src={Transaction} />
                  <p>Transaction</p>
                </JustWrap>
              </Link>
            </Wrapper>
            <Logout>
              {logout ? (
                <Link to="/">
                  <JustWrap onClick={handleLogout}>
                    <Icon src={logoutIcon} />
                    <p>Logout</p>
                  </JustWrap>
                </Link>
              ) : (
                <JustWrap onClick={handleLogout}>
                  <Icon src={logoutIcon} />
                  <p>Logout</p>
                </JustWrap>
              )}
            </Logout>
          </Wrapper2>
        </>
      ) : (
        <Wrapper2 h>
          <Wrapper h>
            <Link to="/Profile">
              <JustWrap h>
                <Icon src={userIcon} />
                <p>Profile</p>
              </JustWrap>
            </Link>
          </Wrapper>
          <Logout h>
            {logout ? (
              <Link to="/">
                <JustWrap onClick={handleLogout}>
                  <Icon src={logoutIcon} />
                  <p>Logout</p>
                </JustWrap>
              </Link>
            ) : (
              <JustWrap onClick={handleLogout}>
                <Icon src={logoutIcon} />
                <p>Logout</p>
              </JustWrap>
            )}
          </Logout>
        </Wrapper2>
      )}
    </>
  );
};

export default DropDown;

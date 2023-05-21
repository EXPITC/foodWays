import { React, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
// import { API, handleError } from "../../config/api";
import { io } from "socket.io-client";
import convertRupiah from "rupiah-format";

import Header from "../Header";
import Icon from "../../img/Icon.svg";
import { Wrapper, FlexCollum, Flex, Pp, Buttons } from "./ProfilePage.styled";

let socket;
const ProfilePage = () => {
  const { state, _dispatch } = useContext(UserContext);
  const { user } = state;
  const isOwner = user?.role === "owner" ? true : false;
  // if (user?.role === "owner") {
  //   isOwner = true;
  // }
  // const [refresh, _setRefresh] = useState();
  const [historyTransaction, setHistoryTransaction] = useState([]);
  // const [transaction, setTransaction] = useState();
  // useEffect(() => {
  //   API.get("/transaction/active")
  //     .then((res) => setTransaction(res))
  //     .catch((err) => handleError(err));
  // }, []);
  // console.log(transaction);

  // data use for validate the profile and order
  const data = [
    {
      title1: isOwner ? "Profile Partner" : "My Profile",
      title2: isOwner ? "History Order" : "History Transaction",
      titleName: isOwner ? "Name Partner" : "Full Name",
      img: isOwner ? "Partner" : "profile",
      history: isOwner ? "Andi" : "Geprek Bensu",
    },
  ];

  useEffect(() => {
    socket = io("http://localhost:5001", {
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        id: state.user.id,
      },
    });

    const loadTrans = () => {
      socket.emit("load transaction", state.user.id);
      socket.on("transaction", (data) => {
        setHistoryTransaction(data);
      });
    };

    socket.on("connect", () => {
      console.log(socket);
    });
    socket.on("new transaction", () => {
      socket.emit("load transaction", state.user.id);
    });
    socket.emit("load transaction", state.user.id);
    loadTrans();
    socket.on("connect_error", (err) => {
      console.error(err.message);
    });
    return () => {
      socket.disconnect();
    };
  }, [state.user.id]);

  return (
    <>
      <Header />
      <Wrapper>
        <FlexCollum>
          <h1>{data[0].title1}</h1>
          <Flex>
            <FlexCollum>
              <img className="img" src={user.image} alt={data[0].img} />
              <Link to="/Edit/Profile">
                <button>Edit Profile</button>
              </Link>
            </FlexCollum>
            <FlexCollum className="h">
              <div>
                <Pp b c>
                  {data[0].titleName}
                </Pp>
                <Pp>{user.fullname}</Pp>
              </div>
              <div>
                <Pp b c>
                  Email
                </Pp>
                <Pp>{user.email}</Pp>
              </div>
              <div>
                <Pp b c>
                  Phone
                </Pp>
                <Pp>{user.phone}</Pp>
              </div>
            </FlexCollum>
          </Flex>
        </FlexCollum>
        <FlexCollum>
          <h1>{data[0].title2}</h1>
          {/* Loop */}
          {historyTransaction.map((data) => {
            return (
              <>
                <Flex w>
                  <FlexCollum btwn>
                    <div>
                      {isOwner ? (
                        <Pp ft b>
                          {data.buyer.fullname}
                        </Pp>
                      ) : (
                        <Pp ft b>
                          {data.seller.restos.title}
                        </Pp>
                      )}
                      <Pp n b>
                        Saturday,{" "}
                      </Pp>
                      <Pp n a>
                        12 March 2021
                      </Pp>
                    </div>
                    <Pp bb b>
                      Total : {convertRupiah.convert(data.price)}
                    </Pp>
                  </FlexCollum>
                  {data.status === "Cancel" ? (
                    <FlexCollum btwn c>
                      <img src={Icon} alt="icon" />
                      <Buttons c red>
                        {data.status}
                      </Buttons>
                    </FlexCollum>
                  ) : (
                    <FlexCollum btwn i>
                      <img src={Icon} alt="icon" />
                      <Buttons>{data.status}</Buttons>
                    </FlexCollum>
                  )}
                </Flex>
              </>
            );
          })}
        </FlexCollum>
      </Wrapper>
    </>
  );
};

export default ProfilePage;

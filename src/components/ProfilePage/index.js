import { React, useContext, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import convertRupiah from "rupiah-format";
import socketIo from "../../utils/socket";

import Header from "../Header";
import Icon from "../../img/Icon.svg";
import {
  Wrapper,
  FlexCollum,
  Flex,
  Pp,
  Buttons,
  WrapperCard,
} from "./ProfilePage.styled";
import convertStamp from "../../utils/convertStamp";

const ProfilePage = () => {
  const { state } = useContext(UserContext);
  const { user } = useMemo(() => state, [state]);
  const isOwner = useMemo(
    () => (user?.role === "owner" ? true : false),
    [user?.role]
  );
  const socket = socketIo(state.user.id);
  const [historyTransaction, setHistoryTransaction] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    socket.on("connect", () => {
      console.info(socket.connected);
    });

    socket.on("new transaction", () => {
      socket.emit("load transaction", user.id);
    });

    socket.emit("load transaction", user.id);
    socket.on("transaction", (data) => {
      if (!data) return;
      setHistoryTransaction(data);
    });

    socket.on("connect_error", (err) => {
      console.error(err.message);
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <>
      <Header />
      <Wrapper>
        <FlexCollum>
          <h1>{isOwner ? "Profile Partner" : "My Profile"}</h1>
          <Flex>
            <FlexCollum>
              <img
                className="img"
                src={user.image}
                alt={isOwner ? "Partner" : "profile"}
              />
              <Link to="/Edit/Profile">
                <button>Edit Profile</button>
              </Link>
            </FlexCollum>
            <FlexCollum className="h">
              <div>
                <Pp b c>
                  {isOwner ? "Name Partner" : "Full Name"}
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
          <h1>{isOwner ? "History Order" : "History Transaction"}</h1>
          {historyTransaction.length === 0 ? (
            <Flex>
              <h3>No transaction yet...</h3>
            </Flex>
          ) : (
            <WrapperCard>
              {historyTransaction.map((data, index) => {
                return (
                  <Flex w key={index}>
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
                          {convertStamp(data.createdAt)}
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
                );
              })}
            </WrapperCard>
          )}
        </FlexCollum>
      </Wrapper>
    </>
  );
};

export default ProfilePage;

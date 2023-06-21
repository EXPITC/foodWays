import { React, useState, useEffect, useContext } from "react";
import Header from "../Header";
import approve from "../../img/approve.svg";
import cancel from "../../img/cancel.svg";
import { Wrapper, Head, Tab, Special, TwoB } from "./TransactionPage.styled";
import { UserContext } from "../../Context/userContext";
import socketIo from "../../utils/socket";

const TransactionPage = () => {
  const { state } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const socket = socketIo(state.user.id);

  useEffect(() => {
    const userId = state?.user?.id;
    if (!userId) return;

    // connect when not connected
    if (!socket.connected) socket.connect();

    socket.on("connect", () => {
      console.info(socket.connected);
      socket.emit("joinRoomOrder", { userId });
    });
    socket.on("disconnect", (reason) => {
      // reconnect when disconnect
      if (reason === "io server disconnect") socket.connect();
    });

    socket.on("newOrder", () => {
      socket.emit("transactions");
      socket.on("transactionsData", (value) => {
        setTransactions(value);
      });
    });

    socket.on("connect_error", (err) => {
      console.error(err.message);
    });

    return () => {
      socket.off("connect", console.info(socket.connected));
      socket.off("disconnect", console.info(socket.connected));
      socket.on("leaveRoomOrder", { userId });
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.user?.id]);

  useEffect(() => {
    // get the transactions value
    if (!state?.user?.id) return;
    console.log("hit?");
    socket.emit("transactions");
    socket.on("transactionsData", (value) => {
      console.log({ value });
      setTransactions(value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.user?.id]);

  const handleApprove = (id) => {
    // socket.emit("otw");
    socket.on("subTrans", id);
    socket.emit("accept", id);

    socket.on("acceptData", (data) => {
      if (!data[1][0]) return;
      setTransactions((prev) => {
        return prev.map((t) => {
          if (t?.id === data[1][0]?.id) return { ...t, ...data[1][0] };
          return t;
        });
      });
    });

    socket.on("unsubTrans", id);
  };
  const handleCancel = (id) => {
    socket.emit("cancel", id);
    socket.on("cancelData", (data) => {
      if (!data[1][0]) return;
      setTransactions((prev) => {
        return prev.map((t) => {
          if (t?.id === data[1][0]?.id) return { ...t, ...data[1][0] };
          return t;
        });
      });
    });
  };

  return (
    <>
      <Header noTroll />
      <Wrapper>
        <h1>Income Transaction</h1>
        <Tab>
          <tbody>
            <tr>
              <Head n>No</Head>
              <Head n2>Name</Head>
              <Head a>Address</Head>
              <Head p>Products Order</Head>
              <Head s>Status</Head>
              <Head m p>
                Action
              </Head>
            </tr>
          </tbody>
          {/* TC~REPEAT */}
          <tbody>
            {transactions?.map((t, index) => {
              return (
                <tr key={index}>
                  <Special>{index + 1}</Special>
                  <Special>{t.buyer.fullname}</Special>
                  <Special>{t.address}</Special>
                  <Special>
                    {t.product.map((p) => {
                      return p.title + ",";
                    })}
                  </Special>
                  {t.status === `Waiting Approve` && (
                    <Special w>{t.status}</Special>
                  )}
                  {t.status === `Success` && <Special s>{t.status}</Special>}
                  {t.status === `Cancel` && <Special c>{t.status}</Special>}
                  {t.status === `On The Way` && <Special o>{t.status}</Special>}
                  <Special bt>
                    {t.status === `Waiting Approve` ? (
                      <>
                        <TwoB
                          onClick={() => {
                            handleCancel(t.id);
                          }}
                          a
                        >
                          Cancel
                        </TwoB>
                        <TwoB
                          onClick={() => {
                            handleApprove(t.id);
                          }}
                        >
                          Aprove
                        </TwoB>
                      </>
                    ) : (
                      <>
                        {t.status === `Cancel` ? (
                          <img src={cancel} alt={`${cancel}`} />
                        ) : (
                          <img src={approve} alt={`${approve}`} />
                        )}
                      </>
                    )}
                  </Special>
                </tr>
              );
            })}
          </tbody>
        </Tab>
      </Wrapper>
    </>
  );
};

export default TransactionPage;

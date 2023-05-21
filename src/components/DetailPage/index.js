import { React, useCallback, useEffect, useState } from "react";
import { API, handleError } from "../../config/api";
import Header from "../Header";
import convertRupiah from "rupiah-format";
import { Wrapper, WrapCard, CardMenu, Dis, Modal } from "./DetailPage.styled";
import { useParams } from "react-router";
import Disable from "../../img/disabled.png";

const DetailPage = (_req, _res) => {
  const { id } = useParams();
  const [resto, setResto] = useState([]);
  const [menu, setMenu] = useState([]);
  const [transactionOngoing, setTransactionOngoing] = useState(null);
  const [transactionActive, setTransactionActive] = useState(null);
  const [lastResto, setLastResto] = useState(null);
  const [modalConfirmation, setModalConfirmation] = useState(false);

  // console.log(resto);
  // console.log("Hello");
  // console.log(lastResto);
  // console.log("Yahoo");
  // console.log(transactionActive);

  useEffect(() => {
    (async () => {
      await API.get(`/resto/${id}`)
        .then((res) => {
          setResto(res.data.data.resto.data);
          setMenu(res.data.data.resto.menu);
        })
        .catch((err) => {
          handleError(err);
        });
      await API.get("/transaction/ongoing")
        .then((res) => {
          setTransactionOngoing(res.data.data.status);
        })
        .catch((err) => {
          handleError(err);
        });
      await API.get("/transaction/active")
        .then((res) => {
          // setTransactionID(res.data.data.sellerId);
          setTransactionActive(res.data.data);
        })
        .catch((err) => {
          handleError(err);
        });
    })();
  }, [id]);

  // useEffect(() => {
  //   (async () => {
  //     const res = await API.get("/transaction/active");
  //     if (res?.data?.data?.sellerId === undefined) {
  //       console.log("undefined");
  //       setTransactionID(null);
  //     }
  //   })();
  // }, [modalConfirmation]);

  useEffect(() => {
    if (!transactionActive?.sellerId) return;
    (async () => {
      await API.get(`/resto/user/${transactionActive.sellerId}`)
        .then((res) => {
          console.log(res.data.data.resto, "OKOK");
          setLastResto(res.data.data.resto);
        })
        .catch((err) => handleError(err));
    })();
  }, [transactionActive]);
  // console.log(transactionActive, "transactionActive");

  // console.log(resto.ownerId)
  // console.log(transactionID);
  // console.log(transaction)
  // console.log(transactionLast);
  // console.log(lastResto)
  // console.log(menu)
  //
  const [form, setForm] = useState({});
  const [refresh, setRefresh] = useState(false);
  const handleOrder = useCallback(
    (productId) => {
      setForm({
        sellerId: resto?.ownerId,
        product: [
          {
            productId: productId,
            qty: 1,
          },
        ],
      });
    },
    [resto?.ownerId]
  );

  const order = useCallback(() => {
    if (!form) return;
    (async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(form);
        let res = await API.post("/add/transaction", form, config);
        if (res.status === 201) {
          res = {
            transactionId: res.data.thenTransaction.id,
            ...form.product[0],
          };

          res = JSON.stringify(res);
          await API.post("/add/order", res, config);
        }
        setRefresh((prev) => !prev);
      } catch (err) {
        handleError(err);
      }
    })();
  }, [form]);

  const autoOrder = useCallback(() => {
    if (
      resto?.ownerId === transactionActive?.sellerId ||
      !transactionActive?.sellerId
    ) {
      order();
    } else {
      console.log(" u still have order on resto " + lastResto?.title);
      console.log(
        "after this if use want to change resto then update transaction status cancel "
      );
      setModalConfirmation(true);
    }
  }, [resto?.ownerId, transactionActive?.sellerId, lastResto?.title, order]);

  const [firstInit, setFirstInit] = useState(true);
  useEffect(() => {
    if (firstInit === true) return setFirstInit(false);
    autoOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <>
      <Header trigger={refresh} />
      {modalConfirmation ? (
        <Modal>
          <div className="modal-left">
            {" u still have order on resto " + lastResto?.title}
          </div>
          <div className="modal-left">
            Do you want to <span>Cancel</span> the last Order?
            <button onClick={() => setModalConfirmation(false)}>No</button>
            <button
              onClick={async () => {
                try {
                  await API.delete(
                    `/transaction/${transactionActive?.id}`
                  ).catch((err) => handleError(err));
                  setModalConfirmation(false);
                  setRefresh(!refresh);
                } catch (err) {
                  handleError(err);
                }
              }}
            >
              Yes
            </button>
          </div>
        </Modal>
      ) : null}
      <Wrapper>
        <WrapCard>
          <h1>{resto.title}, Menus</h1>
          {transactionOngoing ? (
            <>
              <h4>
                You can't order right now, you have transaction{" "}
                {transactionOngoing}
              </h4>
              <h5>please wait until your order finish.</h5>
            </>
          ) : null}
          {menu.map((menu) => {
            return (
              <CardMenu key={menu.id}>
                <img src={menu.img} alt={menu.img} key={menu.img} />
                <h3>{menu.title}</h3>
                <p>{convertRupiah.convert(menu.price)}</p>
                {transactionOngoing ? (
                  <button key={menu.id}>
                    <Dis src={Disable} />
                  </button>
                ) : (
                  <button onClick={() => handleOrder(menu.id)} key={menu.id}>
                    Order
                  </button>
                )}
              </CardMenu>
            );
          })}
        </WrapCard>
      </Wrapper>
    </>
  );
};

export default DetailPage;

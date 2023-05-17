import { React, useState, useEffect, useContext, useCallback } from "react";
import { API, handleError } from "../../config/api";
import convertRupiah from "rupiah-format";
import { UserContext } from "../../Context/userContext";
import { io } from "socket.io-client";

import {
  Wrapper,
  WrapContent,
  WrapOrder,
  Orderbtn,
  Pp,
  WrapOrder2,
  Flex,
  FlexCollum,
  Wrap1,
  Wrap2,
  Wrap3,
} from "./CartPage.styled";
import map from "../../img/map.svg";
import plus from "../../img/+.svg";
import min from "../../img/-.svg";
import trash from "../../img/Trash.svg";
import Header from "../Header";
import Map from "../Map";
import { useNavigate } from "react-router";

let socket;
const CartPage = () => {
  const [open, setOpen] = useState(false);
  const openMap = () => setOpen(!open);
  const [far, setFar] = useState(false);
  const openMapFar = useCallback(() => setFar(!far), [far]);
  const [orderMap, setOrderMap] = useState(false);
  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);
  const { user } = state;

  const [form, setForm] = useState({
    location: user.location,
  });

  const [total, letTotal] = useState(null);
  const [orders, setOrders] = useState([]);
  const [resto, setResto] = useState();
  const [transaction, setTransaction] = useState(null);
  const [address, setAddress] = useState(null);
  const [loc, setLoc] = useState(user.location?.split(" "));
  const [refresh, setReresh] = useState(false);

  useEffect(() => {
    (async () => {
      await API.get("/order/count")
        .then((res) => letTotal(res.data.total))
        .catch((err) => handleError(err));
      await API.get("/transaction/active")
        .then((res) => {
          setOrders(res.data.data.transactions[0].product);
          setTransaction(res.data.data.transactions[0]);
        })
        .catch((err) => handleError(err));
    })();
  }, [refresh]);

  const start = transaction?.seller.location.split(" ");
  useEffect(() => {
    (async () => {
      await API.get(`/last/resto/${transaction?.sellerId}`)
        .then((res) => setResto(res?.data?.data))
        .catch((err) => handleError(err));
    })();
  }, [transaction]);

  // console.log('////////////////////')
  // console.log(order)
  // console.log(transaction?.sellerId)
  // console.log(resto)
  // console.log('////////////////////')

  useEffect(() => {
    if (
      transaction?.status === "Waiting Approve" ||
      transaction?.status === "On The Way"
    ) {
      // console.log(transaction?.status)
      setOrderMap(true);
      setFar(true);
    }
  }, [transaction]);

  useEffect(() => {
    socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        id: state.user.id,
      },
    });
    socket.on("connect", () => {
      console.log(socket);
    });
    socket.on("connect_error", (err) => {
      console.error(err.message);
    });
    return () => {
      socket.disconnect();
    };
  }, [state.user.id]);

  const handleOrder = useCallback(() => {
    (async () => {
      socket.emit("new transaction", 12);
      socket.emit("order", transaction.id);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await API.patch(
        `/transaction/${transaction.id}`,
        { address: address.display_name.split(",")[0] },
        config
      );
      setOrderMap(true);
    })();
  }, [address.display_name, transaction.id]);

  const handleConfirm = useCallback(() => {
    socket.emit("new transaction", 12);
    socket.emit("confirm", transaction.id);
    setOrderMap(true);
    openMapFar();
    // console.log('|\\\|\|\\\||')
    // console.log()
    navigate(`/profile`);
  }, [navigate, openMapFar, transaction.id]);

  const orderDelete = useCallback(
    (id) => {
      (async () => {
        try {
          // console.log(id);
          const res = await API.delete(`/order/${id}`);
          console.log(res);
          setReresh(!refresh);
        } catch (err) {
          handleError(err);
        }
      })();
    },
    [refresh]
  );

  useEffect(() => {
    (async () => {
      if (loc) {
        try {
          await API.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc[0]}&lon=${loc[1]}`
          ).then((res) => {
            setAddress(res.data);
          });
          setForm({
            ...form,
            location: loc[0] + " " + loc[1],
          });
          // console.log*
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [loc, form]);

  const updateloc = useCallback(() => {
    (async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await API.patch("/userData", form, config);
        const response = await API.get("/login");
        await dispatch({
          status: "login",
          payload: response.data,
        });
      } catch (err) {
        handleError(err);
      }
    })();
  }, [dispatch, form]);
  // console.log(transaction.id)

  const addHandle = useCallback(
    (id) => {
      (async () => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          let res = {
            transactionId: transaction.id,
            productId: id,
            qty: 1,
          };
          res = JSON.stringify(res);
          console.log(res);
          await API.post("/add/order", res, config);
          setReresh(!refresh);
        } catch (err) {
          handleError(err);
        }
      })();
    },
    [refresh, transaction.id]
  );

  const lessHandle = useCallback(
    (id) => {
      (async () => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          let res = {
            transactionId: transaction.id,
            productId: id,
            qty: 1,
          };
          res = JSON.stringify(res);
          await API.post("/less/order", res, config);
          setReresh(!refresh);
        } catch (err) {
          handleError(err);
        }
      })();
    },
    [refresh, transaction.id]
  );

  return (
    <>
      {open ? (
        <Map
          toggle={openMap}
          setLocEdit={setLoc}
          updateLoc={updateloc}
          open
          cart
        />
      ) : null}
      {far ? <Map toggle={handleConfirm} startLoc={start} far /> : null}
      <Header trigger={refresh} />
      <Wrapper>
        <h1>{resto?.resto?.title}, Menus</h1>
        <h2>Delivery Location</h2>
        <WrapContent>
          <div>
            <p>{address?.display_name}</p>
          </div>
          <button onClick={openMap}>
            Select On Map <img src={map} alt="map" />
          </button>
        </WrapContent>
        <h2>Review Your Order</h2>
        <WrapOrder>
          <div className="over">
            <WrapOrder2>
              {/* TC~REPEAT */}
              {total === 0
                ? resto?.resto?.id === undefined
                  ? navigate(`/resto`)
                  : navigate(`/resto/${resto.resto.id}`)
                : null}
              {orders.map((order, index) => {
                return (
                  <Flex key={order.id + index}>
                    <Wrap1>
                      <img src={order.img} alt="product" />
                      <Wrap2>
                        <Wrap3>
                          <h4>{order.title}</h4>
                          <p>
                            {convertRupiah.convert(
                              order.order.qty * order.price
                            )}
                          </p>
                        </Wrap3>
                        <Wrap3>
                          <div>
                            <button
                              onClick={() => {
                                lessHandle(order.id);
                              }}
                            >
                              <img src={min} alt="min" />
                            </button>
                            <h4 className="pinkBg">{order.order.qty}</h4>
                            <button
                              onClick={() => {
                                addHandle(order.id);
                              }}
                            >
                              <img src={plus} alt="plus" />
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              orderDelete(order.order.id);
                            }}
                          >
                            <img src={trash} alt="trash" />
                          </button>
                        </Wrap3>
                      </Wrap2>
                    </Wrap1>
                  </Flex>
                );
              })}
            </WrapOrder2>
          </div>
          <FlexCollum>
            <tb>
              <Wrap3>
                <Pp>Subtotal</Pp>
                <Pp r>{convertRupiah.convert(transaction?.price)}</Pp>
              </Wrap3>
              <Wrap3>
                <Pp>Qty</Pp>
                <Pp>{total}</Pp>
              </Wrap3>
              <Wrap3>
                <Pp>Ongkir</Pp>
                <Pp r>Rp.10.000</Pp>
              </Wrap3>
            </tb>
            <Wrap1>
              <Pp r b>
                TOTAL
              </Pp>
              <Pp r>{convertRupiah.convert(transaction?.price + 10000)}</Pp>
            </Wrap1>
          </FlexCollum>
        </WrapOrder>
        <Orderbtn>
          {orderMap ? (
            <button onClick={openMapFar}>See How Far?</button>
          ) : (
            <button onClick={handleOrder}>Order</button>
          )}
        </Orderbtn>
      </Wrapper>
    </>
  );
};

export default CartPage;

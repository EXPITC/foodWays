import {
  React,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { API, handleError } from "../../config/api";
import convertRupiah from "rupiah-format";
import { UserContext } from "../../Context/userContext";
import socketIo from "../../utils/socket";

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
  Center,
} from "./CartPage.styled";
import map from "../../img/map.svg";
import plus from "../../img/+.svg";
import min from "../../img/-.svg";
import trash from "../../img/Trash.svg";
import Header from "../Header";
import Map from "../Map";
import { useNavigate } from "react-router";

const CartPage = () => {
  const [open, setOpen] = useState(false);
  const openMap = () => setOpen(!open);
  const [far, setFar] = useState(false);
  const handleMapFar = useCallback(() => setFar(!far), [far]);
  const [orderMap, setOrderMap] = useState(false);
  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);
  const { user } = state;
  const socket = socketIo(user?.id);

  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState({
    location: user.location,
  });

  const [total, setTotal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [resto, setResto] = useState();

  // back when order got deleted or zero val
  if (total === 0 && !isLoading) {
    resto?.id === undefined
      ? navigate(`/resto`)
      : navigate(`/resto/${resto.id}`);
  }

  const [transaction, setTransaction] = useState(null);
  const transactionIdle = useMemo(
    () =>
      transaction?.status === "Waiting Approve" ||
      transaction?.status === "On The Way",
    [transaction]
  );
  const [address, setAddress] = useState(null);
  const [loc, setLoc] = useState(user.location?.split(" "));

  const updateTransaction = async (signal) => {
    try {
      setLoading(true);
      await API.get("/order/count", { signal })
        .then((res) => setTotal(res.data.total))
        .catch((err) => handleError(err));
      await API.get("/transaction/idle", { signal })
        .then((res) => {
          setOrders(res.data.data.transactions[0].product);
          setTransaction(res.data.data.transactions[0]);
        })
        .catch((err) => handleError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    updateTransaction(signal);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!transaction?.sellerId) return;
    let controller = new AbortController();
    (async () => {
      await API.get(`/resto/user/${transaction.sellerId}`)
        .then((res) => setResto(res?.data?.data?.resto))
        .catch((err) => handleError(err));
    })();
    return () => controller.abort();
  }, [transaction?.sellerId]);

  const start = useMemo(() => resto?.loc?.split(" "), [resto?.loc]);

  useEffect(() => {
    if (
      transaction?.status === "Waiting Approve" ||
      transaction?.status === "On The Way"
    ) {
      setOrderMap(true);
      setFar(true);
    }
  }, [transaction]);

  useEffect(() => {
    if (!user?.id) return;

    socket.on("connect", () => {
      console.info(socket.connected);
    });
    socket.on("connect_error", (err) => {
      console.error(err.message);
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleOrder = useCallback(() => {
    if (!transaction?.id || !resto?.id || !address?.display_name) return;
    (async () => {
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

      socket.emit("order", transaction.id);
      socket.emit("joinRoomOrder", { restoId: resto.id });
      socket.emit("newOrder", resto.id);
      socket.emit("leaveRoomOrder", { restoId: resto.id });

      updateTransaction();
      setOrderMap(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction?.id, resto?.id, address?.display_name]);

  const handleConfirm = useCallback(() => {
    if (!transaction?.id || !resto?.id) return;

    socket.emit("confirm", transaction.id);
    socket.emit("joinRoomOrder", { restoId: resto.id });
    socket.emit("newOrder", resto.id);
    socket.emit("leaveRoomOrder", { restoId: resto.id });
    setOrderMap(true);
    handleMapFar();

    navigate(`/profile`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleMapFar, transaction?.id, resto?.id]);

  const orderDelete = async (id) => {
    try {
      const res = await API.delete(`/order/${id}`);
      if (!res) return;
      updateTransaction();
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (!loc) return;
    let controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc[0]}&lon=${loc[1]}`,
          { signal }
        ).then((res) => {
          setAddress(res.data);
        });
        setForm((prev) => ({
          ...prev,
          location: loc[0] + " " + loc[1],
        }));
      } catch (err) {
        console.error(err);
      }
    })();
    return () => controller.abort();
  }, [loc]);

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
        if (!response) return;
        dispatch({
          status: "login",
          payload: response.data,
        });
      } catch (err) {
        handleError(err);
      }
    })();
  }, [dispatch, form]);

  const addHandle = useCallback(
    (id) => {
      if (!transaction?.id) return;
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
          await API.post("/add/order", res, config);
          updateTransaction();
        } catch (err) {
          handleError(err);
        }
      })();
    },
    [transaction?.id]
  );

  const lessHandle = useCallback(
    (id) => {
      if (!transaction?.id) return;
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
          updateTransaction();
        } catch (err) {
          handleError(err);
        }
      })();
    },
    [transaction?.id]
  );

  return (
    <>
      {open && (
        <Map
          toggle={openMap}
          setLocEdit={setLoc}
          updateLoc={updateloc}
          open
          cart
        />
      )}
      {far && <Map toggle={handleConfirm} startLoc={start} far />}
      <Header trigger={transaction} />
      {isLoading ? (
        <Center>
          <h3>Loading...</h3>
        </Center>
      ) : (
        <Wrapper>
          <h1>{resto?.title}, Menus</h1>
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
                              {!transactionIdle && (
                                <button
                                  onClick={() => {
                                    lessHandle(order.id);
                                  }}
                                >
                                  <img src={min} alt="min" />
                                </button>
                              )}

                              <h4 className="pinkBg">{order.order.qty}</h4>
                              {!transactionIdle && (
                                <button
                                  onClick={() => {
                                    addHandle(order.id);
                                  }}
                                >
                                  <img src={plus} alt="plus" />
                                </button>
                              )}
                            </div>
                            {!transactionIdle && (
                              <button
                                onClick={() => {
                                  orderDelete(order.order.id);
                                }}
                              >
                                <img src={trash} alt="trash" />
                              </button>
                            )}
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
                  <Pp r={true}>Rp.10.000</Pp>
                </Wrap3>
              </tb>
              <Wrap1>
                <Pp r={true} b={true}>
                  TOTAL
                </Pp>
                <Pp r>{convertRupiah.convert(transaction?.price + 10000)}</Pp>
              </Wrap1>
            </FlexCollum>
          </WrapOrder>
          <Orderbtn>
            {orderMap ? (
              <button onClick={handleMapFar}>See How Far?</button>
            ) : (
              <button onClick={handleOrder}>Order</button>
            )}
          </Orderbtn>
        </Wrapper>
      )}
    </>
  );
};

export default CartPage;

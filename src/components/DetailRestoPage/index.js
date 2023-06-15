import { React, useCallback, useContext, useEffect, useState } from "react";
import { API, handleError } from "../../config/api";
import Header from "../Header";
import convertRupiah from "rupiah-format";
import {
  Wrapper,
  WrapCard,
  CardMenu,
  Dis,
  Modal,
} from "./DetailRestoPage.styled";
import { useNavigate, useParams } from "react-router";
import Disable from "../../img/disabled.png";
import { UserContext } from "../../Context/userContext";
import { AuthModalContext } from "../../Context/authModalContext";
import { Link } from "react-router-dom";

const DetailRestoPage = (_req, _res) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { state } = useContext(UserContext);
  const { dispatch } = useContext(AuthModalContext);
  const { isLogin, user } = state;
  const isOwner =
    user?.role === "owner" && user?.resto?.id
      ? user.resto.id.toString()
      : false;

  const [resto, setResto] = useState([]);
  const [menu, setMenu] = useState([]);
  const [transactionOngoing, setTransactionOngoing] = useState(null);
  const [transactionActive, setTransactionActive] = useState(null);
  const [lastResto, setLastResto] = useState(null);
  const [modalConfirmation, setModalConfirmation] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get(`/resto/${id}`, { signal })
        .then((res) => {
          setResto(res.data.data.resto.data);
          setMenu(res.data.data.resto.menu);
        })
        .catch((err) => {
          handleError(err);
        });
      // Owner cant have cart
      if (!isLogin) return;
      if (isOwner) return;
      await API.get("/transaction/ongoing", { signal })
        .then((res) => {
          setTransactionOngoing(res.data.data.status);
        })
        .catch((err) => {
          handleError(err);
        });
      await API.get("/transaction/active", { signal })
        .then((res) => {
          setTransactionActive(res.data.data);
        })
        .catch((err) => {
          handleError(err);
        });
    })();
    return () => controller.abort();
  }, [id, isLogin, isOwner]);

  useEffect(() => {
    if (!isLogin) return;
    if (isOwner) return; // Owner cant have cart
    if (!transactionActive?.sellerId) return;

    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get(`/resto/user/${transactionActive.sellerId}`, { signal })
        .then((res) => {
          setLastResto(res.data.data.resto);
        })
        .catch((err) => handleError(err));
    })();
    return () => controller.abort();
  }, [transactionActive, isOwner, isLogin]);

  const [form, setForm] = useState({});
  const [refresh, setRefresh] = useState(false);
  const handleOrder = useCallback(
    (productId) => {
      if (isOwner) return;
      if (!isLogin) return dispatch("openLoginModal");
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
    [resto?.ownerId, isLogin, dispatch, isOwner]
  );

  const order = useCallback(() => {
    if (!isLogin) return;
    if (isOwner) return;
    if (!form) return;
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          signal,
        };

        const body = JSON.stringify(form);
        let res = await API.post("/add/transaction", body, config);
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
    return () => controller.abort();
  }, [form, isLogin, isOwner]);

  const autoOrder = useCallback(() => {
    if (
      resto?.ownerId === transactionActive?.sellerId ||
      !transactionActive?.sellerId
    ) {
      order();
    } else {
      console.info("You still have order on resto " + lastResto?.title);
      console.info(
        "If you want to change resto then update transaction status cancel, go to other resto its will popup a new modal if not same with last resto."
      );
      setModalConfirmation(true);
    }
  }, [resto?.ownerId, transactionActive?.sellerId, lastResto?.title, order]);

  const [firstInit, setFirstInit] = useState(true);
  useEffect(() => {
    if (isOwner) return;
    if (firstInit === true) return setFirstInit(false);
    autoOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, isOwner]);

  return (
    <>
      <Header trigger={refresh} />
      {modalConfirmation && (
        <Modal>
          <div className="modal-left">
            {"You still have order at resto " + lastResto?.title}
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
      )}
      <Wrapper>
        <WrapCard>
          <div className="wrappertitle">
            <h1>{isOwner === id ? user?.resto?.title : resto.title}, Menus</h1>
            {isOwner === id && (
              <Link to="/resto">
                <button className="redirectButton">Edit Resto</button>
              </Link>
            )}
          </div>
          {transactionOngoing && (
            <>
              <h4>
                You can't order right now, you have transaction{" "}
                {transactionOngoing}
              </h4>
              <h5>please wait until your order finish.</h5>
            </>
          )}
          {menu.length === 0 ? (
            <div className="center">
              <h2>No Menu yet</h2>
            </div>
          ) : (
            menu.map((menu) => {
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
                    <button
                      onClick={() => {
                        if (!isOwner) return handleOrder(menu.id);
                        if (isOwner === id) navigate("/Edit-Menu/" + menu.id);
                      }}
                      key={menu.id}
                    >
                      {isOwner === id ? "Edit" : "Order"}
                    </button>
                  )}
                </CardMenu>
              );
            })
          )}
        </WrapCard>
      </Wrapper>
    </>
  );
};

export default DetailRestoPage;

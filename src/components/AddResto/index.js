import React, { useState, useEffect, useContext, useCallback } from "react";
import { API, handleError } from "../../config/api";
import { Wrappper, Flexx } from "./AddResto.styled.";
import { Wrapper, WrapperMain, Flex } from "../AddMenu/AddMenu.styled";
import Header from "../Header";
import Clip from "../../img/clip.svg";
import Map from "../Map";
import map from "../../img/map.svg";
import { UserContext } from "../../Context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddResto = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);
  const { user } = state;
  const isResto = !!user?.resto;

  const [showMap, setShowMap] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const toggle = useCallback(() => setShowMap(!showMap), [showMap]);

  const [form, setForm] = useState({
    title: user?.resto?.title || "",
    img: user?.resto?.img || "",
    loc: user?.resto?.loc || "",
  });

  const [loc, setLoc] = useState(
    form.loc.split(" ") || user.location.split(" ") || []
  );
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (loc.length === 0) return;
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        await axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc[0]}&lon=${loc[1]}`,
            { signal }
          )
          .then((res) => {
            setAddress(res.data.display_name);
          });
        setForm((prev) => ({
          ...prev,
          loc: loc[0] + " " + loc[1],
        }));
      } catch (err) {
        console.error(err);
      }
    })();
    return () => controller.abort();
  }, [loc]);

  let [pre, setPre] = useState(form.img || Clip);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      try {
        setPre(URL.createObjectURL(e.target.files[0]));
      } catch (e) {
        setPre(Clip);
      }
    }
  };

  const handleSubmit = useCallback(
    (e) => {
      setLoading(true);
      const restoAPI = isResto ? "/resto" : "/add/resto";
      (async () => {
        try {
          e.preventDefault();
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          let formData = new FormData();
          formData.set("title", form.title);
          if (form.img && form.img !== user?.resto?.img) {
            formData.set("img", form.img[0], form.img[0].name);
          }
          formData.set("loc", form.loc);

          const res = isResto
            ? await API.patch(restoAPI, formData, config)
            : await API.post(restoAPI, formData, config);

          const redirectUrl = isResto
            ? `/resto/${user.resto.id}`
            : `/Resto/${res.data.data.resto.response.id}`;

          if (!isResto) {
            // Refect user new resto in global state
            await API.get("/login")
              .then((res) =>
                dispatch({
                  status: "login",
                  payload: res.data,
                })
              )
              .catch((err) => console.error(err));
          }

          navigate(redirectUrl);
        } catch (err) {
          handleError(err);
        }
      })();
    },
    [form.img, form.loc, form.title, navigate, isResto, user?.resto, dispatch]
  );

  return (
    <>
      {showMap && <Map toggle={toggle} setLocEdit={setLoc} />}
      <Header />
      <Wrappper>
        <Wrapper>
          <h1>{isResto ? "Edit" : "Add"} Resto</h1>
          <Flexx btwn>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="first"
              onChange={handleChange}
              value={form.title}
            />
            <label className="second" htmlFor="imgFile">
              Attach Image
              <img src={pre} alt="pre" />
              <input
                type="file"
                name="img"
                id="imgFile"
                onChange={handleChange}
                hidden
              />
            </label>
          </Flexx>
          <Flex btwn>
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="firsts"
              defaultValue={address}
              disabled
            />
            <button className="secondbtn" onClick={toggle}>
              Select On Map
              <img src={map} alt="map" />
            </button>
          </Flex>
          <WrapperMain>
            <button onClick={handleSubmit}>
              {isLoading ? "Loading..." : "Save"}
            </button>
          </WrapperMain>
        </Wrapper>
      </Wrappper>
    </>
  );
};

export default AddResto;

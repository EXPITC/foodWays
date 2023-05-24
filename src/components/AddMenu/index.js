import { React, useCallback, useContext, useEffect, useState } from "react";
import { API, handleError } from "../../config/api";

import Header from "../Header";
import Clip from "../../img/clip.svg";
import { Wrapper, WrapperMain, Flex } from "./AddMenu.styled";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../Context/userContext";

const AddMenu = ({ Edit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useContext(UserContext);

  const restoId = state.user?.resto?.id;

  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
  });

  const [curretImage, setCurretImage] = useState("");
  const [pre, setPre] = useState(Clip);
  const [isLoading, setLoading] = useState(false);

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
      (async () => {
        try {
          e.preventDefault();
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          const formData = new FormData();
          formData.set("title", form.title);
          if (form.image && form.image !== curretImage) {
            formData.set("image", form?.image[0], form?.image[0]?.name);
          }
          formData.set("price", form.price);
          console.log(!!Edit, "WHAT??");
          console.log(Edit ? "hey" : "hoo");
          !!Edit
            ? await API.patch("/product/" + id, formData, config)
            : await API.post("/add/product", formData, config);
          if (Edit) return navigate("/resto/" + restoId);
          setForm({
            title: "",
            image: "",
            price: "",
          });
          setPre(Clip);
          setLoading(false);
        } catch (err) {
          handleError(err);
        }
      })();
    },
    [
      form.image,
      form.price,
      form.title,
      Edit,
      id,
      curretImage,
      navigate,
      restoId,
    ]
  );

  useEffect(() => {
    if (!Edit) return;
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get(`/product/${id}`, { signal }).then((res) => {
        if (res?.data?.status !== "success") return;
        setForm({
          title: res.data.title,
          price: res.data.price,
        });
        const imgUrl = res.data.img;

        setCurretImage(imgUrl);
        setPre(imgUrl);
      });
    })();
    return () => controller.abort();
  }, [Edit, id]);

  return (
    <>
      <Header noTroll />
      <Wrapper>
        <h1>Add Menu</h1>
        <Flex btwn>
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
              name="image"
              id="imgFile"
              onChange={handleChange}
              hidden
            />
          </label>
        </Flex>
        <input
          className="third"
          type="text"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={form.price}
        />
        <WrapperMain>
          <button onClick={handleSubmit}>
            {isLoading ? "Loading..." : "Save"}
          </button>
        </WrapperMain>
      </Wrapper>
    </>
  );
};

export default AddMenu;

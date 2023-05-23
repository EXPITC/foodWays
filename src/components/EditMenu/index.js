import { useState } from "react";
import Header from "../Header";
import { Wrapper } from "../AddMenu/AddMenu.styled";

const EditMenu = () => {
  const [form, setForm] = useState();
  const handelChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Header />
      <Wrapper>
        <h1>Edit Menu</h1>
        <form>
          <input name="" />
        </form>
      </Wrapper>
    </>
  );
};

export default EditMenu;

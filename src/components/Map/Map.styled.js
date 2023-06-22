import styled from "styled-components";

export const Wrapper = styled.div`
  /* position: fixed;
    top:15%; */
  position: relative;
  max-width: 1346px !important;
  max-height: 495px !important;
  border-radius: 5px 5px 0px 0px;
  animation: animap 1s linear forwards;
  transition: width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease;
  @keyframes animap {
    0% {
      width: 0%;
      height: 0%;
    }
    50% {
      background: #ffffff;
      width: 0%;
      height: 100%;
    }
    100% {
      padding: 20px 14px;
      background: #ffffff;
      width: 100%;
      height: 100%;
    }
  }
  .x {
    width: 25px;
    height: 25px;
    margin-top: -60px;
    top: 13px;
    right: 7px;
    /* top: 22px; */
    /* right: 17px; */
    position: absolute;
    z-index: 999;
    cursor: pointer;
    opacity: 0;
    animation: x 1s ease forwards;
    animation-delay: 1s;
    @keyframes x {
      to {
        opacity: 1;
        margin-top: 0;
      }
    }
  }
`;
export const Card = styled.div`
  width: 419px;
  /* height: ${(props) => (props.h ? "auto" : "185px")}; */
  height: auto;
  z-index: 999;
  background: #ffffff;
  box-shadow: 0px -12px 11px -6px rgba(0, 0, 0, 0.25);
  border-radius: 5px 5px 3px 3px;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 10px;
  padding-bottom: 10px;
  opacity: 0;
  ${(props) =>
    props.h ? "top : 93px; right: 23px;" : "bottom:30px; left:35%;"}
  animation: appear 2s ease-out forwards;
  animation-delay: ${(props) => (props.h ? "1s" : "0")};
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  padding-right: 10px;
  padding-left: 10px;
  h3 {
    font-family: "Montserrat", sans-serif;
    /* ${(props) => (props.h ? "margin-top: 43px; margin-bottom:17px;" : "")} */
    margin: 0;
  }
  p {
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
    margin: 0;
    /* margin-top: 3px; */
    width: 100%;
  }
  h5 {
    font-size: 13px;
    margin: 0;
  }

  .address {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 55px;

    img {
      position: relative;
      width: 55px;
      height: 55px;
      /* border: 1px solid red; */
    }

    div {
      width: 80%;
      > h3 {
        text-align: center;
      }
    }
  }
  button {
    /* margin-top: 25px; */
    width: 395px;
    height: 30px;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    background: #433434;
    border-radius: 5px;
    background: #433434;
    color: white;
    border: none;
    &:hover {
      background: none;
      color: #433434;
      border: 1px solid #433434;
    }
  }
`;
export const Bg = styled.div`
  display: flex;
  z-index: 999;
  width: 100%;
  height: 100%;
  position: fixed;

  justify-content: center;
  align-items: center;
  animation: anibg 1s linear forwards;
  @keyframes anibg {
    from {
      background: rgba(0, 0, 0, 0.8);
    }
    to {
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

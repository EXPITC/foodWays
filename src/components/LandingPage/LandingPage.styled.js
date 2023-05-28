import styled from "styled-components";

export const WrapperYellow = styled.div`
  top: 0;
  width: 100%;
  height: 558px;
  position: relative;
  background: #ffc700;
  display: flex;
  justify-content: center;
  animation: apprears 1s ease-in forwards;
  @keyframes apprears {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
export const Polyy = styled.div`
  position: absolute;
  right: 175px;
  top: 90px;
  .poly {
    opacity: 0;
    position: absolute;
    animation: a 1s ease-out forwards;
    animation-delay: 0.3s;
    @keyframes a {
      0% {
        opacity: 0;
        transform: translateX(60px) translateY(0px);
      }
      80% {
        transform: translateX(60px) translateY(0px);
      }
      90% {
        opacity: 0.3;
      }
      100% {
        transform: translateX(60px) translateY(-30px);
        opacity: 1;
      }
    }
  }
`;
export const OneLineFlexTop = styled.div`
  padding-top: 27px;
  margin-bottom: 10px;
  padding-left: 4%;
  padding-right: 4%;
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 999;
  display: flex;
  flex-wrap: wrap;
  height: 84px;
  /* border: 1px solid black; */
  justify-content: space-between;
  align-items: center;
  align-content: center;

  > div {
    height: fit-content;
    align-items: center;
  }

  .cart {
    margin-right: 23px;
    &:hover {
      opacity: 0.5;
    }
  }

  p {
    background: red;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    font-size: 12px;
    color: white;
    text-align: center;
    /* margin-top: 0px; */
    margin-left: 20px !important;
    z-index: 99 !important;
    position: absolute !important;
    &:hover {
      opacity: 0.5;
    }
  }
  /* poly { */
  /*   opacity: 0; */
  /*   position: absolute; */
  /*   animation: a 1s ease-out forwards; */
  /*   animation-delay: 0.3s; */
  /*   @keyframes a { */
  /*     0% { */
  /*       opacity: 0; */
  /*       transform: translateX(60px) translateY(0px); */
  /*     } */
  /*     80% { */
  /*       transform: translateX(60px) translateY(0px); */
  /*     } */
  /*     90% { */
  /*       opacity: 0.5; */
  /*     } */
  /*     100% { */
  /*       transform: translateX(60px) translateY(-30px); */
  /*       opacity: 1; */
  /*     } */
  /*   } */
  /* } */
  button {
    width: 100px;
    height: 30px;
    background: #433434;
    border-radius: 5px;
    margin-left: 16px;
    border: 0;
    text-align: center;
    font-size: var(--FontSmall);
    color: white;
    font-weight: bold;
    font-family: "Shippori Antique B1", sans-serif;
    &:hover {
      border: 2px solid #433434;
      color: #433434;
      background: transparent;
    }
  }
`;
export const TextAndPizza = styled.div`
  display: flex;
  position: absolute;
  max-width: 1066px;
  height: 393px;
  padding-left: 20px;
  padding-right: 20px;
  bottom: 60px;
  /* border:1px solid black; */
`;
export const Text = styled.div`
  flex: 60;
  width: 60%;
  height: 100%;
  /* border:1px solid red; */
  h1 {
    font-size: var(--fontBig);
    font-size: 55px;
    line-height: 65px;
  }
  h2 {
    position: inline;
    width: 150px;
    height: 3px;
    background: var(--lightGrey);
  }
  p {
    position: inline;
    margin-left: 26px;
    width: 274px;
    height: 76px;
    font-size: 14px;
    line-height: 19px;
    font-size: var(--fontSmall);
    color: black;
  }
`;
export const ImgPizza = styled.img`
  flex: 40;
  padding-left: 26px;
  width: 40%;
  height: 100%;
`;
export const ImgProfile = styled.img`
  margin-bottom: -5px;
  min-width: 60px;
  min-height: 60px;
  max-height: 60px;
  max-width: 60px;
  border: 1px solid black;
  border-radius: 50%;
  opacity: 1 !important;
  cursor: pointer;
`;
export const ImgTrolly = styled.img`
  padding-bottom: 10px;
  margin-right: 23px;
  &:hover {
    opacity: 0.5;
  }
`;
export const WrapFlex = styled.div`
  display: flex;
  flex-direction: row;
  /* border:1px solid blue; */
`;
export const WrapFlex2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 91px;
  .nonee {
    text-decoration: none !important;
  }
`;
export const WrapFlex3 = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  .nonee {
    text-decoration: none !important;
    color: none !important;
  }
`;
export const WrapMain = styled.div`
  margin: 0 auto;
  width: 80%;
  /* border:1px solid red; */
  display: flex;
  flex-direction: column;
  margin-bottom: 62px;
  h1 {
    font-family: Abhaya Libre ExtraBold;
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 42px;
    color: black;
  }
`;
export const CardResto = styled.div`
  width: 250px;
  height: 95px;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;

  h2 {
    font-family: Abhaya Libre ExtraBold;
    font-style: normal;
    font-weight: 800;
    font-size: var(--fontMed);
    line-height: 28px;
    margin-left: 19px;
    color: black;
  }
  img {
    max-width: 75px;
    max-height: 75px;
    min-width: 75px;
    width: 50%;
  }
`;
export const CardNear = styled.div`
  width: 245px;
  height: 295px;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  padding-bottom: 0;
  cursor: pointer;
  p {
    font-family: "serif";
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: black;
    margin-top: 6px;
  }
  h3 {
    color: black;
    margin-top: 14px;
    margin-bottom: 0;
    font-family: "Abhaya Libre ExtraBold";
    font-style: normal;
    font-size: 18px;
  }
  > img {
    background: transparent;
    min-width: 100%;
    margin-bottom: 0;
    object-fit: cover;
    height: 160px;
    border-radius: 5px;
  }

  .wrapInformation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      margin-top: 5px;
      img {
        width: 30px;
        height: 50%;
        margin-right: 5px;
      }
      p {
        font-family: "Abhaya Libre ExtraBold";
        margin: auto;
        text-align: center;
        font-weight: bold;
        color: #433434;
      }
    }
  }
  .address,
  .disctance {
    font-family: "Abhaya Libre";
    text-align: right;
    font-weight: normal;
    color: #707070;
  }
`;

import styled from 'styled-components';


export const Wrapper = styled.div`
    /* border:1px solid black; */
    display:block;
    width:85%;
    margin:0 auto;
    display:flex;
    align-items: center;
    flex-direction:column;
    h1 {
        margin-top: 73px ;
        margin-bottom: 30px;
        width: 100%;
    }
`
export const WrapCard = styled.div`
    /* border:1px solid black; */
    display:flex;
    max-width: 1070px;
    width:auto;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-grow: 1;
    `
export const CardMenu = styled.div`
    margin-bottom: 42px;
    background: #FFFFFF;
    border-radius: 5px;
    width: 245px;
    height: 266px;
    display:flex;
    flex-direction: column;
    @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
    font-family: 'Shippori Antique B1', sans-serif;
    img {
        margin-left: 10px;
        margin-top: 12px;
        background:#222;
        width: 224px;
        height: 134px;
    }
    h3 {
        padding-top: 14px;
        margin:0 auto;
        width:90%;
        font-weight: 800;
        font-size: 18px;
        line-height: 21px;
        color: #000000;
    }
    p {
        width:90%;
        padding-top: 6px;
        padding-bottom: 17px;
        margin:0 auto;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: #FF1515;
        font-family: 'Shippori Antique B1', sans-serif;
    }
    button {
        margin:0 auto;
        border:none;
        width: 224px;
        height: 30px;
        background: #FFC700;
        border-radius: 5px;
        font-weight: 800;
        font-size: 14px;
        line-height: 19px;
        text-align: center;
        color: #433434;
        font-family: 'Shippori Antique B1', sans-serif;
        &:hover {
            color:#FFC700;
            background:#433434;
        }
    }
`
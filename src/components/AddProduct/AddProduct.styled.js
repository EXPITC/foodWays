import styled from "styled-components";

export const Wrapper = styled.div`
    /* border:1px solid black; */
    width:84.8%;
    margin:0 auto;
    margin-top: 73px;
    h1 {
        padding-left: 25px;
        font-size: 36px;
    }
    input{
        font-family: 'Montserrat', sans-serif;
        border-radius: 5px;
        border: 2px solid #766C6C;
        background: rgba(210, 210, 210, 0.25);
        padding-left: 10px;
    }
    .first {
        width :927px;
        height:50px;
    }
    .second {
        font-family: 'Montserrat', sans-serif;
        width: 213px;
        height: 50px;
        border-radius: 5px;
        border: 2px solid #766C6C;
        background: rgba(210, 210, 210, 0.25);
    }
    .third {
        width: 1157px;
        height: 50px;
    }
    label{
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding:10px;
        img{
            height:30px;
        }
    }
`

export const WrapperMain = styled.div`
    margin-top:40px;
    width:100%;
    button{
        float:right;
        background: #433434;
        border-radius: 5px;
        border:0;
        width: 260px;
        height: 40px;
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        color:white;
        &:hover{
            background: none;
            border:2px solid #433434;
            color:#433434;
        }
    }

`

export const Flex = styled.div` 
    display:flex;
    ${props => props.btwn ? `
    justify-content:space-between;
    `: null}
    margin-bottom: 27px;
`
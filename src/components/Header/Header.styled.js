import styled from 'styled-components';


export const Head = styled.div`
    background:var(--mainYellow);
    height: 91px;
`
export const TopFlex = styled.div`
    /* border:1px solid black; */
    height: inherit;
    margin: 0 auto;
    display:flex;
    justify-content: space-between;
    align-items: center;
    width:95%
`

export const Wrap = styled.div`
    display: flex;
    img{
        margin-left:23px;
    }
    p{
        background:red;
        height:15px;
        width:15px;
        border-radius: 50%;
        font-size: 12px;
        color:white;
        text-align:center;
        margin-left: 45px;
        z-index:99;
        position:absolute;
    }
    .profile {
        width:60px;
        height:60px;
        border:1px solid black;
        border-radius:50%;
    }
`
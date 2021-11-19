import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 20px 14px;

    margin: 0 auto;
    /* top:15%; */
    width: 1346px;
    height: 495px;
    background: #FFFFFF;
    border-radius: 5px 5px 0px 0px;
    .x {
        right:15px;
        position: absolute;
        z-index: 999;
        cursor: pointer;
    }

`
export const Bg = styled.div` 
     z-index: 999;
     width: 100vw;
     height: 100vh;
     position: fixed;
     background: rgba(255, 0, 0, 0.5);
`
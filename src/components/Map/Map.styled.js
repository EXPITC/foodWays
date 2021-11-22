import styled from 'styled-components';

export const Wrapper = styled.div`
    /* position: fixed;
    top:15%; */
    max-width: 1346px !important;
    max-height: 495px !important;
    border-radius: 5px 5px 0px 0px;
    animation: animap 1s linear forwards;
    -webkit-transition: width 0.3s ease,height 0.3s ease,left 0.3s ease,top 0.3s ease;
    @keyframes animap {
        0%{
            width: 0%;
            height: 0%;
        }50%{
            background: #FFFFFF;
            width: 0%;
            height: 100%;
        }100%{
            padding: 20px 14px;
            background: #FFFFFF;
            width: 100%;
            height: 100%;
        }

    }
    .x {
        width:25px;
        height:25px;
        margin-top:-60px;
        right:15px;
        position: absolute;
        z-index: 999;
        cursor: pointer;
        opacity:0;
        animation: x 1s ease forwards;
        animation-delay: 1s;
        @keyframes x {
            to {opacity:1;margin-top:0;}
        }
    }

`
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
        } to{
            background: rgba(0, 0, 0, 0.5);
        }
     }
`
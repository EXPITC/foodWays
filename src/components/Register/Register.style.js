import styled from 'styled-components';

export const Wrapper = styled.div`
    display:  ${props => (props.active === true? 'none' : 'block')};
    justify-content: center;
    align-items: center;
    position: fixed;
    background: white;
    z-index: 1000;
    border-radius: 100;
    width: 30%;
    height: 100%;
    animation: ani 0.4s ease-in forwards;
    
    
    @keyframes ani {
        0% {
            left: -30%;
        }
        100% {
            left: 0;
        }
    }
    @keyframes ani2 {
        0% {
            left: 0;
        }
        100% {
            left: -30%;
        }
    }
    .singup2-cointainer {
    background:white;
    background-position: 50%;
    transform: skewY(-50%);
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    margin: 10px solid black;
    }
    h2 {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        font-style: normal;
        font-weight: 900;
        font-size: 36px;
        line-height: 49px;
        margin-right: 40%;
        color: #FFC700;
    }
    form {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        display: flex;
        flex-direction: column;
        margin-top: 20%;
        justify-self: center;
        align-items: center;
        position: sticky;
    }
    form input {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        margin-bottom: 20px;
        background-color: transparent;
        display: block;
        width: 100%;
        border: none;
        border-bottom: 2px solid #433434;
        min-width: 250px;
        padding-left: 5px;
        outline: none;
        color: black;
    }
    form select {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        margin-bottom: 20px;
        background-color: transparent;
        display: block;
        width: 100%;
        border: none;
        border-bottom: 2px solid #433434;
        min-width: 250px;
        padding-left: 5px;
        outline: none;
        color: #B1B1B1;
        text-align: center;
        text-align-last: center;
    }
    form input::placeholder {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        text-align: center;
        color: #B1B1B1;
    }
    .singup2-cointainer .x-button-singup2{
        cursor: pointer;
        /* filter: brightness(0) invert(1); */
        width: 5%;
        top: 3%;
        right: 3%;
        position: absolute;
        transform: translateZ(999);
    }
    .singup2-cointainer .already-have-acc {
        padding-top: 10px;
        color: #B1B1B1;
        cursor: default;
    }
    .singup2-cointainer .login-here{
        font-weight:bold;
        color:#B1B1B1 !important;
        cursor: pointer;
    }
    .singup2-cointainer button {
        margin-top: 3%;
        width: 20vw;
    }

    .singup2-cointainer button  {
    background: #433434;
    border: 1px solid #433434;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
    font-size: 16px;
    font-weight: 800;
    line-height: 16px;
    min-height: 40px;
    outline: 0;
    padding: 12px 14px;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    }

    .singup2-cointainer button:hover, .singup2-cointainer button:active {
    background-color: initial;
    background-position: 0 0;
    color: #433434;
    }

    .singup2-cointainer button:active {
    opacity: .5;
    }
`
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
    animation: ani 0.4s ease-in;
    
    @keyframes ani {
        0% {
            left: -30%;
        }
        100% {
            left: 0;
        }
    }

    .login-cointainer {
        background:#ffff;
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
    form {
        display: flex;
        flex-direction: column;
        margin-top: 30%;
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
;
        min-width: 250px;
        padding-left: 5px;
        outline: none;
        color: #433434
    }
    form input::placeholder {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        text-align: center;
        color: #433434;
    }
    h2 {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        font-style: normal;
        font-weight: 900;
        font-size: 36px;
        line-height: 49px;
        margin-right: 65%;
        color: #FFC700;
    }
    .login-cointainer .x-button-login2{
        cursor: pointer;
        /* filter: brightness(0) invert(1); */
        width: 5%;
        top: 3%;
        right: 3%;
        position: absolute;
        transform: translateZ(999);
    }
    .login-cointainer .dont-have-acc {
        padding-top: 10px;
        color: #B1B1B1;
        cursor: default;
    }
    .login-cointainer .singup-here {
        color: #B1B1B1 !important;
        cursor: pointer;
        font-weight: bold;
    }
    .login-cointainer button {
        margin-top: 3%;
        width: 20vw;
    }

    .login-cointainer button  {
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

    .login-cointainer button:hover, .login .login-cointainer button:active {
    background-color: initial;
    background-position: 0 0;
    color: #433434;
    }

    .login-cointainer button:active {
    opacity: .5;
    }
`
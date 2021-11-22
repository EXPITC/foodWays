import React ,{useState ,useEffect} from 'react';

import Xbtns from '../../img/close.png';

import { Wrapper } from './Login.styled';

const Login = ({show , Cancel, toggle , LoginSwitch}) => {
    // console.log(active);

    const holder = show;
    const [active, setActive] = useState(holder);
    useEffect(() => {
        setActive(!active);
    }, [holder])
    
    return (
        <>
        <Wrapper active={active}>
                <div className="login-cointainer">
                    <img className="x-button-login2" onClick={Cancel} src={Xbtns} alt=""/>
                <form action="">
                        <h2>Login</h2>
                        <input  type="email" name="email" placeholder="email"/>
                        <input type="password" name="password" placeholder="password"/>
                        <button class="btnlogin2" onClick={LoginSwitch}>LOGIN</button>
                        <p class="dont-have-acc">don't have any acc? </p>
                        <p class="singup-here" onClick={toggle} >singup here!</p>
                    </form>
                </div>
        </Wrapper>
        </>
    )
};

export default Login;
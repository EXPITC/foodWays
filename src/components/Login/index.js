import React ,{useState ,useEffect} from 'react';

import Xbtns from '../../img/close.png';

import { Wrapper , Bg} from './Login.styled';

const Login = ({show , Cancel, toggle , LoginSwitch}) => {
    // console.log(active);

    const holder = show;
    const [active, setActive] = useState(holder);
    useEffect(() => {
        setActive(!active);
    }, [holder])
    
    return (
        <>
        <Bg>
        <Wrapper active={active}>
                <div className="login-cointainer">
                    <img className="x-button-login2" onClick={Cancel} src={Xbtns} alt=""/>
                <form action="">
                        <h2>Login</h2>
                        <input  type="email" name="email" placeholder="email"/>
                        <input type="password" name="password" placeholder="password"/>
                        <button class="btnlogin2" onClick={LoginSwitch}>LOGIN</button>
                        <p class="dont-have-acc">Don't have an account ? <span class="singup-here" onClick={toggle}>Klik Here</span></p>
                    </form>
                </div>
        </Wrapper>
        </Bg>
        </>
    )
};

export default Login;
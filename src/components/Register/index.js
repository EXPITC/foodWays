import { React, useState, useEffect } from 'react'

import { Wrapper ,Bg } from './Register.style'
import Xbtns from '../../img/close.png';

const Register = ({ showR , Cancel , toggle , RegisterSwitch ,}) => {
    let holder = showR;
    let [activeR, setActiveR] = useState(holder);
    useEffect(() => {
        setActiveR(!activeR);
    },[holder])
    
    return (
        <Bg>
        <Wrapper active={activeR}>
           <div class="singup2-cointainer">
                <img class="x-button-singup2" onClick={Cancel} src={Xbtns} alt=""/>
                <form action="">
                    <h2>Register</h2>
                    <input type="email" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="text" name="name" placeholder="Full Name"/>
                    <input type="text" name="Gender" placeholder="Gender"/>
                    <input type="text" name="Phone" placeholder="Phone Number"/>
                    <select id="user" name="user">
                        <option hidden>As User</option>
                        <option value="As User" disabled>As User</option>
                        <option value="Costumer">Costumer</option>
                        <option value="Owner">Owner</option>
                    </select>
                    <button class="btnsingup2" onClick={RegisterSwitch}>SINGUP</button>
                    <p class="already-have-acc">Already have an account ?  <span class="login-here" onClick={toggle}>Klik Here</span></p>
                </form>
            </div>
        </Wrapper>
        </Bg>
    )
}

export default Register;
import { React, useState, useEffect } from 'react'

import { Wrapper } from './Register.style'
import Xbtns from '../../img/close.png';

const Register = ({ showR }) => {
    let holder = showR;
    const [activeR, setActiveR] = useState(holder);
    useEffect(() => {
        setActiveR(!activeR);
    },[holder])
    const Cancel = () => setActiveR(!activeR);

    return (
        <Wrapper active={activeR}>
           <div class="singup2-cointainer">
                <img class="x-button-singup2" src={Xbtns} onClick={Cancel}alt=""/>
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
                    <button class="btnsingup2">SINGUP</button>
                    <p class="already-have-acc">already have any acc? </p>
                    <p class="login-here" >login here!</p>
                </form>
            </div>
        </Wrapper>
    )
}

export default Register;
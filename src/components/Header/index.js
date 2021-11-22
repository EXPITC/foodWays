import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../img/Icon.svg';
import Trolly from '../../img/Trolly.svg';
import Pizza from '../../img/pizza.svg';
import poly from '../../img/poly.svg';

import { Head, TopFlex, Wrap ,Polyy ,Specialdrop} from './Header.styled';
import DropDown  from '../DropDown';

const Header = ({ val , U ,noTroll}) => {
    let [show, setShow] = useState(false);
    const toggle = () => (setShow(!show));

    return (
        <>
        <Head>
            <TopFlex>
                <Link to="/">
                <img src={Icon} className="shake"/>
                </Link>
                <Wrap>
                    {val ? <p>{val}</p> : null}
                        {noTroll ? null :
                            <Link ClassName="cart" to="/Cart">
                                <img src={Trolly} />
                            </Link>}
                    <img className='profile' onClick={toggle} src='https://upload.wikimedia.org/wikipedia/en/2/23/Lofi_girl_logo.jpg' />
                </Wrap>
            </TopFlex>
            {show ? <>
                    <Polyy>
                        <div className="poly">
                            <img src={poly} />
                        </div>
                    </Polyy>
                    <Specialdrop>
                        <DropDown U={U}className="drop" logout/>
                    </Specialdrop>
                    </>
                : null}
        </Head>
        </>
    )
}

export default Header
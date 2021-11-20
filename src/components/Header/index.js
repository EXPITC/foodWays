import { React, useEffect, useState } from 'react';

import Icon from '../../img/Icon.svg';
import Trolly from '../../img/Trolly.svg';
import Pizza from '../../img/pizza.svg';
import poly from '../../img/poly.svg';

import { Head, TopFlex, Wrap ,Polyy ,Specialdrop} from './Header.styled';
import DropDown  from '../DropDown';

const Header = ({ val }) => {
    let [show, setShow] = useState(false);
    const toggle = () => (setShow(!show));
  
    return (
        <>
        <Head>
            <TopFlex>
                <img src={Icon}/>
                <Wrap>
                    {val ? <p>{val}</p> : null }
                    <img src={Trolly}/>
                    <img className='profile' onClick={toggle} src={Pizza} />
                </Wrap>
            </TopFlex>
            {show ? <>
                    <Polyy>
                        <div className="poly">
                            <img src={poly} />
                        </div>
                    </Polyy>
                    <Specialdrop>
                        <DropDown className="drop" />
                    </Specialdrop>
                    </>
                : null}
        </Head>
        </>
    )
}

export default Header
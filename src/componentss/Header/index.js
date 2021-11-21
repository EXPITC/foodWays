import { React, useEffect, useState } from 'react';

import Icon from '../../img/Icon.svg';
import Trolly from '../../img/Trolly.svg';
import Pizza from '../../img/pizza.svg';
import { Head , TopFlex ,Wrap } from './Header.styled';

const Header = ({val , noTroll}) => {
  
    return (
        <Head>
            <TopFlex>
                <img src={Icon}/>
                <Wrap>
                    {val ? <p>{val}</p> : null }
                    {noTroll ? null : <img src={Trolly} />}
                    <img className='profile'src={Pizza}/>
                </Wrap>
            </TopFlex>
        </Head>
    )
}

export default Header
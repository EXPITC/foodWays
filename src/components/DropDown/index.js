import { React, useEffect, useState } from 'react';

import { Wrapper ,Wrapper2 ,Icon , JustWrap ,Logout} from './DropDown.styled';
import userIcon from '../../img/user.svg';
import logoutIcon from '../../img/logout.svg';
import foodIcon from '../../img/foodicon.svg';

const DropDown = () => {
    // x = false;
    const val = true
    return (
        <>
            {val ?<>
                <Wrapper2 >
                    <Wrapper>
                        <JustWrap>
                            <Icon src={userIcon} />
                            <p>Profile Partner</p>
                        </JustWrap>
                        <JustWrap>
                            <Icon src={foodIcon} />
                            <p>Add Product</p>
                        </JustWrap>
                    </Wrapper>
                    <Logout>
                        <JustWrap>
                            <Icon src={logoutIcon} />
                            <p>Logout</p>
                        </JustWrap>
                    </Logout>
                </Wrapper2>
                </>
                :
                <Wrapper2 h>
                    <Wrapper h>
                        <JustWrap h>
                            <Icon src={userIcon} />
                            <p>Profile Partner</p>
                        </JustWrap>
                    </Wrapper>
                    <Logout h>
                        <JustWrap>
                            <Icon src={logoutIcon} />
                            <p>Logout</p>
                        </JustWrap>
                    </Logout>
                </Wrapper2>
            }
        </>
    )
}

export default DropDown
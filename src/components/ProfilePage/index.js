import { React } from 'react';
import {Link} from 'react-router-dom'

import Header from '../Header'
import Icon from '../../img/Icon.svg'
import { Wrapper ,FlexCollum, Flex ,Pp , Buttons} from './ProfilePage.styled';

const ProfilePage = ({U}) => {
    const which = U;
    const data = [
        {
            title1: (which?'My Profile' : 'Profile Partner'),
            title2: (which?'History Transaction': 'History Order'),
            titleName: (which?'Full Name':'Name Partner'),
            img: (which?'profile':'Partner'),
            history: (which?'Geprek Bensu': 'Andi')
        }
    ]
    return (
        <>
            <Header U={U} logout/>
            <Wrapper>
                <FlexCollum>
                    <h1>{data[0].title1}</h1>
                    <Flex>
                        <FlexCollum>
                            <img className="img" src='https://bhsowl.org/wp-content/uploads/2020/11/LOFI.jpg'alt={data[0].img}/>
                            <Link to="/Edit/Profile">
                            <button>Edit Profile</button>
                            </Link>
                        </FlexCollum>
                        <FlexCollum className="h">
                            <div>
                                <Pp b c>{data[0].titleName}</Pp>
                                <Pp>Andi</Pp>
                            </div>
                            <div>
                                <Pp b c>Email</Pp>
                                <Pp>xxx@company.com</Pp>
                            </div>
                            <div>
                                <Pp b c>Phone</Pp>
                                <Pp>08xxxx</Pp>
                            </div>
                        </FlexCollum>
                    </Flex>
                </FlexCollum>
                <FlexCollum>
                    <h1>{data[0].title2}</h1>
                    {/* Loop */}
                    <Flex w>
                        <FlexCollum btwn>
                            <div>
                                <Pp ft b>{data[0].history}</Pp>
                                <Pp n b>Saturday, </Pp>
                                <Pp n a>12 March 2021</Pp>
                            </div>
                            <Pp bb b>Total : Rp 45.000</Pp>
                        </FlexCollum>
                        <FlexCollum  btwn i >
                            <img src={Icon} />
                            <Buttons>Finished</Buttons>
                        </FlexCollum>
                    </Flex>
                    
                </FlexCollum>
            </Wrapper>
        </>
    )
}

export default ProfilePage;
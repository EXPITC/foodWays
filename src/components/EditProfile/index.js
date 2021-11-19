import { React ,useState,useEffect} from 'react';

import Header from '../Header';
import Clip from '../../img/clip.svg'
import map from '../../img/map.svg'
import Map from '../Map'
import { Wrapper ,WrapperMain ,Flex} from './EditProfile.styled'



const EditProfile = () => {
    const [showMap, setShowMap] = useState(false);
    const toggle = () => setShowMap(!showMap);
    const which = false
    const data = [
        {
            Title1 : (which ? 'Edit Profile' : 'Edit Profile Partner'),
            Title2 : (which ? 'Full Name' : 'Name Partner')
        }
    ]
    return (
        <>
            {showMap ? <Map toggle={toggle}/>: null}
            <Header noTroll />
            <Wrapper>
                <h1 >{data[0].Title1}</h1>
                    <Flex btwn>
                        <input
                            type="text"
                            name="Title"
                            placeholder={data[0].Title2}
                            className="first"
                            />
                        <label className="second" htmlFor='imgFile'>Attach Image
                            <img src={Clip}/>
                            <input type="file" name='img' id= "imgFile" hidden/>
                        </label>
                    </Flex>
                    <input
                        className="third"
                        type="text"
                        name="email"
                        placeholder="Email"
                    ></input>
                    <input
                        className="third"
                        type="text"
                        name="phone"
                        placeholder="Phone"
                    ></input>
                    <Flex btwn>
                        <input
                            type="text"
                            name="Title"
                            placeholder="Location"
                            className="firsts"
                            />
                        <button className="secondbtn" onClick={toggle}>Select On Map
                            <img src={map}/>
                        </button>
                    </Flex>
                <WrapperMain>
                    <button>Save</button>
                </WrapperMain>
            </Wrapper>
        </>
    )
}

export default EditProfile
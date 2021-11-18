import { React, useState } from 'react';

//components
import Login from '../Login';
import Register from '../Register';

import Pizza from '../../img/pizza.svg';
import Icon from '../../img/Icon.svg';
import Trolly from '../../img/Trolly.svg';
import { WrapperYellow , OneLineFlexTop , TextAndPizza , WrapFlex , WrapFlex2 , WrapFlex3 , CardNear , Text ,ImgPizza , ImgProfile , ImgTrolly, WrapMain , CardResto} from './LandingPage.styled';


// TC~Dummy
const resto = [
    {
        name: 'Burger King',
        img: 'https://pngimg.com/uploads/burger_king/burger_king_PNG17.png' 
    },
    {
        name: 'Startbucks',
        img: 'https://www.freepnglogos.com/uploads/starbucks-logo-png-25.png'
    },
    {
        name: 'KFC',
        img: 'https://www.freepnglogos.com/uploads/kfc-png-logo/camera-kfc-png-logo-0.png'
    },
    {
        name: 'Jco',
        img: 'https://1.bp.blogspot.com/-QaywjoHhvXM/Xt9fsQbVeuI/AAAAAAAAGXQ/ut_W8VQkhiQFODR9C_zr0zAYLf8UhlMvgCK4BGAsYHg/s1200/jco.png'
    }
]
const near = [
    {
        food: 'Geprek Bensu',
        img: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Ayam_geprek.png',
        distance: '0,2 KM'
    },
    {
        food: 'Nasi Goreng Mas Roni',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nasi_Goreng.jpg/800px-Nasi_Goreng.jpg',
        distance: '0,6 KM'
    },
    {
        food: 'Pecel Ayam Prambanan',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Pecel_Solo.JPG/800px-Pecel_Solo.JPG',
        distance: '0,6 KM'
    },
    {
        food: 'Kopi Kenangan',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG',
        distance: '1,6 KM'
    },
]

const LandingPage = () => {
    let [show, setShow] = useState(false);
    let [showR, setShowR] = useState(false);
    
    const toggle = () => (setShow(!show), setShowR(false));
    const toggleR = () => (setShowR(!showR), setShow(false));
    const Cancel = () => setShowR(!showR);
    const CancelL = () => setShow(!show);
    return (
        <>
            {show ? ( <Login show={show} Cancel={CancelL} toggle={toggleR}/>) : null}
            {showR ? (<Register showR={showR} Cancel={Cancel} toggle={toggle} />) : null}
            
            < WrapperYellow>
                <OneLineFlexTop>
                    <img src={Icon} alt='icon' />
                    <div>
                        {/* <ImgTrolly src={Trolly} alt="Trolly"/>
                <ImgProfile src={Pizza} alt="Profile"/> */}
                        {/* login condition */}
                        <button onClick={toggleR}>Register</button>
                        <button onClick={toggle}>Login</button>
                    </div>
                </OneLineFlexTop>
                <TextAndPizza>
                    <Text>
                        <h1>Are You Hungry? <br></br> Express Home Delivery</h1>
                        <WrapFlex>
                            <h2> </h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                        </WrapFlex>
                    </Text>
                    <ImgPizza src={Pizza} alt='Pizza' />
                </TextAndPizza>
            </WrapperYellow>
            <WrapMain>
                <h1>Popular Restaurant</h1>
                <WrapFlex2>
                    {resto.map((resto) => {
                        return <CardResto key={resto.name} >
                            <img src={resto.img} alt={resto.name} />
                            <h2>{resto.name}</h2>
                        </CardResto>
                    })}
                </WrapFlex2>
                <h1>Restaurant Near You</h1>
                <WrapFlex3>
                    {near.map((near) => {
                        return <CardNear key={near.food} >
                            <img src={near.img} alt={near.food} />
                            <h3>{near.food}</h3>
                            <p>{near.distance}</p>
                        </CardNear>
                    })}
                </WrapFlex3>
            </WrapMain>
        </>
    )
}

export default LandingPage;
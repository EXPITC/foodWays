import { React, useEffect, useState } from 'react';

import Header from '../Header'
import { Wrapper, WrapCard , CardMenu} from './DetailPage.styled'
import Pizza from '../../img/pizza.svg';
// check new this

const near = [
    {
        id:1,
        food: 'Geprek Bensu',
        img: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Ayam_geprek.png',
        distance: '0,2 KM'
    },
    {
        id:2,
        food: 'Nasi Goreng Mas Roni',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nasi_Goreng.jpg/800px-Nasi_Goreng.jpg',
        distance: '0,6 KM'
    },
    {   id:3,
        food: 'Pecel Ayam Prambanan',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Pecel_Solo.JPG/800px-Pecel_Solo.JPG',
        distance: '0,6 KM'
    },
    {   id:4,
        food: 'Kopi Kenangan',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG',
        distance: '1,6 KM'
    },
    {   id:5,
        food: 'Geprek Bensu',
        img: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Ayam_geprek.png',
        distance: '0,2 KM'
    },
    {   id:6,
        food: 'Nasi Goreng Mas Roni',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nasi_Goreng.jpg/800px-Nasi_Goreng.jpg',
        distance: '0,6 KM'
    },
    {   id:7,
        food: 'Pecel Ayam Prambanan',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Pecel_Solo.JPG/800px-Pecel_Solo.JPG',
        distance: '0,6 KM'
    },
    {   id:8,
        food: 'Kopi Kenangan',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG',
        distance: '1,6 KM'
    },
]
const DetailPage = () => {
    
    const [val, setVal] = useState(false);
    const add = () => setVal(val + 1);
    const remove = () => setVal(val + 1);
    return (
        <>
            <Header val={val}/>
            <Wrapper>
                <WrapCard>
                <h1>Geprek Bensu, Menus</h1>
                {near.map((near) => {
                    return (
                        <CardMenu key={near.id}>
                            <img src={near.img} />
                            <h3>{near.food}</h3>
                            <p>Rp.45.000</p>
                            <button onClick={add}>Order</button>
                        </CardMenu>
                    )
                })}
                </WrapCard>
            </Wrapper>
        </>
    )
}

export default DetailPage
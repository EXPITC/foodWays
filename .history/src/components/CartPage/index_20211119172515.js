import { React, useState, useEffect } from 'react';

import { Wrapper ,WrapContent , WrapOrder ,Orderbtn , Pp , WrapOrder2, Flex , FlexCollum , Wrap1 , Wrap2 , Wrap3} from './CartPage.styled'
import map from '../../img/map.svg'
import plus from '../../img/+.svg'
import min from '../../img/-.svg'
import trash from '../../img/Trash.svg'
import Header from '../Header';
import Map from '../Map';
const CartPage = () => {
    const [open, setOpen] = useState(false)
    const openMap = () => setOpen(!open)
    const [val, setVal] = useState(1);
    const add = () => setVal(val + 1);
    const remove = () => setVal(val - 1);

    useEffect(()=> {
        if()
    },[])
    return (
        <>
            {open? <Map toggle={openMap}/> : null }
            
            <Header val={val}/>
            <Wrapper>
                <h1>Geprek Bensu, Menus</h1>
                <h2>Delivery Location</h2>
                <WrapContent>
                    <div><p>Harbour building</p></div>
                    <button onClick={openMap}>Select On Map <img src={map}/></button>
                </WrapContent>
                <h2>Review Your Order</h2>
                <WrapOrder>
                    <div className="over">
                    <WrapOrder2>
                    <Flex>
                        <Wrap1>
                            <img />
                            <Wrap2>
                                <Wrap3>
                                    <h4>Paket Geprek</h4>
                                    <p>Rp.15.000</p>
                                </Wrap3>
                                <Wrap3>
                                    <div>
                                        <button onClick={remove}><img src={ min }/></button>
                                                <h4 className="pinkBg">{ val}</h4>
                                        <button onClick={add}><img src={ plus}/></button>
                                    </div>
                                        <img src={ trash }/>
                                </Wrap3>
                            </Wrap2>
                        </Wrap1>
                    </Flex>
                    <Flex>
                        <Wrap1>
                            <img />
                            <Wrap2>
                                <Wrap3>
                                    <h4>Paket Geprek</h4>
                                    <p>Rp.15.000</p>
                                </Wrap3>
                                <Wrap3>
                                    <div>
                                        <button><img src={ plus}/></button>
                                    <h4 className="pinkBg">1</h4>
                                        <button><img src={ min }/></button>
                                    </div>
                                        <img src={ trash }/>
                                </Wrap3>
                            </Wrap2>
                        </Wrap1>
                    </Flex>
                    <Flex>
                        <Wrap1>
                            <img />
                            <Wrap2>
                                <Wrap3>
                                    <h4>Paket Geprek</h4>
                                    <p>Rp.15.000</p>
                                </Wrap3>
                                <Wrap3>
                                    <div>
                                        <button><img src={ plus}/></button>
                                    <h4 className="pinkBg">1</h4>
                                        <button><img src={ min }/></button>
                                    </div>
                                        <img src={ trash }/>
                                </Wrap3>
                            </Wrap2>
                        </Wrap1>
                    </Flex>
                    <Flex>
                        <Wrap1>
                            <img />
                            <Wrap2>
                                <Wrap3>
                                    <h4>Paket Geprek</h4>
                                    <p>Rp.15.000</p>
                                </Wrap3>
                                <Wrap3>
                                    <div>
                                        <button><img src={ plus}/></button>
                                    <h4 className="pinkBg">1</h4>
                                        <button><img src={ min }/></button>
                                    </div>
                                        <img src={ trash }/>
                                </Wrap3>
                            </Wrap2>
                        </Wrap1>
                    </Flex>
                    <Flex>
                        <Wrap1>
                            <img />
                            <Wrap2>
                                <Wrap3>
                                    <h4>Paket Geprek</h4>
                                    <p>Rp.15.000</p>
                                </Wrap3>
                                <Wrap3>
                                    <div>
                                        <button><img src={ plus}/></button>
                                    <h4 className="pinkBg">1</h4>
                                        <button><img src={ min }/></button>
                                    </div>
                                        <img src={ trash }/>
                                </Wrap3>
                            </Wrap2>
                        </Wrap1>
                    </Flex>
                    <Flex>
                        <Wrap1>
                            <img />
                            <Wrap2>
                                <Wrap3>
                                    <h4>Paket Geprek</h4>
                                    <p>Rp.15.000</p>
                                </Wrap3>
                                <Wrap3>
                                    <div>
                                        <button><img src={ plus}/></button>
                                    <h4 className="pinkBg">1</h4>
                                        <button><img src={ min }/></button>
                                    </div>
                                        <img src={ trash }/>
                                </Wrap3>
                            </Wrap2>
                        </Wrap1>
                    </Flex>
                    </WrapOrder2>
                    </div>
                    <FlexCollum>
                        <tb>
                            <Wrap3>
                                <Pp >Subtotal</Pp>
                                <Pp r>Rp.35.000</Pp>
                            </Wrap3>
                            <Wrap3>
                                <Pp>Qty</Pp>
                                <Pp>2</Pp>
                            </Wrap3>
                            <Wrap3>
                                <Pp>Ongkir</Pp>
                                <Pp r>Rp.10.000</Pp>
                            </Wrap3>
                        </tb>
                            <Wrap1>
                                <Pp r b>TOTAL</Pp>
                                <Pp r>Rp.10.000</Pp>
                            </Wrap1>
                    </FlexCollum>
                </WrapOrder>
                <Orderbtn>
                    <button>Order</button>
                </Orderbtn>
            </Wrapper>
        </>
    )
}

export default CartPage
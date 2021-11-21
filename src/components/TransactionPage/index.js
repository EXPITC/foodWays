import { React ,useState ,useEffect} from 'react';

import Header from '../Header'
import approve from '../../img/approve.svg'
import cancel from '../../img/cancel.svg'
import { Wrapper ,Head ,Tab ,Special ,TwoB} from './TransactionPage.styled';

const TransactionPage = () => {
    const [res, setRes] = useState([
        {
            id: 1,
            val:true
        },
        {
            id:2,
            val:false
        },
        {
            id: 3,
            val:false
        },
        {
            id:4,
            val:false
        }
    ]);
    const [fin, setFin] = useState([
        {
            id:1,
            permit: null,
            stat: 'w',
            status: 'Waiting Approve',
            data: {
                name: 'Sugeng No Pants',
                address: 'Cileungsi',
                Product: 'Pkaket Geprek, Paket ke..'
            }
        },
        {
            id:2,
            permit: approve,
            stat: 's',
            status: 'Success',
            data: {
                name: 'Haris Gams',
                address: 'Serang',
                Product: 'Pkaket Geprek, Paket ke..'
            }
        },
        {
            id:3,
            permit: cancel,
            stat: 'c',
            status: 'Cancel',
            data: {
                name: 'Aziz Union',
                address: 'Bekasi',
                Product: 'Pkaket Geprek, Paket ke..'
            }
        },
        {
            id:4,
            permit: approve,
            stat: 'o',
            status: 'On The Way',
            data: {
                name: 'Lae Tanjung Balai',
                address: 'Tanjung Balai',
                Product: 'Pkaket Geprek, Paket ke..'
            }
        },
        
    ]);
    useEffect(() => {
        console.log(fin[0],fin[1])        
    },[fin])
    return (
        <>
            <Header noTroll />
            <Wrapper>
                <h1>Income Transaction</h1>
                <Tab>
                    <tr>
                        <Head n>No</Head>
                        <Head n2>Name</Head>
                        <Head a>Address</Head>
                        <Head p>Products Order</Head>
                        <Head s>Status</Head>
                        <Head m p>Action</Head>
                    </tr>
                    {/* TC~REPEAT */}
                    {fin.map((_) => {
                        const id = _.id - 1
                        console.log(id)
                        return (
                        <tr>
                        <Special>{_.id}</Special>
                        <Special>{_.data.name}</Special>
                        <Special>{_.data.address}</Special>
                        <Special>{_.data.Product}</Special>
                        {_.stat === `w`? <Special w>{_.status}</Special> : null}
                        {_.stat === `s`? <Special s>{_.status}</Special> : null}
                        {_.stat === `c`? <Special c>{_.status}</Special> : null}
                        {_.stat === `o`? <Special o>{_.status}</Special> : null}
                        <Special bt>
                            
                                    {res[id].val ? (
                            <>
                            <TwoB onClick={() => {
                                        setFin(fin.map((x) => {
                                            if (x.id === 1) {
                                                return {
                                                    ...x,
                                                    permit: cancel,
                                                    stat: 'c',
                                                    status: 'Cancel'
                                                }
                                            } else {return {...x}}
                                        }))
                                        setRes(res.map((x) => {
                                            if(x.id === 1){
                                                return {
                                                  ...x ,
                                                  val:false
                                                }
                                              } else {return {...x}}
                                        })
                                        )
                                    }}
                                        a>Cancel</TwoB>
                                    <TwoB onClick={() => {
                                       setFin(fin.map((x) => {
                                        if (x.id === 1) {
                                            return {
                                                ...x,
                                                permit: approve,
                                                stat: 's',
                                                status: 'Complete'
                                            }
                                        } else {return {...x}}
                                    }))
                                    setRes(res.map((x) => {
                                        if(x.id === 1){
                                            return {
                                              ...x ,
                                              val:false
                                            }
                                          } else {return {...x}}
                                    })
                                    )
                                    }}>Aprove</TwoB>
                            </>
                            )
                                        : <img src={_.permit} alt={`${_.permit}`} />
                            }
                        </Special>
                    </tr>
                        )
                    })}
                   
                </Tab>
            </Wrapper>
        </>
    )
}

export default TransactionPage
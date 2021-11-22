import React ,{useState,useEffect} from 'react';
//React router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import DetailPage from './DetailPage';
import ProfilePage from './ProfilePage';
import EditProfile from './EditProfile';
import TransactionPage from './TransactionPage';
import CartPage from './CartPage';
import AddProduct from './AddProduct';
import LandingPage from './LandingPage';
import Header from './Header';


const RouterSetup = () => {
    const [u, setU] = useState(false)
    const sett = () => { setU(true) };
    const setf = () => { setU(false)};
    useEffect(() => {console.log(u)},[u])
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LandingPage sett={sett} setf={setf} />}/>
                <Route exact path="/Cart" element={<CartPage U={u}/>} />
                <Route path="/Profile" element={<ProfilePage U={u}/>}/>
                <Route path="/Edit/Profile" element={<EditProfile U={u}/>}/>
                <Route path="/Transaction" element={<TransactionPage/>}/>
                <Route path="/DetailPage" element={<DetailPage/>}/>
                {u ? null: <Route path="/Add-Product" element={<AddProduct />}/>}
                <Route path="*" element={<><Header/><h1>Error 404</h1></>}/>
            </Routes>
    </Router>
    )
}

export default RouterSetup
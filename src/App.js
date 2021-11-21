//style
import { GlobalStyles } from './GlobalStyles';



//components
import LandingPage from './components/LandingPage';
// import Login from './components/Login';





import DetailPage from './components/DetailPage';
import ProfilePage from './components/ProfilePage';
import EditProfile from './components/EditProfile';
import TransactionPage from './components/TransactionPage';

//components
import LandingPage from './components/LandingPage';
import DetailPage from './components/DetailPage';

import CartPage from './components/CartPagee';

function App() {
  return (
    <>
    <DetailPage/>
    {/* <ProfilePage/>
    <EditProfile/>
    <TransactionPage/> */}
    <GlobalStyles/>
    </>
  );
}

export default App;
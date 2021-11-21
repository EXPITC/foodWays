//style
import { GlobalStyles } from './GlobalStyles';



//components
import LandingPage from './components/LandingPage';
// import Login from './components/Login';





import DetailPage from './components/DetailPage';
import ProfilePage from './components/ProfilePage';
import EditProfile from './components/EditProfile';


function App() {
  return (
    <>
    <DetailPage/>
    <ProfilePage/>
    <EditProfile/>
    <GlobalStyles/>
    </>
  );
}

export default App;
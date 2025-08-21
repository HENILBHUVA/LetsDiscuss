
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Authentication from './pages/authentication';
import LandingPage from './pages/landing';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/home';
import History from './pages/history';

function App() {
  return (
    <>
    
      <Router>

      <AuthProvider>

        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/auth' element={<Authentication/>}></Route>
          <Route path='/history' element={<History/>}></Route>
          <Route path='/home' element={<HomeComponent/>}></Route>
          <Route path='/:url' element={<VideoMeetComponent/>}></Route>
        </Routes>
        
        </AuthProvider>
      </Router>

    </>
  );
}

export default App;

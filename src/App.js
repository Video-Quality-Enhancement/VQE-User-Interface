import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import PushNotification from './components/PushNotification';
import Footer from './components/Footer';
import Enhance from './pages/Enhance';
import { useState } from 'react';
import EnhancedVideos from './pages/EnhancedVideos';

function App() { // TODO: LATER PUT AuthContextProvider only for NavBar and Protected

  const [isVideoEnhanced, setIsVideoEnhanced] = useState(true);  

  return (
    <div className="App d-flex flex-column min-vh-100">
      <AuthContextProvider>
        <NavBar />
        <Protected>
          <PushNotification isVideoEnhanced={isVideoEnhanced} setIsVideoEnhanced={setIsVideoEnhanced}/>
        </Protected>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/enhanced-videos' element={<Protected> <EnhancedVideos /> </Protected>}/>
          <Route 
            path='/enhance' 
            element={
              <Protected>
                <Enhance isVideoEnhanced={isVideoEnhanced} setIsVideoEnhanced={setIsVideoEnhanced} />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
      <Footer />
    </div>
  );
}

export default App;

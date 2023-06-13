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
import { useState } from 'react';
import EnhancedVideos from './pages/EnhancedVideos';
import EnhancedVideo from './pages/EnhancedVideo';
import EnhanceVideo from './pages/EnhanceVideo';
import ProtectedLayout from './layouts/ProtectedLayout';

export default function App() { // TODO: LATER PUT AuthContextProvider only for NavBar and Protected

  const [isVideoEnhanced, setIsVideoEnhanced] = useState(true);  

  return (
    <div className="App d-flex flex-column min-vh-100">
      <AuthContextProvider>
        <NavBar />
        <Protected>
          <PushNotification isVideoEnhanced={isVideoEnhanced} setIsVideoEnhanced={setIsVideoEnhanced}/>
        </Protected>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<ProtectedLayout />}>
            <Route 
              path='enhance-video' 
              element={
                <EnhanceVideo isVideoEnhanced={isVideoEnhanced} setIsVideoEnhanced={setIsVideoEnhanced} />
              }
            />
            <Route path='enhanced-videos'>
              <Route index element={<EnhancedVideos />} />
              <Route path=':requestId' element={<EnhancedVideo />} />
            </Route>

          </Route>
          
          {/* here 'about' routes and others will come */}
          
        </Routes>
      </AuthContextProvider>
      <Footer />
    </div>
  );
}

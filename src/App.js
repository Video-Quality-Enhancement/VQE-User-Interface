import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import PushNotification from './components/PushNotification';
import Footer from './components/Footer';
import Enhance from './pages/Enhance';

function App() { // TODO: LATER PUT AuthContextProvider only for NavBar and Protected
  return (
    <div className="App d-flex flex-column min-vh-100">
      <AuthContextProvider>
        <NavBar />
        <Protected>
          <PushNotification />
        </Protected>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<Protected> <Account /> </Protected>}/>
          <Route path='/enhance' element={<Protected> <Enhance /> </Protected>}/>
        </Routes>
      </AuthContextProvider>
      <Footer />
    </div>
  );
}

export default App;

import './App.css'; // not required
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import PushNotification from './components/PushNotification';


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <NavBar />
        <Protected>
          <PushNotification />
        </Protected>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/account'
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
          <Route
            path='/account2'
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;

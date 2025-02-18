import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Protected = ({ children }) => {
  const { user } = UserAuth();
  
  if (!user || !user.uid) {
    return <Navigate to='/' />;
  }

  return children;
};

export default Protected;
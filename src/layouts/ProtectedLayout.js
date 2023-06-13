import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export default function ProtectedLayout() {
  const { user } = UserAuth();
  
  if (!user || !user.uid) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}
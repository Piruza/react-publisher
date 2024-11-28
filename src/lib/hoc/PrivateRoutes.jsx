import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '@/views/Login/Login';

export const PrivateRoutes = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return isAuthenticated || localStorage.getItem('auth_token') ? (
    children
  ) : (
    <Login  />
  );
};


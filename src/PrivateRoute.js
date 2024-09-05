

import React, {  } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Update the import path if needed


const PrivateRoute = ({ element }) => {
  const { state, isAuthenticated } = useAuth();
  // const isAuthenticated = true;
    console.log("auth state:", state.isAuthenticated);
 
  return state.isAuthenticated || isAuthenticated ? element : <Navigate to="/login" />;
  
};

export default PrivateRoute;

import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import useLoginUser from '../../hooks/user/useLoginUser';
import PropTypes from 'prop-types';
import {jwtDecode} from 'jwt-decode';
import Toast from '../layout/Toast';

export const AuthProvider = ({ children }) => {
  const { mutateAsync, error, isLoading } = useLoginUser();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token-task');
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      
      if (currentTime >= expirationTime) {
        return false;
      }
    }
    return token !== null;
  });

  const login = async (formData) => {
    try {
      const data = await mutateAsync(formData);
      if (data) {
        setIsAuthenticated(true);
        Toast.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully.",
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Auth error", err);
      Toast.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials. Please try again.",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token-task');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);

    Toast.fire({
      icon: 'success',
      title: 'Logged out',
      text: 'You have successfully logged out.',
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token-task');
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; 
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        localStorage.removeItem('token-task');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        Toast.fire({
          icon: 'error',
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again.',
        });
      }
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

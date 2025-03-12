import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import useLoginUser from '../../hooks/user/useLoginUser';
import PropTypes from 'prop-types';

export const AuthProvider = ({ children }) => {
    const { mutateAsync, error, isLoading } = useLoginUser();

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("token-task") !== null;
    });

    const login = async (formData) => {
        try {
            const data = await mutateAsync(formData);
            if (data) {
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Auth error", err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token-task");
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.removeItem("token-task");
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, error, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
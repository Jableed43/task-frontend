import { useContext } from 'react';
import AuthContext from '../components/auth/AuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;

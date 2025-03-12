import PropTypes from "prop-types";
import { Navigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth";


const RestrictedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()

    if(isAuthenticated){
        return <Navigate to="/" replace />
    }

    return children;

}

export default RestrictedRoute;


RestrictedRoute.propTypes = {
    children: PropTypes.element ,
};
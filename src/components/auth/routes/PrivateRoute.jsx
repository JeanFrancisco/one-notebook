import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ isAuthenticated, component: Component, redirectPath, ...rest }) => {

    return <Route { ...rest } component={ props => (
                ( isAuthenticated ) ?
                    <Component { ...props } />
                :   <Redirect to={ redirectPath } />
            )} />
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    redirectPath: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
}

export default PrivateRoute;
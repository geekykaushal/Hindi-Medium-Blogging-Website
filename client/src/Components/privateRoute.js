import React , {useContext , Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../Context/auth/authContext'

const PrivateRoute = ({component : Component , ...rest}) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated} = authContext;
    return (
        <Fragment>
            <Route {...rest} render={props => !isAuthenticated ? (<Redirect  to='/login' />) : (<Component {...props}/>)}
            />
        </Fragment>
    )
}

export default PrivateRoute
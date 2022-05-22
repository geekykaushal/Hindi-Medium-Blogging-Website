import React from 'react'
import {Link} from 'react-router-dom'
import '../../css/main.css'
const Login = () => {
    return (
        <div className="navlink">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </div>
    )
}

export default Login

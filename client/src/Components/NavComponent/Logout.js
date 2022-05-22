import React , {useContext  } from 'react'
import { Link } from 'react-router-dom'
import '../../css/main.css'
import AuthContext from '../../Context/auth/authContext'
import { toast } from 'react-toastify'
const Login = () => {

    const authContext = useContext(AuthContext);
    const { logout } = authContext

    const onLogout = () => {
        logout()
        toast.success('Successfully loggged out.')
    }

    return (
        <div className="navlink">
            <li><Link to="/posts">Add Post</Link></li>
            <li><Link to="/show">Show Post</Link></li>
            <li><Link to="/" onClick={onLogout}>Logout</Link></li>
        </div>
    )
}

export default Login
import React , {useContext, useEffect} from 'react'
import './SideDrawer.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/auth/authContext'
import {toast} from 'react-toastify'


const SideDrawer =  props => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated , logout , loadUser , user} = authContext;

    useEffect(() => {
        loadUser()
        //eslint-disable-next-line
    }, [])

    const onLogout = () => {
        logout();
        toast.success('Successfully logout out...')
        
    }

    let username;

    if(user !== null) {
          username = user.name
    }

    let drawerClasess = 'side__drawer'
    if(props.show) {
        drawerClasess = 'side__drawer open'
    }
    return  (
        <div className={drawerClasess}>
            {isAuthenticated !== true ? (
                <ul >
                    <li>
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/register">Sign up</Link>
                    </li>
                </ul>
            ) : <ul className="nav align-center">
                    <li style={{paddingLeft:"20px"}}>Welcome {} {username}</li>
                    {/* <li className="lead text-light pt-1">Welcome<span class="navbar-text">{user.name}</span></li> */}
                    <li className="nav-link text-light"><Link to="/posts" style={{ textDecoration: "none" }}>Add Post</Link></li>
                    <li className="nav-link text-light"><Link to="/show" style={{ textDecoration: "none" }}>My Post</Link></li>
                     <li className="nav-link text-light"><Link to="allposts" style={{ textDecoration: "none" }}>Posts</Link></li>
                    <li className="ml-4"><button className="btn btn-sm btn-danger" onClick={onLogout}>Logout</button></li>
                </ul>}
        </div>
    )
}


export default SideDrawer
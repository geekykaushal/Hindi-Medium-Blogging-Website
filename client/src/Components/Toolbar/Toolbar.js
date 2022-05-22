import React , {useContext , useEffect} from 'react'
import SideLogo from './SideLogo'
import AuthContext from '../../Context/auth/authContext'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
const Toolbar = (props) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, loadUser } = authContext

    useEffect(() => {
        loadUser()
        //eslint-disable-next-line
    }, [])
    const onLogout = () => {
        logout()
        toast.success('Successfully loggged out.')
    }

    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__toogle__btn">
                    <SideLogo click={props.sideDrawerOpenerHandler} />
                </div>
                <div className="toolbar__logo"><Link to="/">HindiMedium</Link></div>
                <div className="spacer" />
                <div className="toolbar__navigation-items">
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
                            {/* <li className="lead text-light pt-1">Welcome<span class="navbar-text">{user.name}</span></li> */}
                            <li className="nav-link text-light"><Link to="/allposts" style={{ textDecoration: "none" }}>Posts</Link></li>
                            <li className="nav-link text-light"><Link to="/posts" style={{ textDecoration: "none" }}>Add Post</Link></li>
                            <li className="nav-link text-light"><Link to="/show" style={{ textDecoration: "none" }}>My posts</Link></li>
                            <button className=" btn btn-sm btn-outline-danger" onClick={onLogout}>Logout</button>
                        </ul>}
                </div>
            </nav>
        </header>
    )

     
}
   


export default Toolbar

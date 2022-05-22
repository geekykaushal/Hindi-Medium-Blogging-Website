import React , {useContext , useEffect}from 'react'
import '../../css/navBar.css'
import Login from './Login'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/auth/authContext'

import Logout from './Logout'
const Single = () => {

    const authContext = useContext(AuthContext);
    const { isAuthenticated,  loadUser } = authContext

    useEffect(() => {
        loadUser()
        //eslint-disable-next-line
    }, [])
   
    
    const Toggle = () => {
          const x = document.getElementById('sideNav')
          x.classList.toggle("sidebar__menu");
          x.classList.toggle('toggleClass')
          x.style.transition = "1s"
    }

    return (
        <>
        <div className="header">
                <li className="header__logo"><Link to="/" style={{ textDecoration: "none", color: "white" }}>HindiMedium</Link></li>
                <div className="side__logo">
                <div className="click__btn">
                    {isAuthenticated !== true ? (<Login />) : (<Logout />)}
                </div>
                <div className="nav__icon toogler" onClick={Toggle}>
                +
                </div>
            </div>
        </div>
        <div className="sidebar__menu styling" id="sideNav">
                {isAuthenticated !== true ? (<Login />) : (<Logout />)}
        </div>
       </>
    )
}

export default Single

import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/auth/authContext'
import { toast } from 'react-toastify'
const Navbar = () => {
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid" >
      <div className="container">
        <Link className="navbar-brand" to="/">HindiMedium</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="nav">
            {isAuthenticated !== true ? (
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/register">Sign up</Link>
                </li>
              </ul>
            ) : <ul className="nav align-center">
                {/* <li className="lead text-light pt-1">Welcome<span class="navbar-text">{user.name}</span></li> */}
                <li className="nav-link text-light"><Link to="/posts" style={{ textDecoration: "none" }}>Add Post</Link></li>
                <li className="nav-link text-light"><Link to="/show" style={{ textDecoration: "none" }}>Show Post</Link></li>
                <button className=" btn btn-sm btn-outline-danger" onClick={onLogout}>Logout</button>
              </ul>}
          </ul>
        </div>
      </div >
    </nav >
  )
}



export default Navbar
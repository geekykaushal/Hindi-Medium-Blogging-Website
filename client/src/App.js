import React , {useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
//import Navbar from './Components/layout/Navbar'
import Register from './Components/User/RegisterForm'
import Login from './Components/User/LoginForm'
import AuthState from './Context/auth/AuthState'
import AlertState from './Context/alert/AlertState'
import PostState from './Context/posts/PostState'
import Alert from './Components/Alert/Alert'
import setAuthToken from './Context/utils/setAuthToekn'
import Dashboad from './Components/layout/Dashboard'
// import Forgot from './Components/Reset/Forgot'
// import Reset2 from './Components/Reset/Reset2'
import Post from './Components/post/Post'
import ShowPost from './Components/post/ShowPost'
import SinglePost from './Components/post/SinglePost'
import PrivateRoute from './Components/privateRoute'
//import Bootstrap from './Components/Bootstrap'
import { ToastContainer } from 'react-toastify'
//import Single from './Components/NavComponent/Single'
import ToolBar from './Components/Toolbar/Toolbar'
import './Components/Toolbar/Toolbar.css'
import SideDrawer from './Components/Toolbar/SideDrawer'
import DashboardPost  from './Components/post/DashboardPost'
import Footer from './Components/layout/Footer'


import Backdrop from './Components/Backdrop/Backdrop'
function App() {

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const [open, setOpen] = useState({
    sideDrawerOpener: false
  });


  const sideDrawerOpenerHandler = () => {
    setOpen({ sideDrawerOpener: !open.sideDrawerOpener })
  }

  const backDropHandler = () => {
    setOpen({ sideDrawer: false })
  }

  let backDrop;

  if (open.sideDrawerOpener) {

    backDrop = <Backdrop click={backDropHandler} />
  }


  return (
    <div>
    <AuthState>
      <AlertState>
        <PostState>
          <Router>
              <ToolBar sideDrawerOpenerHandler={sideDrawerOpenerHandler} />
              <SideDrawer show={open.sideDrawerOpener} />
              {backDrop}
            <Alert />
            <Switch>
              {/* <Route exact path="/bootstrap" component={Bootstrap} /> */}
              <Route exact path="/" component={Dashboad} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/allposts" component={DashboardPost} />
              {/* <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/reset/:token" component={Reset2} /> */}
              <PrivateRoute exact path="/posts/:id" component={SinglePost} />
              <PrivateRoute exact path="/posts" component={Post} />
              <PrivateRoute exact path='/show' component={ShowPost} />
            </Switch>
            <Footer />
          </Router>
        </PostState>
      </AlertState>
      <ToastContainer autoClose={2000} />
    </AuthState>
    </div>
  );
}

export default App;

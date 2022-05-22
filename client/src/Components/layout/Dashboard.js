import React, { useContext, useEffect } from 'react'
import AuthContext from '../../Context/auth/authContext'
import './dashboard.css'
//import Card from './Card'
import Footer from './Footer'


const Dashboard = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
   


    useEffect(() => {
        loadUser()
        //eslint-disable-next-line
    }, [])


    return (
        <div>
            <section className="main__section">
                <h1>Feel Free to share</h1>
                <img src={require('../image/background.png')} alt="1" />
            </section>
            {/* <section className="card__area">
            
                  <Card heading={"Don't want to read"}>
                 We have reading assitance for you
             </Card>
                <Card heading={"Create Free Blogs"}>
                    
             </Card>
                <Card heading={"How Our Services"}>
                 Hello world
             </Card>
           
            </section> */}
            
            {/* <section className="feedback__form">
                <div><h1>This is Feedback Form</h1></div>
                <div><h1>This is Form Area</h1></div>
            </section> */}
            <Footer />
           
        </div>
    )
}

export default Dashboard

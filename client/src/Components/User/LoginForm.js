import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../Context/auth/authContext'
import { toast } from 'react-toastify';



const LoginForm = (props) => {
    const authContext = useContext(AuthContext);

    const { login, error, clearError, isAuthenticated } = authContext



    useEffect(() => {

        if (isAuthenticated) {
            props.history.push('/');
            (function () {
                toast.success('Successfully logged in')
            })()

        }
        if (error === 'Invalid Data') {
            // setCount(count + 1)
            // // setAlert(error, 'danger')
            ErrorNotify(error)
            clearError();
            // clearError()
            // if (count >= 1) {
            //     toast.error('Forgot Password! Click Reset to Create New')
            // }

        }

       

        //eslint-disable-next-line
    }, [props.history, isAuthenticated, clearError, error])




    const [event, setEvent] = useState({
        email: "",
        password: ""
    })



    const onChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (email === ' ' || password === '') {
            // setAlert('All field required', 'success')
            toast.warn("All fields required")

        }
        const formData = {
            email: event.email,
            password: event.password
        }
        login(formData)


        console.log('submitted')
    }

    const { email, password } = event

    //toast
    const ErrorNotify = (error) => toast.error(error)

    return (
        <>
        <div className=" container w-50 shadow-sm global__margin">
            <h2 className="text-center">Login <span style={{color:"#0156ab"}}>HindiMedium</span></h2>
            <form onSubmit={onSubmit} style={{ height: "300px" }}>
                <div className="form-group" style={marginCon}>
                    <label >Email</label>
                    <input type="email"
                        className="form-control border-top-0 border-left-0 border-right-0"
                        value={email}
                        name="email"
                        onChange={onChange}

                        aria-describedby="emailHelp" />
                </div>
                <div className="form-group" style={marginCon}>
                    <label>Password</label>
                    <input type="password"
                        className="form-control border-top-0 border-left-0 border-right-0"
                        value={password}
                        onChange={onChange}
                        name="password"

                        aria-describedby="emailHelp" />
                </div>
                <button type="submit" style={{ marginTop: "30px" }} className=" btn btn-block btn-outline-success">Login</button>
            </form>
        </div>
   
        </>
    )
}

const marginCon = {
    marginTop: "20px"
}


export default LoginForm

import React , {useState , useContext, useEffect} from 'react'
import AlertContext from '../../Context/alert/alertContext'

import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'


const Reset2 = (props) => {

  const alertContext = useContext(AlertContext)
  const token = useParams()
  const history = useHistory()
  const { setAlert } = alertContext;

  const [event , setEvent] = useState({
    password : '',
    password1:'',
    isReset: false,
  })
 
useEffect(() => {
    if(event.isReset) {
        setAlert('Password Reset Successfully', 'success');
        history.push('/login')
    }
})

 

const onChange = (e) => {
    setEvent({...event , [e.target.name]: e.target.value})
}



const { password , password1 } = event
const Data = {
    password: event.password
} 
 

const onSubmit = (e) => {
    e.preventDefault();
    if(password !== password1) {
        setAlert('Password do not match', 'warning')
    }
    const config = {
        headers  : {
            'Content-Type':'application/json'
        }
    }
    axios.post(`/reset/${token}` , Data , config).then(res => {
        setEvent({isReset : true , password : "" , password1: ""});
    }).catch(err => console.log(err))
    console.log('submitted')
}






  return (
    <div className="container w-50 my-4">
        <h2 className="text-center">Update <span className="text-danger">Password</span></h2>
         <form onSubmit={onSubmit}>
            <div className="form-group">
                <label >Password</label>
                <input type="password"
                 className="form-control" 
                 value={password}
                 name="password"
                 onChange={onChange}
                 />
            </div>
            <div className="form-group">
                <label >Confirm Password</label>
                <input type="password"
                 className="form-control" 
                 value={password1}
                 name="password1"
                 onChange={onChange}
                 />
            </div>
            <button type="submit" className="btn btn-block btn-primary">Update Password</button>
            </form>
        </div>
  )
}

export default Reset2

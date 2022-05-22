import React , {useReducer} from 'react'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import {v4} from 'uuid'

import {
    ALERT_FAIL,
    ALERT_SUCCESS
} from '../types'

const AlertState = (props) => {
    const initialState = {
        alert : []
    }

    const [state  , dispatch] = useReducer(AlertReducer , initialState);

    const setAlert = (msg , type ) => {
        const id = v4()
          dispatch({
              type : ALERT_SUCCESS,
              payload : {id , msg , type}
          })

          setTimeout(() => dispatch({
              type : ALERT_FAIL,
              payload : id
          }) , 5000)
    }
    
    return (
        <AlertContext.Provider
        value={{
            alert: state.alert,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )

}

export default AlertState

import React, { useContext } from 'react'
import AlertContext from '../../Context/alert/alertContext'

const Alert = () => {
    const alertContext = useContext(AlertContext)
    const {alert} = alertContext
    return (
        <div>
        {alert.length > 0 &&
          alert.map((item) => (
            <div key={item.id} className={`alert alert-${item.type} `}>
              {item.msg}
            </div>
          ))}
      </div>
    )
}

export default Alert

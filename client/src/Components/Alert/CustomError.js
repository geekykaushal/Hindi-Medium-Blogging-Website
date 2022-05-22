import React from 'react'


const CustomError = ({ closeToast }) => {
    return (
        <div>
            Something went Wrong!
            <button>Retry</button>
            <button onClick={closeToast}>Close</button>
        </div>
    )
}

export default CustomError

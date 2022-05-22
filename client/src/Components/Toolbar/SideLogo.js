import React from 'react'
import './SideLogo.css'
const tooglerBtn = props => (
   <button className="toogler__btn" onClick={props.click}>
     <div className="toogle-btn__line"></div>
     <div className="toogle-btn__line"></div>
    <div className="toogle-btn__line"></div>
   </button>
)

export default tooglerBtn
import React from 'react'
import './card.css'
const Card = props =>  (
        <div className="card__component">
            <h1 className="heading">{props.heading}</h1>
        <p className="para">{props.children}</p>
        </div>
 )


export default Card

import React from 'react'
import './usercard.css'
const UserCard = ({name , email , totalPosts}) => {
    return (
        <div className="userCard__container">
            <div className="imageContainer">
                <img src={require('../image/background.png')} />
            </div>
            <div className="userData">
                <p>Author {name}</p>
                <p>Email {email}</p>
                <p>Total Posts {totalPosts}</p>
            </div>
        </div>
    )
}

export default UserCard

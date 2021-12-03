import React from "react";

function UserProfile ({currentUser}) {

    if (!currentUser) {
        return (
            <h2>...Loading 🧘‍♀️ </h2>
        )
    }

    return (
        <div className="user-profile container">
            <img src={currentUser.image_url}/>
            <h4>First name: {currentUser.first_name}</h4>
            <h4>Last name: {currentUser.last_name}</h4>
            <br />
            <h4>Email: {currentUser.email}</h4>
            <h4>Phone number: {currentUser.phone_number}</h4>
            <br />
            <h4>Username: {currentUser.username}</h4>
        </div>
    )
}

export default UserProfile;
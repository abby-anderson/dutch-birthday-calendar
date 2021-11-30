import React from "react";

function UserProfile ({currentUser}) {

    if (!currentUser) {
        return (
            <h2>...Loading 🧘‍♀️ </h2>
        )
    }

    return (
        <div className="user-profile">
            <h3>inside userprofile component!</h3>
            <h4>first name: {currentUser.first_name}</h4>
            <h4>last name: {currentUser.last_name}</h4>
            <h4>username: {currentUser.username}</h4>
        </div>
    )
}

export default UserProfile;
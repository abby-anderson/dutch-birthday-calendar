import React from "react";
import { useState } from "react";

function UserProfile ({currentUser, setCurrentUser, reload, setReload}) {
    const [editUserData, setEditUserData] = useState({
        first_name:  "",
        last_name:  "",
        email:  "",
        phone_number:  "",
        image_url: ""
    })

    if (!currentUser) {
        return (
            <h2>...Loading 🧘‍♀️ </h2>
        )
    } 

    function handleClick (event) {
        let form = document.getElementById('edit-user-form')
        form.classList.toggle('hidden')
    }

    function handleChange (event) {
        setEditUserData({
            ...editUserData, [event.target.name]:event.target.value, 
            id: currentUser.id
        })
    }

    function handleSubmit (event) {
        event.preventDefault();
    
        fetch (`/api/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editUserData)
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setCurrentUser(data)
                    setReload(!reload)
                    setEditUserData({
                        first_name:  "",
                        last_name:  "",
                        email:  "",
                        phone_number:  "",
                        image_url: ""
                    })
                    let form = document.getElementById('edit-user-form')
                    form.classList.toggle('hidden')
                })
            }
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-evenly">
                <div class="col-4">
                    <h3>Welcome, {currentUser.first_name}!</h3>
                    <br /><br />
                    <img src={currentUser.image_url}/>
                    <p><i>Your current profile picture</i></p>
                </div>
                <div class="col-4">
                    <h3>Here's your saved info:</h3>
                    <br /><br />
                    <h4>First name: {currentUser.first_name}</h4>
                    <h4>Last name: {currentUser.last_name}</h4>
                    <br />
                    <h4>Email: {currentUser.email}</h4>
                    <h4>Phone: {currentUser.phone_number}</h4>
                    <br />
                    <h4>Username: {currentUser.username}</h4>
                </div>
            </div>
            <div className="button-container">
                <button id="edit-profile-button" type="button" className="btn btn-outline-dark" onClick={handleClick}>Edit</button>
            </div>
            <div>
                <form id="edit-user-form" className="hidden" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First name</label>
                        <input className="form-control" type="text" name="first_name" onChange={handleChange} value={editUserData.first_name}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Last name</label>
                        <input className="form-control" type="text" name="last_name" onChange={handleChange} value={editUserData.last_name} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="text" name="email" onChange={handleChange} value={editUserData.email} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone number</label>
                        <input className="form-control" type="text" name="phone_number" onChange={handleChange} value={editUserData.phone_number} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Profile picture</label>
                        <input className="form-control" type="text" name="image_url" onChange={handleChange} value={editUserData.image_url} />
                    </div>
                    <button type="submit" className="btn btn-outline-dark">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UserProfile;
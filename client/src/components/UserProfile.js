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
        console.log('edit button clicked!', event.target)
        let form = document.getElementById('edit-user-form')
        form.classList.toggle('hidden')
    }

    function handleChange (event) {
        setEditUserData({
            ...editUserData, [event.target.name]:event.target.value, id: currentUser.id
        })
        // if (event.target.name === "first_name") {

        // }

    }

    function handleSubmit (event) {
        event.preventDefault();
        console.log("clicked submit!")
        console.log('completed form', editUserData)
    
        // fetch PATCH
        // re set the current user state
        // maybe reload the page?
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
                    console.log('successful fetch patch!', data)
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
            <div className="button-container">
                <button id="edit-profile-button" type="button" className="btn btn-primary" onClick={handleClick}>Edit</button>
            </div>

            <div className="user-profile">
                <img src={currentUser.image_url}/>
                <h4>First name: {currentUser.first_name}</h4>
                <h4>Last name: {currentUser.last_name}</h4>
                <br />
                <h4>Email: {currentUser.email}</h4>
                <h4>Phone number: {currentUser.phone_number}</h4>
                <br />
                <h4>Username: {currentUser.username}</h4>
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

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UserProfile;
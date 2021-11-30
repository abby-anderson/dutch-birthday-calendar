import React from 'react';
import { useState } from 'react';


function Signup ({setCurrentUser}) {
    const [errors, setErrors] = useState([])
    const [signupFormData, setSignupFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        image_url: "",
        username: "",
        password: "",
        password_confirmation: ""
    })
    
    function handleChange (event) {
        setSignupFormData({
            ...signupFormData, [event.target.name]: event.target.value
        })

    }
    
    function handleSubmit (event) {
        event.preventDefault();
        console.log(signupFormData)

        // then fetch post route /signup to userscontroller #create method
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupFormData)
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log('signup object from successful fetch post', data)
                    setCurrentUser(data)
                    // will want to push us back to home page or maybe calendar in a refactor
                })
            }
            else {
                response.json().then(errors => {
                    console.log('should be errors from fetch else', errors.errors)
                    setErrors(errors.errors)
                    // will want to map through this array to display each error message later
                })
            }
        })
    }

    return (
        <div className="signup-component">
            <h3>inside signup component!</h3>

            <form className="signup-form" onSubmit={handleSubmit}>

                <label>First Name</label>
                <input type="text" name="first_name" onChange={handleChange} value={signupFormData.first_name} />

                <label>Last Name</label>
                <input type="text" name="last_name" onChange={handleChange} value={signupFormData.last_name} />

                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} value={signupFormData.email} />

                <label>Phone Number</label>
                <input type="text" name="phone_number" onChange={handleChange} value={signupFormData.phone_number} />

                <label>Profile Pic</label>
                <input type="text" name="image_url" onChange={handleChange} value={signupFormData.image_url} />

                <label>Username</label>
                <input type="text" name="username" onChange={handleChange} value={signupFormData.username} />

                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} value={signupFormData.password} />

                <label>Password Confirmation</label>
                <input type="password" name="password_confirmation" onChange={handleChange} value={signupFormData.password_confirmation} />

                <input type="submit"/>
            </form>

        </div>
    )
}

export default Signup;
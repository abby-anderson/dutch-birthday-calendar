import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


function Signup ({setCurrentUser}) {
    let navigate = useNavigate();
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
                    navigate('/')
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

    function renderErrors () {
        return (
            errors.map(error => {
                return (
                    <div class="alert alert-danger" role="alert">
                        {error}
                    </div>
                )
            })

        )
    }

    return (
        <div className="signup-component">

            <form onSubmit={handleSubmit}>

            <div class="mb-3">
                <label class="form-label">First Name</label>
                <input type="text" class="form-control" name="first_name" onChange={handleChange} value={signupFormData.first_name} />
            </div>

            <div class="mb-3">
                <label class="form-label">Last Name</label>
                <input type="text" class="form-control" name="last_name" onChange={handleChange} value={signupFormData.last_name} />
            </div>

                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" aria-describedby="emailHelp" name="email" onChange={handleChange} value={signupFormData.email} />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Phone Number</label>
                    <input type="text" class="form-control" name="phone_number" onChange={handleChange} value={signupFormData.phone_number} />
                </div>

                <div class="mb-3">
                    <label class="form-label">Profile Pic</label>
                    <input type="text" class="form-control" name="image_url" onChange={handleChange} value={signupFormData.image_url} />
                </div>

                <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input type="text" class="form-control" name="username" onChange={handleChange} value={signupFormData.username} />
                </div>

                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" name="password" onChange={handleChange} value={signupFormData.password} />
                </div>

                <div class="mb-3">
                    <label class="form-label">Password Confirmation</label>
                    <input type="password" class="form-control" name="password_confirmation" onChange={handleChange} value={signupFormData.password_confirmation} />
                
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

            {!!errors ? renderErrors() : null }

        </div>
    )
}

export default Signup;
import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login ({setCurrentUser}) {
    let navigate = useNavigate();
    const [error, setError] = useState(null);

    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: "",
    })


    function handleChange (event) {
        setLoginFormData({
            ...loginFormData, [event.target.name]: event.target.value
        })
    }


    function handleSubmit (event) {
        event.preventDefault();

        console.log('clicked submit', loginFormData)

        // sends to sessionscontroller #create method
        fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginFormData)
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log('response is okay!', data)
                    setCurrentUser(data)
                    navigate('/')
                })
            }
            else {
                response.json().then(data => {
                    console.log('response was not okay', data.error)
                    setError(data.error)
                })
            }
        })
    }


    return (
        <div className="login-component">
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputUsername1" class="form-label">Username</label>
                    <input type="username" class="form-control" id="exampleInputUsername1" name="username" value={loginFormData.username} onChange={handleChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={loginFormData.password} onChange={handleChange}  />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

            {!!error > 0 ? 
            <div class="alert alert-danger" role="alert">
            {error}
            </div>
            : null }

        </div>
    )
}

export default Login;
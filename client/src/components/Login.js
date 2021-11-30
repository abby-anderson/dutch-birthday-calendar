import React from "react";
import { useState } from "react";

function Login ({setCurrentUser}) {

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
                    // will want to push us to homepage (and/or calendar on refactor)
                })
            }
            else {
                response.json().then(data => {
                    console.log('response was not okay', data)
                    // set error state
                    // then display below
                })
            }
        })
    }

    return (
        <div className="login-component">
            <h3>inside login component!</h3>

            <form className="login-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={loginFormData.username} onChange={handleChange} />

                <label>Password</label>
                <input type="password" name="password" value={loginFormData.password} onChange={handleChange} />

                <input type="submit" />

            </form>


        </div>
    )
}

export default Login;
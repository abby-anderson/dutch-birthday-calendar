import React from "react";
import {NavLink} from 'react-router-dom';

function NavBar ({currentUser, setCurrentUser}) {

    function handleLogout () {

        // fetch DELETE to /logout route in sessionscontroller #destroy method
        fetch('/api/logout', {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setCurrentUser(null);
                console.log('successful delete logout!');
            }
        })
    }


    return (
        <div className="navbar">
            <NavLink to="/">
                Home
            </NavLink>

            {currentUser ? 
                <div className="signed-in">
                    <NavLink to="/userprofile">
                        User Profile
                    </NavLink>

                    <NavLink to="/contactlist">
                        Contact List
                    </NavLink>

                    <NavLink to="/calendar">
                        Calendar
                    </NavLink>

                    <NavLink to="/" onClick={handleLogout}>
                        Logout
                    </NavLink>
                </div>
            : 
                <div className="not-signed-in">
                    <NavLink to="/login">
                        Login
                    </NavLink>

                    <NavLink to="/signup">
                        Signup
                    </NavLink> 
                </div>
            }
        </div>
    )
}

export default NavBar;
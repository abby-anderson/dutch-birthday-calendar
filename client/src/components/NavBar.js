import React from "react";
import {NavLink} from 'react-router-dom';

function NavBar ({currentUser, setCurrentUser}) {

    const linkStyles = {
        padding: "15px",
    }

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
        <>


        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1">📅 </span>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="/">Home</a>

                    {currentUser ?
                        <>
                            <a class="nav-link" href="/userprofile">My Profile</a>
                            <a class="nav-link" href="/contactlist">My Contacts</a>
                            <a class="nav-link" href="/calendar">My Calendar</a>
                            <a class="nav-link" href="/" onClick={handleLogout}>Logout</a>
                        </> 
                    :
                        <>
                            <a class="nav-link" href="/login">Log in</a>
                            <a class="nav-link" href="/signup">Sign up</a>
                        </>
                    }
                    

                </div>
                </div>
            </div>
        </nav>








            {/* <div className="navbar">
                <NavLink to="/" >
                    Home
                </NavLink>

                {currentUser ? 
                    <>
                        <NavLink to="/userprofile" >
                            User Profile
                        </NavLink>

                        <NavLink to="/contactlist" style={linkStyles}>
                            Contact List
                        </NavLink>

                        <NavLink to="/calendar" style={linkStyles}>
                            Calendar
                        </NavLink>

                        <NavLink to="/" onClick={handleLogout} style={linkStyles}>
                            Logout
                        </NavLink>
                    </>

    : 
    <>
                        <NavLink to="/login">
                            Login
                        </NavLink>

                        <NavLink to="/signup">
                            Signup
                        </NavLink> 
                    </>
                }
            </div> */}
    </>
    )
}

export default NavBar;
import React from "react";

function NavBar ({currentUser, setCurrentUser}) {
    function handleLogout () {

        // fetch DELETE to /logout route in sessionscontroller #destroy method
        fetch('/api/logout', {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setCurrentUser(null);
            }
        })
    }

    return (
        <div>
            <nav role="navigation" className="navbar navbar-expand-sm navbar-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">📅 </span>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link" href="/">Home</a>

                            {currentUser ?
                                <>
                                    <a className="nav-link" href="/userProfile">My Profile</a>
                                    <a className="nav-link" href="/contactList">My Contacts</a>
                                    <a className="nav-link" href="/calendar">My Calendar</a>
                                    <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
                                </> 
                            :
                                <>
                                    <a className="nav-link" href="/login">Log in</a>
                                    <a className="nav-link" href="/signup">Sign up</a>
                                </>
                            }
                    </div>
                </div>
            </div>
        </nav>
    </div>
    )
}

export default NavBar;
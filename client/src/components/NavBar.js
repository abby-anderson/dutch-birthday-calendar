import React from "react";

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


        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">📅 </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>

                    {currentUser ?
                        <>
                            <a className="nav-link" href="/userprofile">My Profile</a>
                            <a className="nav-link" href="/contactlist">My Contacts</a>
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
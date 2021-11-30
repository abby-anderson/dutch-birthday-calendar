import React from "react";
import { useState, useEffect } from "react";

function ContactList ({currentUser}) {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetch('/api/contacts')
        .then(response => response.json())
        .then(data => {
            setContacts(data)
        })
    }, [])

    function renderContacts () {
        console.log(contacts)


        contacts.map(eachobj => {
            return (
                <div>
                    <h3>{eachobj.first_name} {eachobj.last_name}</h3>
                    <h2>{eachobj.full_birthdate}</h2>
                </div>
            )
        })
    }


    if (!contacts) {
        return (
            <h2>...Loading 🧘‍♀️ </h2>
        )
    }

    return (
        <div className="contact-container">
            <h3>inside contactlist component!</h3>
            {renderContacts()}

        </div>
    )
}

export default ContactList;
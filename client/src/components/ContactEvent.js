import React from "react";

function ContactEvent ({contact}) {
    console.log('inside contact event component', contact)
    return (
        <>
        <p>{contact.first_name}</p>
        </>

    )
    

    // console.log(contact.important_dates)
    // contact.important_dates.map(date => {
    //     console.log(date)
    // })
}

export default ContactEvent;
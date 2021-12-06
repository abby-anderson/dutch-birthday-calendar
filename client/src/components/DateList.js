import React from "react";

function DateList ({contacts, currentUser}) {

    console.log(contacts)
    console.log(currentUser)

    function renderContacts () {
        const userContacts = contacts.filter( contact => contact.user_id === currentUser.id)

        console.log(userContacts)

        const arrayOfObjects = []

        return (
            userContacts.map( contact => {
                const contactName = contact.first_name

                const newObj = {}

                return (
                    contact.important_dates.map( date => {
                        const dateDate = date.date
                        const dateTitle = date.date_type

                        
                        // return (
                        
                        //         newObj[]
                                
                                
                            
                        // )
                    })
                )
            })
        )
    }

    return (
        <div>
            <h1>inside date list!</h1>
            {renderContacts()}
        </div>
    )
}

export default DateList;
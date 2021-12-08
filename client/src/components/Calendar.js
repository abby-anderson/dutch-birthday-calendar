import React, { useEffect } from "react";
import { useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar ({contacts, currentUser, handleEvents}) {
    const [userContacts, setUserContacts] = useState([])

    let eventArray = null;
    
    if (contacts && currentUser) {
        console.log('inside if statement')
        console.log(currentUser)
        console.log(contacts)

        const filteredContacts = contacts.filter( contact => contact.user_id === currentUser.id)
        parseContacts(filteredContacts)
        // setUserContacts(filteredContacts) --this causes infinite loop rerender
    }
    
    function parseContacts (filteredContacts) {
        console.log('inside render method', filteredContacts)

        let parsedContacts = filteredContacts.map(contact => {
            return contact.important_dates.map( date => {
                    let this_year = "2021"
                    let original_date = date.date
                    let sliced_date = original_date.slice(4)
                    let new_date = this_year.concat(sliced_date)

                return {title: date.date_title, date: new Date(new_date), allDay: true, extendedProps: date}
            })
        })
    

        eventArray = parsedContacts.flat()
        console.log('event array', eventArray)
    }

    function handleEventClick (event) {
        console.log(event.event.title)
        // alert(`${event.event.title} is today!, ${event.event.extendedProps.notes}`)
        alert(`${event.event.title} is today! To see more, please visit their contact page.`)

    }

    return (
        <div>

            <div className="calendar">
                {!!eventArray ? 
                <FullCalendar 
                    plugins={[ interactionPlugin, dayGridPlugin ]}
                    initialView="dayGridMonth"
                    // editable={true}
                    selectable={true}
                    events={eventArray}
                    eventClick={handleEventClick}
                    dayMaxEvents={true}
                />

                :
                <h2>...Loading 🧘‍♀️ </h2>
                }
            </div>

        </div>
    )
}

export default Calendar;
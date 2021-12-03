import React, {useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from 'react-modal'
import { Navigate, useNavigate } from "react-router";

function Calendar ({currentUser, contacts, }) {
    let navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newEventArrayState, setNewEventArrayState] = useState([])
    const [newEventForm, setNewEventForm] = useState({
        newEventDate: null,
        newEventTitle: null
    })
    const [eventArray, setEventArray] = useState([
        {
            title: 'madelyns\' bday',
            date: new Date('2021/11/28'),
            allDay: true
        },
        {
            title: 'bambi\'s bday',
            date: new Date('2021/12/22'),
            allDay: true
        },
        {
            title: 'greg\'s bday',
            date: new Date('2021/12/25'),
            allDay: true
        }
    ])
    
    console.log('currentuser', currentUser)
    console.log('contacts', contacts)

    function openModal (event) {
        setModalIsOpen(true, event)
    }

    function closeModal () {
        setModalIsOpen(false)
    }

    function handleDateClick (event) {
        // alert(event.dateStr)
        openModal(event);
    }

    function handleEventClick (event) {
        alert(`${event.event.title} is today!`)
        // openModal();
    }

    if (!contacts) {
        return (
            <h2>...Loading 🧘‍♀️ </h2>
        )
    }

    function createContactEvents () {
        // console.log('inside createcontactevents fxn', contacts)

        const userContacts = contacts.filter( contact => contact.user_id === currentUser.id)
        console.log('usercontacts inside createcontactevents fxn', userContacts)

        // setNewEventArrayState(
            userContacts.map (contact => {
                const eventTitle = `${contact.first_name}s bday!`
                const eventDate = new Date(contact.full_birthdate)
                const compiledBirthday = `2021/${contact.birth_month}/${contact.birth_day}`
                console.log('compiled bday', compiledBirthday)
                // const  month = eventDate.getMonth()
                // console.log(month, eventDate)
                
    
                // const datestring = eventDate.toLocaleDateString();
                // console.log(contact.full_birthdate, datestring)
    
                console.log('event title and date from map', eventTitle, eventDate)
    
                return (
                    {
                        title: eventTitle,
                        date: eventDate, 
                        allDay: true
                    }
                )
            })
        // )
        
    }



    function handleChange (event) {
        setNewEventForm({
            ...newEventForm, [event.target.name]: event.target.value
        })

    }

    function handleSubmitNewEvent (event) {
        event.preventDefault();
        console.log('clicked submit')
        console.log(newEventForm)
        closeModal()
        const newEventObj = {
            title: newEventForm.newEventTitle,
            date: newEventForm.newEventDate,
            allDay: true

        }

        console.log(newEventObj)
    }
    
    return (
        <>
            {createContactEvents()}
            <div className="calendar">
                <FullCalendar 
                    plugins={[ interactionPlugin, dayGridPlugin ]}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    dateClick={handleDateClick}
                    events={eventArray}
                    eventClick={handleEventClick}
                />
            </div>


            {/* modal form for adding new important event */}
            <div className="modal-dialog modal-sm">
                <Modal isOpen={modalIsOpen} >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add new birthday!</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label>Date</label>
                                <input type="date" name="newEventDate" onChange={handleChange} value={newEventForm.newEventDate}  />

                                <label>Title</label>
                                <input type="text" name="newEventTitle" onChange={handleChange} value={newEventForm.newEventTitle} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmitNewEvent}>Save</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Calendar;
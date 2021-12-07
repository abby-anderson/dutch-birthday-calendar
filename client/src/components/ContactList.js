import React from "react";
import Modal from 'react-modal'
import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";
import { Navigate, useNavigate } from "react-router";

function ContactList ({currentUser, contacts }) {
    let navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newContactFormData, setNewContactFormData] = useState({
        first_name:  null,
        last_name:  null,
        user_id: currentUser ? currentUser.id : null,
        image_url: null,
        notes: null,
    })
    const [contactID, setContactID] = useState(null)
    const [newBirthdayFormData, setNewBirthdayFormData] = useState({
        contact_id: null,
        date: null,
        date_type: "birthday",
        date_title: null,
        image_url: null,
        notes: null
    })

    // console.log(currentUser)
    // console.log(contacts)


    function renderContacts () {
        const userContacts = contacts.filter( contact => contact.user_id === currentUser.id)

        // console.log(userContacts)

        return (
            userContacts.map( contact => {
                return (
                    <ContactCard key={contact.id} contact={contact} />
                )
            })

        )

        // function filterContacts () {

        // }

        // return (
        //         contacts.map( contact => {
        //             return (
        //                 <ContactCard key={contact.id} contact={contact} />
        //             )
        //         })
    
        //     )

    }


    function handleContactChange (event) {

        setNewContactFormData({
            ...newContactFormData, [event.target.name]: event.target.value, user_id: currentUser.id
        })
    }

    function handleContactSubmit (event) {
        event.preventDefault();
        console.log(newContactFormData)
        

        // fetch POST route to /api/contacts, which is the contactscontroller #create method
        fetch('api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContactFormData)
        })
        .then(response => {
            console.log(response)

            if (response.ok) {
                response.json().then(data => {
                    console.log('added contact and heres the response data', data)
                    setNewBirthdayFormData({
                        ...newBirthdayFormData, contact_id: data.id, 
                    })
                    let hiddenForm = document.getElementById('hidden-new-date-form')
                    hiddenForm.classList.toggle('hidden')

                    let hideContactSaveButton = document.getElementById('save-new-contact')
                    hideContactSaveButton.classList.toggle('hidden')

                    let hiddenBirthdaySaveButton = document.getElementById('save-new-contact-birthday')
                    hiddenBirthdaySaveButton.classList.toggle('hidden')
                })
            } else {
                response.json().then(error => {
                    console.log('errors from failed new contact post', error.error)
                    alert(error.error)
                })
            }
        })
        
    }
    
    function handleBirthdaySubmit (event) {
        event.preventDefault();
        console.log(newBirthdayFormData)

        // fetch POST to importantdatescontroller #create method
        fetch('/api/important_dates', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBirthdayFormData)
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data)
                    closeModal()
                    window.location.reload()
                })
            }
        })
    }

    function handleBirthdayChange (event) {
        setNewBirthdayFormData({
            ...newBirthdayFormData, [event.target.name]: event.target.value, 
        })
    }



    function openModal () {
        setModalIsOpen(true)
    }

    function closeModal () {
        setModalIsOpen(false)
    }



    if (!contacts) {
        return (
            <h2>...Loading 🧘‍♀️ </h2>
        )
    }


    return (
        <>
            <div className="contact-container container ">
                <button type="button" className="btn btn-primary" onClick={openModal}>
                    Add a new contact
                </button>                
                {renderContacts()}
            </div>

                {/* modal form opens when 'add new contact' button is clicked */}
                <div className="modal-dialog modal-sm">
                    <Modal currentUser={currentUser} isOpen={modalIsOpen} >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add a new contact and their birthday!</h5>
                                </div>

                                <div className="modal-body">
                                    {/* this part of the form adds the new Contact object */}
                                    <form onSubmit={handleContactSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">First Name</label>
                                            <input type="text" className="form-control" name="first_name" onChange={handleContactChange} value={newContactFormData.first_name} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Last Name</label>
                                            <input type="text" className="form-control" name="last_name" onChange={handleContactChange} value={newContactFormData.last_name} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Profile Pic</label>
                                            <input type="text" className="form-control" name="image_url" onChange={handleContactChange} value={newContactFormData.image_url} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Notes</label>
                                            <input type="textarea" placeholder="jot down anything you need to remember here" className="form-control" name="notes" onChange={handleContactChange} value={newContactFormData.notes} />
                                        </div>
                                    </form>

                                    {/* this part of the form adds the new Important_Date object */}
                                    <form className="hidden" id="hidden-new-date-form">
                                            <div className="mb-3" >
                                                <label className="form-label">Date</label>
                                                <input type="date" className="form-control" name="date" 
                                                onChange={handleBirthdayChange} value={newBirthdayFormData.date} 
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Event Title</label>
                                                <input type="text" className="form-control" name="date_title" 
                                                onChange={handleBirthdayChange} value={newBirthdayFormData.date_title} 
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Image URL</label>
                                                <input type="text" className="form-control" name="image_url" 
                                                placeholder="save a pic of the event invite!"
                                                onChange={handleBirthdayChange} value={newBirthdayFormData.image_url} 
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Notes</label>
                                                <input type="text" className="form-control" name="notes" 
                                                placeholder="anything you want to jot down?"
                                                onChange={handleBirthdayChange} value={newBirthdayFormData.notes} 
                                                />
                                            </div>
                                    </form>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Cancel</button>
                                    <button type="button" className="btn btn-primary" id="save-new-contact" onClick={handleContactSubmit}>Save new contact</button>
                                    <button type="button" className="btn btn-primary hidden" id="save-new-contact-birthday" onClick={handleBirthdaySubmit} > Save Contact's birthday</button>

                                </div>
                            </div>
                    </Modal>
                </div>

        </>
    )
}

export default ContactList;
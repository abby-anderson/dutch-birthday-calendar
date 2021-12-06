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
        birth_year:  null,
        birth_month:  null,
        birth_day:  null,
        user_id: currentUser ? currentUser.id : null,
        image_url: null,
        notes: null,
        full_birthdate: null
    })

    console.log(currentUser)
    console.log(contacts)


    function renderContacts () {
        const userContacts = contacts.filter( contact => contact.user_id === currentUser.id)

        console.log(userContacts)

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


    function handleChange (event) {

        setNewContactFormData({
            ...newContactFormData, [event.target.name]: event.target.value, user_id: currentUser.id
        })
    }

    function handleSubmit (event) {
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
                    console.log('added contact', data)
                    setModalIsOpen(false)
                    window.location.reload()
                })
            } else {
                response.json().then(error => {
                    console.log('errors from failed new contact post', error.error)
                    alert(error.error)
                })
            }
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

                <div className="modal-dialog modal-sm">
                    <Modal currentUser={currentUser} isOpen={modalIsOpen} >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add a new contact</h5>
                                </div>
                                <div className="modal-body">

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">First Name</label>
                                            <input type="text" className="form-control" name="first_name" onChange={handleChange} value={newContactFormData.first_name} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Last Name</label>
                                            <input type="text" className="form-control" name="last_name" onChange={handleChange} value={newContactFormData.last_name} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Birth Month</label>
                                            <input type="text" className="form-control" name="birth_month" onChange={handleChange} value={newContactFormData.birth_month} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Birth Day</label>
                                            <input type="text" className="form-control" name="birth_day" onChange={handleChange} value={newContactFormData.birth_day} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Birth Year</label>
                                            <input type="text" className="form-control" name="birth_year" onChange={handleChange} value={newContactFormData.birth_year} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Profile Pic</label>
                                            <input type="text" className="form-control" name="image_url" onChange={handleChange} value={newContactFormData.image_url} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Notes</label>
                                            <input type="textarea" placeholder="jot down anything you want to remember, like something they mentioned they'd love to have, or a restaurant they're dying to try!" className="form-control" name="notes" onChange={handleChange} value={newContactFormData.notes} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Full Birthdate</label>
                                            <input type="date" className="form-control" name="full_birthdate" onChange={handleChange} value={newContactFormData.full_birthdate} />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save new contact</button>
                                </div>
                            </div>
                    </Modal>
                </div>

        </>
    )
}

export default ContactList;
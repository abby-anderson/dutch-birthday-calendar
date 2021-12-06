import React from 'react';
import Modal from 'react-modal'
import { useState } from 'react';
import { useNavigate } from 'react-router';

function ContactCard ({contact}) {
    let navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newDateForm, setNewDateForm] = useState({
        contact_id: contact.id,
        date: null,
        date_type: null,
        image_url: null,
        notes: null
    })

    function handleDeleteContact () {
        console.log('clicked delete', contact)

        // fetch delete 
        // redirect to /contactlist
        fetch(`/api/contacts/${contact.id}`, {
            method: "DELETE"
        })
        .then(() => {
            setModalIsOpen(false)
            window.location.reload()
        })
    }

    function handleDateChange (event) {
        setNewDateForm({
            ...newDateForm, [event.target.name]: event.target.value
        })

    }

    function handleDateSubmit (event) {
        event.preventDefault();
        console.log(newDateForm)

        // fetch POST to importantdatescontroller #create method
        fetch('/api/important_dates', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDateForm)
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

    function handleAddDateClick () {
        console.log('clicked edit', contact)
        let form = document.getElementById('editContactForm')
        form.classList.toggle('hidden')
        
    }

    function openModal () {
        setModalIsOpen(true)
    }

    function closeModal () {
        setModalIsOpen(false)
    }

    function renderImportantDates () {
        return (
            contact.important_dates.map( date => {
                return (
                    <div>
                        <h3>{date.date_type}</h3>
                        <h4>{date.date}</h4>
                        <h5>{date.notes}</h5>
                        <br />
                    </div>
                )
            })

        )
    }

    function calculateAge () {
        const dob = new Date(contact.full_birthdate);
        const difference = Date.now() - dob.getTime();

        const ageDate = new Date(difference)
        const calculatedAge = Math.abs(ageDate.getUTCFullYear()- 1970)

        return <p>Turning {calculatedAge} this year!</p>
    }

    return (
        <>
            <div className="contact-individual">
                <h1>{contact.first_name} {contact.last_name}</h1>
                <p>Born on {contact.full_birthdate}</p>
                {calculateAge()}
                <button onClick={openModal}>Expand</button>
            </div>

            {/* <div className="modal-dialog modal-sm">
                <Modal isOpen={modalIsOpen} >
                    <div>
                        <button onClick={handleEditContact}>Edit</button>
                        <button onClick={handleDeleteContact}>Delete</button>
                        <button onClick={closeModal}>Close</button>
                    </div>

                    <div>
                        <img src={contact.image_url} className="img-thumbnail" />
                        <h1>{contact.first_name} {contact.last_name}</h1>
                        <h2>Birthdate: {contact.full_birthdate}</h2>
                        ------------------------------------
                        {renderImportantDates()}
                    </div>

                </Modal>
            </div> */}


            <div className="modal-dialog modal-sm">
                <Modal isOpen={modalIsOpen} >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">{contact.first_name} {contact.last_name}'s Info</h2>
                        </div>
                        <div className="modal-body">
                            <img src={contact.image_url} className="img-thumbnail" />
                            <h3>{contact.first_name} {contact.last_name}</h3>
                            <h3>Birthdate: {contact.full_birthdate}</h3>
                        </div>
                        <div className="modal-body">
                            <h3 className="modal-title">Important dates:</h3>
                            {renderImportantDates()}
                            <form id="editContactForm" className="hidden" onSubmit={handleDateSubmit}>
                                <h4>Add another important date</h4>

                                {/* contact_id = contact.id */}

                                <div className="mb-3">
                                    <label className="form-label">Date</label>
                                    <input type="date" className="form-control" name="date" 
                                    onChange={handleDateChange} value={newDateForm.date} 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Occasion</label>
                                    <input type="text" className="form-control" name="date_type" 
                                    onChange={handleDateChange} value={newDateForm.date_type} 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Image URL</label>
                                    <input type="text" className="form-control" name="image_url" 
                                    placeholder="save a pic of the event invite!"
                                    onChange={handleDateChange} value={newDateForm.image_url} 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Notes</label>
                                    <input type="text" className="form-control" name="notes" 
                                    placeholder="anything you want to jot down?"
                                    onChange={handleDateChange} value={newDateForm.notes} 
                                    />
                                </div>

                                <input type="submit" value="Save" />

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-warning" onClick={handleAddDateClick}>Add</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteContact}>Delete</button>
                        </div>
                    </div>
                </Modal>
            </div>


        </>
        )
}

export default ContactCard;


